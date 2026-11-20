(function () {
  async function sha(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  document.querySelectorAll("ul.qmcq[data-key]").forEach((ul) => {
    const box = ul.nextElementSibling, btn = box.querySelector("button"), out = box.querySelector("output");
    ul.addEventListener("change", () => { btn.disabled = false; out.textContent = ""; out.className = ""; });
    btn.addEventListener("click", async () => {
      const pick = ul.querySelector("input:checked");
      if (!pick) return;
      const right = (await sha(ul.dataset.salt + ":" + pick.value)) === ul.dataset.key;
      out.textContent = right ? "Correct." : "Not correct. Try again.";
      out.className = right ? "ok" : "no";
      btn.disabled = true;
    });
  });
})();
