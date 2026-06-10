# Design Integration Rules

## The Architecture

```
src/js/app.js          ← logic lives here (change once, works everywhere)
src/js/templates.js    ← HTML for index.html only
designs/v*/index.html  ← each design keeps its own full HTML+CSS
```

Logic changes in `app.js` apply to all designs automatically.
New UI elements (widgets, modals) must be added to each design's HTML manually — but only the HTML, never JS.

---

## Adding a New Design

1. Create folder: `designs/vN-name/`
2. Copy your HTML into `designs/vN-name/index.html`
3. Remove the inline `<script>` block at the bottom
4. Add these two blocks instead:

```html
<script src="../../src/js/app.js"></script>
<script>
(function() {
  // --- REQUIRED: map showPage() to your design's class system ---
  window.showPage = function(page) {
    // hide all pages — replace '.pg' with your page class
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
    // deactivate nav — replace '.nav-link' with your nav item selector
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active-nav'));
    // show target page — replace 'pg-' with your page id prefix
    var pg = document.getElementById('pg-' + page);
    if (pg) pg.classList.add('on');
    // activate nav item — replace 'btn-nav-' with your nav id prefix
    var ni = document.getElementById('btn-nav-' + page);
    if (ni) ni.classList.add('active-nav');
    window.scrollTo(0, 0);
    if (page === 'analytics') setTimeout(drawChart, 60);
  };
  window.G = window.showPage;

  // --- REQUIRED: fill ticker tape ---
  // replace id="ti" with your tape container id
  var tape = document.getElementById('ti');
  if (tape) {
    var ticks = ['NVDA','AAPL','BTC','MSFT','AMD','TSLA'];
    tape.innerHTML = [...ticks,...ticks].map(s =>
      '<div class="tc">' + s + '</div>'
    ).join('');
  }

  // --- REQUIRED: chart bridge ---
  // replace 'cc' with your canvas id
  window.drawChart = function() {
    var cv = document.getElementById('cc') ||
             document.getElementById('price-chart-canvas');
    if (!cv) return;
    // ... chart drawing code (copy from any existing shim)
  };

  // --- start on this page ---
  setTimeout(() => showPage('analytics'), 50);
})();
</script>
```

5. Run the validation script (see below) to verify the bridge works.

---

## Bridge IDs — Current Designs

| Design | Page class | Page id prefix | Nav selector | Tape id | Canvas id | Cursor id |
|--------|-----------|----------------|-------------|---------|-----------|-----------|
| v0 brutalist | `.page-section` / `active-page` | `view-` | `#btn-nav-*` | — | — | — |
| v1 dark purple | `.pg` / `.on` | `pg-` | `.ni` | `ti` | `cc` | `cur` |
| v2 editorial beige | `.pg` / `.on` | `pg-` | `.nc a` | `mq` | `cc` | `C` |
| v3 minimalist air | `.pg` / `.on` | `pg-` | `.nav-c a` | `ti` | `cc` | `C` |
| index.html | `.f-page` / `is-active` | `f-page--` | `.f-nav-item` | `tape-inner` | `price-chart-canvas` | — |

---

## What app.js Changes Need in HTML Too

| app.js change | Needs HTML update in designs? |
|--------------|-------------------------------|
| Score calculation logic | ❌ No |
| API call / data fetch | ❌ No |
| New modal (e.g. news detail) | ✅ Yes — add `<div id="f-modal-news">` to each design |
| New page (e.g. "macro") | ✅ Yes — add `<div class="pg" id="pg-macro">` + nav item to each design |
| New widget on existing page | ✅ Yes — add the HTML block to each design |

Rule: if `app.js` calls `document.getElementById('x')` for something new → add `id="x"` to each design.

---

## Automation: onboarding a new design automatically

Run this script when adding a new design. It reads your HTML, detects the page/nav pattern, and generates the correct shim:

```bash
# from project root:
python3 scripts/add_design.py designs/vN-name/index.html
```

The script (`scripts/add_design.py`) does:
1. Detects page class name (`.pg`, `.page-section`, etc.)
2. Detects page id prefix (`pg-`, `view-`, etc.)
3. Detects nav selector
4. Detects tape/canvas ids
5. Removes existing `<script>` block
6. Appends `app.js` + generated shim
7. Updates this table above

---

## Token-efficient way to restore/update a design

Never rewrite the whole file. Always:

```bash
# 1. Keep original HTML in an .rtf or backup file
# 2. Extract HTML (strips RTF formatting):
python3 -c "
import re, sys
raw = open(sys.argv[1], encoding='latin-1').read()
raw = re.sub(r\"\\\\'[0-9a-fA-F]{2}\", lambda m: bytes.fromhex(m.group(0)[2:]).decode('latin-1','ignore'), raw)
raw = re.sub(r'\\\\[a-zA-Z]+\d*[ ]?', '', raw)
raw = re.sub(r'^[{}]+$', '', raw, flags=re.MULTILINE)
start = raw.find('<!DOCTYPE'); end = raw.rfind('</html>') + 7
print(raw[start:end])
" designs/vN-name/backup.rtf > designs/vN-name/index.html

# 3. Replace only the <script> block at the end:
python3 -c "
import re
f = open('designs/vN-name/index.html', encoding='utf-8').read()
shim = open('scripts/shim_template.html').read()
f = re.sub(r'<script>[\s\S]*?</script>\s*</body>', shim + '\n</body>', f)
open('designs/vN-name/index.html','w').write(f)
"
```
