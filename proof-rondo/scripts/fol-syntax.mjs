import {
  LanguageSupport,
  StreamLanguage,
  HighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { letters } from "../../../core/src/parser/letters.mjs";

const simpleOperators = new Set([
  "∧",
  "&",
  "∨",
  "v",
  "+",
  "→",
  "↔",
  "~",
  "¬",
  "=",
  "⊥",
]);

const quantifiers = new Set(["∀", "A", "∃", "E"]);

// An identifier, with the grammar's letters (#2)
const identifier = `[${letters}_'][${letters}_'"0-9|]*`;
const startsWithIdentifier = new RegExp(`^${identifier}`);

const operatorKeywords = new Set([
  "and",
  "or",
  "implies",
  "iff",
  "not",
  "bot",
  "with",
]);

const folSyntax = StreamLanguage.define({
  startState() {
    return { inQuantifier: false };
  },

  token(stream, state) {
    if (stream.eatSpace()) return null;

    if (state.inQuantifier && stream.match(startsWithIdentifier)) {
      return "variable";
    }

    if (state.inQuantifier && stream.match(/^\./)) {
      state.inQuantifier = false;
      return "logicOperator";
    }

    if (stream.match(/^#.*$/)) return "comment";

    // 'name ::' names a line (#1); a justification starts at a single ':'
    if (stream.match("::")) return "operator";

    if (stream.match(/^:[^#]*/)) return "string";

    if (simpleOperators.has(stream.peek())) {
      stream.next();
      return "operator";
    }

    // A or E are only valid quantifiers if followed by a variable and dot
    if (
      quantifiers.has(stream.peek()) &&
      stream.match(new RegExp(`^[∀A∃E]\\s*${identifier}\\s*\\.`), false)
    ) {
      stream.next();
      state.inQuantifier = true;
      return "logicOperator";
    }

    const match = stream.match(/^[a-z]*/, false);
    if (match && operatorKeywords.has(match[0])) {
      stream.eatWhile(/[a-z]/);
      return "operator";
    }

    if (stream.match(/^((->)|(<->)|(_\|_))/)) return "operator";

    // Ensures that | is not matched below when it is in a variable (see lexer)
    if (stream.match(startsWithIdentifier)) return "variable";

    // Ensures that - is not matched below when it is in numrange (see lexer)
    if (stream.match(/^\d+(-\d+)?/)) return "number";

    if (stream.peek() === "-" || stream.peek() === "|") {
      stream.eatWhile(/[-|]/);
      return "namespace";
    }

    // Default case, do nothing
    stream.next();
    return null;
  },
});

// Paul Tol style
const folHighlightStyle = HighlightStyle.define([
  { tag: tags.comment, color: "#44BB99", fontStyle: "italic" },
  { tag: tags.string, color: "#DDAA33" },
  { tag: tags.operator, color: "#6699CC", fontWeight: "bold" },
  { tag: tags.logicOperator, color: "#EE3377", fontWeight: "bold" },
  { tag: tags.namespace, color: "#44BB99", fontWeight: "bold" },
]);

export function folLanguage() {
  return new LanguageSupport(folSyntax, syntaxHighlighting(folHighlightStyle));
}
