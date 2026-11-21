import parser from "../../../core/src/parser/folproof-parser.mjs";
import { Verifier } from "../../../core/src/verifier.mjs";
import { libraries } from "../../../core/src/library.mjs";
import { render, summarizeResult } from "../../../web/web.ts";

import { folLanguage } from "./fol-syntax.mjs";

import { EditorState, StateField, StateEffect } from "@codemirror/state";
import {
  EditorView,
  keymap,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  rectangularSelection,
  lineNumbers,
  highlightActiveLineGutter,
  Decoration,
  gutter,
  GutterMarker,
  hoverTooltip,
} from "@codemirror/view";
import {
  insertTab,
  indentLess,
  history,
  historyKeymap,
  defaultKeymap,
} from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { closeBrackets } from "@codemirror/autocomplete";

/**
 * Register service worker for offline support.
 *
 * @returns {Promise<void>} resolves when the service worker is registered
 */
async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("service-worker.js", {
        scope: "./",
      });
    } catch (error) {
      console.error(`Service worker registration failed with: ${error}`);
    }
  }
}

void registerServiceWorker();

class LineNumberFormatter {
  constructor() {
    this.skippedLineCount = 0;
  }

  skipLines(lineNo, state) {
    if (lineNo >= 1 && lineNo <= state.doc.lines) {
      const line = state.doc.line(lineNo);
      // Skip comments, closing lines, and empty lines
      if (/^\s*(#.*|-+)?$/.test(line.text)) {
        this.skippedLineCount++;
        return "";
      }
    }

    return String(lineNo - this.skippedLineCount);
  }

  reset() {
    this.skippedLineCount = 0;
  }
}

const lineNumberFormatter = new LineNumberFormatter();

// The errors marked in the editor (#27): each line with an error gets a
// tint, a dot in the gutter and its messages on hover. The marks are line
// decorations, each with the line's messages; they move with the text as
// it is edited, until the next check replaces them.
const setErrorMarks = StateEffect.define();

const errorMarks = StateField.define({
  create: () => Decoration.none,
  update(marks, transaction) {
    marks = marks.map(transaction.changes);
    for (const effect of transaction.effects) {
      if (effect.is(setErrorMarks)) {
        marks = errorMarksOf(transaction.state.doc, effect.value);
      }
    }
    return marks;
  },
  provide: (field) => EditorView.decorations.from(field),
});

/**
 * The marks for the errors by source line.
 *
 * @param {import("@codemirror/state").Text} doc the editor's text
 * @param {Map<number, string[]>} byLine each source line's error messages
 * @returns {import("@codemirror/view").DecorationSet} a mark on each line
 */
function errorMarksOf(doc, byLine) {
  const lines = [...byLine.keys()].filter((n) => n >= 1 && n <= doc.lines);
  return Decoration.set(
    lines.map((n) =>
      Decoration.line({
        class: "cm-error-line",
        messages: byLine.get(n),
      }).range(doc.line(n).from),
    ),
    true,
  );
}

/**
 * The messages of the error mark on a line, if it has one.
 *
 * @param {EditorState} state the editor's state
 * @param {number} from the start of the line
 * @returns {string[] | undefined} the line's messages
 */
function errorMessagesAt(state, from) {
  let messages;
  state.field(errorMarks).between(from, from, (start, _end, mark) => {
    if (start === from) messages = mark.spec.messages;
  });
  return messages;
}

// the dot in the gutter beside a line with an error, its messages as its
// title
class ErrorMarker extends GutterMarker {
  constructor(messages) {
    super();
    this.messages = messages;
  }

  eq(other) {
    return other.messages.join("\n") === this.messages.join("\n");
  }

  toDOM() {
    const dot = document.createElement("span");
    dot.className = "cm-error-dot";
    dot.textContent = "●";
    dot.title = this.messages.join("\n");
    return dot;
  }
}

const errorMarking = [
  errorMarks,
  gutter({
    class: "cm-error-gutter",
    lineMarker: (view, line) => {
      const messages = errorMessagesAt(view.state, line.from);
      return messages ? new ErrorMarker(messages) : null;
    },
    lineMarkerChange: (update) =>
      update.startState.field(errorMarks) !== update.state.field(errorMarks),
  }),
  hoverTooltip((view, pos) => {
    const line = view.state.doc.lineAt(pos);
    const messages = errorMessagesAt(view.state, line.from);
    if (!messages) return null;
    // at the pointer, not the line's start, which may be scrolled out of
    // view on a narrow screen
    return {
      pos,
      above: true,
      create() {
        const dom = document.createElement("div");
        dom.className = "cm-error-tooltip";
        for (const message of messages) {
          const item = document.createElement("div");
          item.textContent = message;
          dom.appendChild(item);
        }
        return { dom };
      },
    };
  }),
];

/**
 * The editor view for the proof input.
 *
 * @type {EditorView} the editor view
 */
let proofInput = new EditorView({
  parent: document.getElementById("proof-input"),
  extensions: [
    history(),
    drawSelection(),
    dropCursor(),
    highlightActiveLine(),
    EditorState.allowMultipleSelections.of(true),
    rectangularSelection(),
    bracketMatching(),
    closeBrackets(),
    lineNumbers(),
    highlightActiveLineGutter(),
    folLanguage(),
    lineNumbers({
      formatNumber: (lineNo, state) =>
        lineNumberFormatter.skipLines(lineNo, state),
    }),
    EditorView.updateListener.of((update) => {
      lineNumberFormatter.reset();
      if (update.docChanged) {
        updateOutputSection();
      }
    }),
    errorMarking,
    keymap.of([
      ...historyKeymap,
      ...defaultKeymap,
      { key: "Tab", run: insertTab },
      { key: "Shift-Tab", run: indentLess },
    ]),
  ],
});

const resultBox = document.getElementById("result-box");
const resultElement = document.getElementById("result");
const renderPanel = document.getElementById("render-panel");

const parentheses = document.getElementById("parentheses-setting");
const restrictPropositional = document.getElementById("propositional-setting");
restrictPropositional.addEventListener("change", updateOutputSection);

// the library the proof cites (#3): classical unless chosen otherwise, and
// not stored, so a reload opens classical
const logic = document.getElementById("logic-setting");
logic.addEventListener("change", updateOutputSection);

const signatureFunction = document.getElementById("signature-function-input");
signatureFunction.addEventListener("input", updateOutputSection);
const signatureRelation = document.getElementById("signature-relation-input");
signatureRelation.addEventListener("input", updateOutputSection);

/**
 * Update the output section based on the current proof content and settings.
 */
function updateOutputSection() {
  let AST, result, summary;
  try {
    AST = parser.parse(proofInput.state.doc.toString());
    result = Verifier.verifyFromAST(
      AST,
      restrictPropositional.checked,
      (signatureFunction.value + " " + signatureRelation.value).trim(),
      libraries[logic.value],
    );
    summary = summarizeResult(result);
    const result_HTML = document.createElement("p");
    result_HTML.textContent = result.message;

    if (!result.valid) {
      const errors = summary.errors;

      if (errors.length > 0) {
        const listTitle = document.createElement("p");
        listTitle.textContent = "Errors:";
        result_HTML.appendChild(listTitle);

        const errorList = document.createElement("ol");
        for (const error of errors) {
          const item = document.createElement("li");
          item.textContent = error.text;
          errorList.appendChild(item);
        }

        result_HTML.appendChild(errorList);
      } else {
        const location = document.createElement("p");
        location.textContent = `Step: ${result.errorStep}`;
        if (result.errorSrcLoc?.line) {
          location.textContent += `, Src Line: ${result.errorSrcLoc.line}`;
        }
        result_HTML.appendChild(location);
      }

      resultBox.className = resultBox.className.replace(
        /alert-\w*/,
        "alert-warning",
      );
    } else {
      resultBox.className = resultBox.className.replace(
        /alert-\w*/,
        "alert-success",
      );
    }
    const sorries = document.createElement("p");
    sorries.textContent = `Remaining sorries: ${result.remainingSorries}`;
    result_HTML.appendChild(sorries);

    resultElement.textContent = "";
    resultElement.appendChild(result_HTML);
  } catch (ex) {
    summary = summarizeResult(null, ex);
    resultElement.textContent = ex;
    resultBox.className = resultBox.className.replace(
      /alert-\w*/,
      "alert-danger",
    );
  }

  updateResultBar(summary);
  // the check may run while the editor is updating, when it can't take a
  // new transaction: the marks follow right after
  queueMicrotask(() =>
    proofInput.dispatch({ effects: setErrorMarks.of(summary.byLine) }),
  );

  const HTML = render(AST, result?.labels, { parentheses: parentheses.value });
  renderPanel.textContent = "";
  renderPanel.appendChild(HTML);
}

parentheses.addEventListener("change", updateOutputSection);

// The result bar (#27), pinned to the bottom of the window so the verdict
// stays in view while a long proof is edited; a click on it opens the full
// list of errors, each of which, like "Go to line", moves the cursor to
// its line
const resultBar = document.getElementById("result-bar");
const resultBarToggle = document.getElementById("result-bar-toggle");
const resultBarVerdict = document.getElementById("result-bar-verdict");
const resultBarCount = document.getElementById("result-bar-count");
const resultBarFirst = document.getElementById("result-bar-first");
const resultBarCaret = resultBar.querySelector(".result-bar-caret");
const resultBarJump = document.getElementById("result-bar-jump");
const resultBarPanel = document.getElementById("result-bar-panel");
const resultBarErrors = document.getElementById("result-bar-errors");
const resultBarSorries = document.getElementById("result-bar-sorries");

const verdictLabels = {
  valid: "✓ Valid",
  invalid: "✗ Invalid",
  error: "! Error",
};

/**
 * Show the result in the result bar.
 *
 * @param {object} summary the result's summary (summarizeResult)
 */
function updateResultBar(summary) {
  const { status, errors, sorries } = summary;
  resultBar.hidden = false;

  resultBarVerdict.className = "result-bar-verdict " + status;
  resultBarVerdict.textContent = verdictLabels[status];
  resultBarCount.textContent =
    status === "invalid"
      ? `${errors.length} error${errors.length === 1 ? "" : "s"}`
      : "";
  resultBarFirst.textContent =
    errors[0]?.message ??
    (sorries > 0
      ? `${sorries} ${sorries === 1 ? "sorry" : "sorries"} remaining`
      : "");

  const line = errors[0]?.line;
  resultBarJump.hidden = !line;
  resultBarJump.textContent = line ? `Go to line ${line}` : "";
  resultBarJump.dataset.line = line ?? "";

  // the full result: every error, one with a line going to it on a click,
  // and the sorries that remain
  resultBarErrors.textContent = "";
  resultBarErrors.hidden = errors.length === 0;
  for (const error of errors) {
    const item = document.createElement("li");
    if (error.line) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = error.text;
      button.addEventListener("click", () => goToLine(error.line));
      item.appendChild(button);
    } else {
      item.textContent = error.text;
    }
    resultBarErrors.appendChild(item);
  }
  resultBarSorries.hidden = status === "error";
  resultBarSorries.textContent = `Remaining sorries: ${sorries}`;
}

/**
 * Move the cursor to the start of a source line and bring it to the middle
 * of the window.
 *
 * @param {number} line the source line, counted from 1
 */
function goToLine(line) {
  const doc = proofInput.state.doc;
  const pos = doc.line(Math.min(line, doc.lines)).from;
  proofInput.dispatch({
    selection: { anchor: pos },
    effects: EditorView.scrollIntoView(pos, { y: "center" }),
  });
  proofInput.focus();
}

resultBarToggle.addEventListener("click", () => {
  resultBarPanel.hidden = !resultBarPanel.hidden;
  resultBarToggle.setAttribute("aria-expanded", String(!resultBarPanel.hidden));
  resultBarCaret.textContent = resultBarPanel.hidden ? "▴" : "▾";
});

resultBarJump.addEventListener("click", () => {
  goToLine(Number(resultBarJump.dataset.line));
});

const clearButton = document.getElementById("clear-input");
clearButton.addEventListener("click", () => {
  proofInput.dispatch({
    changes: {
      from: 0,
      to: proofInput.state.doc.length,
      insert: "",
    },
  });
});

const layoutSetting = document.getElementById("layout-setting");

/**
 * Update the layout based on the current setting(s).
 */
function updateLayout() {
  const inputContainer = document.getElementById("proof-input-col");
  const layoutChoice = localStorage.getItem("layoutChoice") || "side";
  layoutSetting.value = layoutChoice;

  if (layoutChoice === "side") {
    inputContainer.classList.add("col-lg-7");
  } else {
    inputContainer.classList.remove("col-lg-7");
  }
}

layoutSetting.addEventListener("change", (event) => {
  localStorage.setItem("layoutChoice", event.target.value);
  updateLayout();
});

updateLayout();

// The grip under the editor (#27). The editor grows with the proof until
// the grip is dragged (or moved with the arrow keys); then it keeps that
// height, with its own scrollbar, and the browser remembers it like the
// layout. A double-click lets it grow with the proof again.
const editorGrip = document.getElementById("editor-grip");
const editorBox = document.getElementById("proof-input");
const minEditorHeight = 96;

/**
 * Give the editor a fixed height, or let it grow with the proof.
 *
 * @param {number | null} height the height in pixels, or null to grow
 */
function setEditorHeight(height) {
  if (height === null) {
    editorBox.style.height = "";
    editorBox.classList.remove("fixed-height");
    localStorage.removeItem("editorHeight");
  } else {
    height = Math.max(minEditorHeight, Math.round(height));
    editorBox.style.height = `${height}px`;
    editorBox.classList.add("fixed-height");
    localStorage.setItem("editorHeight", String(height));
  }
}

const storedEditorHeight = Number(localStorage.getItem("editorHeight"));
if (storedEditorHeight > 0) setEditorHeight(storedEditorHeight);

let dragStart = null;
editorGrip.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  dragStart = {
    y: event.clientY,
    height: editorBox.getBoundingClientRect().height,
  };
  editorGrip.setPointerCapture(event.pointerId);
});
editorGrip.addEventListener("pointermove", (event) => {
  if (!dragStart || event.clientY === dragStart.y) return;
  setEditorHeight(dragStart.height + event.clientY - dragStart.y);
});
editorGrip.addEventListener("lostpointercapture", () => {
  dragStart = null;
});
editorGrip.addEventListener("dblclick", () => setEditorHeight(null));
editorGrip.addEventListener("keydown", (event) => {
  const step = { ArrowUp: -32, ArrowDown: 32 }[event.key];
  if (!step) return;
  event.preventDefault();
  setEditorHeight(editorBox.getBoundingClientRect().height + step);
});

/*!
 * Based on toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011- The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */
const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const setTheme = (theme) => {
  if (theme === "auto") {
    document.documentElement.setAttribute(
      "data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
};

setTheme(getPreferredTheme());

const showActiveTheme = (theme) => {
  const themeSwitcher = document.querySelector("#bd-theme");
  const themeSwitcherText = document.querySelector("#bd-theme-text");
  const btnToActive = document.querySelector(
    `[data-bs-theme-value="${theme}"]`,
  );

  if (!btnToActive) return;

  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.classList.remove("active");
    element.setAttribute("aria-pressed", "false");
  });

  btnToActive.classList.add("active");
  btnToActive.setAttribute("aria-pressed", "true");
  const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
  themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      setTheme(getPreferredTheme());
    }
  });

window.addEventListener("DOMContentLoaded", () => {
  showActiveTheme(getPreferredTheme());

  document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.getAttribute("data-bs-theme-value");
      setStoredTheme(theme);
      setTheme(theme);
      showActiveTheme(theme);
    });
  });
});

/**
 * Load examples from the examples.json file and populate display elements.
 *
 * @returns {Promise<void>} resolves when examples are loaded
 */
async function loadExamples() {
  try {
    const response = await fetch("assets/examples.json");
    const data = await response.json();

    const proofs = data.proofs;
    createExampleSections(proofs);

    const defaultID = data.default;
    if (defaultID in proofs) {
      proofInput.dispatch({
        changes: {
          from: 0,
          to: proofInput.state.doc.length,
          insert: proofs[defaultID].proof.join("\n"),
        },
      });
    }
  } catch (error) {
    console.error(`Failed to load examples: ${error}`);
  }
}

// The category the course site's examples rewritten with axioms, lemmas and
// definitions share, and the names of the default libraries in it.
const extendedCategory = "Axioms, lemmas and definitions";
const isLibrary = (example) => example.name.startsWith("The default library");
// The examples that state every rule they use as an axiom, showing how a rule
// is an axiom: they go beside the libraries, not beside their originals.
const isRulesAsAxioms = (example) => / with axioms$/.test(example.name);

/**
 * The name of the original example a rewritten one stands beside: its name
 * without " with …" or " (unchanged)".
 *
 * @param name {string} the rewritten example's name
 * @returns {string} the original's name
 */
function originalName(name) {
  return name.replace(/ with .*$/, "").replace(/ \(unchanged\)$/, "");
}

/**
 * Create the three example sections: the originals, the same examples
 * written with axioms, lemmas and definitions, and the default libraries.
 * Each opens and closes with its arrow, on its own, so the originals and
 * their rewritten versions can be open together; the originals and their rewritten versions start open. A rewritten example's button carries its original's name and sits
 * in its original's group, so the two sections line up.
 *
 * @param proofs {Object} the example proofs
 */
function createExampleSections(proofs) {
  const all = Object.values(proofs);
  const originals = all.filter((e) => e.category !== extendedCategory);
  const extended = all.filter(
    (e) =>
      e.category === extendedCategory && !isLibrary(e) && !isRulesAsAxioms(e),
  );
  const rulesAsAxioms = all.filter(
    (e) => e.category === extendedCategory && isRulesAsAxioms(e),
  );
  const libraries = all.filter(
    (e) => e.category === extendedCategory && isLibrary(e),
  );

  // each original's rewritten version, in the originals' order, under the
  // original's group and name; the rest after them, under "More"
  const paired = [];
  const used = new Set();
  for (const original of originals) {
    const version = extended.find(
      (e) => !used.has(e) && originalName(e.name) === original.name,
    );
    if (version) {
      used.add(version);
      paired.push({
        ...version,
        category: original.category,
        name: original.name,
      });
    }
  }
  const more = extended
    .filter((e) => !used.has(e))
    .map((e) => ({ ...e, category: "More" }));

  const sections = [
    {
      id: "examples-original",
      title: "Original examples",
      examples: originals,
    },
    {
      id: "examples-extended",
      title: "With named lines, axioms, lemmas and definitions",
      examples: [...paired, ...more],
    },
    {
      id: "examples-libraries",
      title: "Default libraries",
      examples: [
        ...libraries.map((e) => ({
          ...e,
          category: undefined,
          name: e.name.replace(
            /^The default library \((.*)\)$/,
            (_, logic) => logic.charAt(0).toUpperCase() + logic.slice(1),
          ),
        })),
        ...rulesAsAxioms.map((e) => ({
          ...e,
          category: "Rules as axioms",
          name: originalName(e.name),
        })),
      ],
    },
  ];

  const container = document.getElementById("example-sections");
  sections.forEach(({ id, title, examples }, index) => {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className =
      "btn btn-link px-0 fw-bold text-decoration-none example-section-toggle d-block";
    toggle.setAttribute("data-bs-toggle", "collapse");
    toggle.setAttribute("data-bs-target", `#${id}`);
    toggle.setAttribute("aria-expanded", index < 2 ? "true" : "false");
    toggle.setAttribute("aria-controls", id);
    toggle.textContent = title;

    const body = document.createElement("div");
    body.id = id;
    body.className = index < 2 ? "collapse show" : "collapse";

    const row = document.createElement("div");
    row.className = "d-flex flex-wrap gap-1 pb-2";
    fillExampleButtons(row, examples);
    body.appendChild(row);

    container.appendChild(toggle);
    container.appendChild(body);
  });
}

/**
 * Fill a row with buttons for example proofs: one button for an example
 * alone in its group, a dropdown for a group of several.
 *
 * @param container {HTMLElement} the row
 * @param examples {Object[]} the examples, each with a name, a proof and maybe a category
 */
function fillExampleButtons(container, examples) {
  const categories = new Map();
  for (const example of examples) {
    const category = example.category || example.name;
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category).push(example);
  }

  categories.forEach((group, category) => {
    if (group.length === 1) {
      container.appendChild(createExampleButton(group[0]));
    } else {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "btn-group";

      const dropdownBtn = document.createElement("button");
      dropdownBtn.type = "button";
      dropdownBtn.className = "btn btn-primary dropdown-toggle";
      dropdownBtn.setAttribute("data-bs-toggle", "dropdown");
      dropdownBtn.setAttribute("aria-expanded", "false");
      dropdownBtn.textContent = category;

      const dropdownMenu = document.createElement("ul");
      dropdownMenu.className = "dropdown-menu";
      group.forEach((example) => {
        const listItem = document.createElement("li");
        listItem.appendChild(createExampleButton(example, true));
        dropdownMenu.appendChild(listItem);
      });

      fieldset.appendChild(dropdownBtn);
      fieldset.appendChild(dropdownMenu);
      container.appendChild(fieldset);
    }
  });
}

/**
 * Create a button for an example proof.
 *
 * @param example {Object} the example proof
 * @param isDropdown {boolean} whether the button is for a dropdown menu
 * @returns {HTMLButtonElement} the button element
 */
function createExampleButton(example, isDropdown = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = isDropdown ? "dropdown-item" : "btn btn-primary";
  button.textContent = example.name;

  button.addEventListener("click", () => {
    proofInput.dispatch({
      changes: {
        from: 0,
        to: proofInput.state.doc.length,
        insert: example.proof.join("\n"),
      },
    });
  });

  return button;
}

document.addEventListener("DOMContentLoaded", loadExamples);
