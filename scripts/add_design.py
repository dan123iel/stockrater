#!/usr/bin/env python3
"""
add_design.py — Auto-onboards a new futara design.

Usage:
    python3 scripts/add_design.py designs/vN-name/index.html

What it does:
1. Detects page class, id prefix, nav selector, tape/canvas ids
2. Removes existing inline <script> block
3. Appends ../../src/js/app.js + generated compatibility shim
"""

import re, sys, os

def detect(html):
    cfg = {}

    # Page class + active class
    if 'page-section' in html:
        cfg['page_sel'] = '.page-section'
        cfg['active_class'] = 'active-page'
    else:
        cfg['page_sel'] = '.pg'
        cfg['active_class'] = 'on'

    # Page id prefix
    for prefix in ['view-', 'pg-', 'page-']:
        if f'id="{prefix}' in html:
            cfg['page_prefix'] = prefix
            break
    else:
        cfg['page_prefix'] = 'pg-'

    # Nav selector + active class
    if 'btn-nav-' in html:
        cfg['nav_sel'] = '[id^="btn-nav-"]'
        cfg['nav_active'] = 'active-nav'
        cfg['nav_prefix'] = 'btn-nav-'
    elif 'class="ni' in html:
        cfg['nav_sel'] = '.ni'
        cfg['nav_active'] = 'on'
        cfg['nav_prefix'] = 'n-'
    elif 'nav-c' in html:
        cfg['nav_sel'] = '.nav-c a'
        cfg['nav_active'] = 'on'
        cfg['nav_prefix'] = 'n-'
    else:
        cfg['nav_sel'] = '.nc a'
        cfg['nav_active'] = 'on'
        cfg['nav_prefix'] = 'n-'

    # Tape id
    for tid in ['tape-inner', 'ti', 'mq']:
        if f'id="{tid}"' in html:
            cfg['tape_id'] = tid
            break
    else:
        cfg['tape_id'] = None

    # Canvas id
    for cid in ['price-chart-canvas', 'cc']:
        if f'id="{cid}"' in html:
            cfg['canvas_id'] = cid
            break
    else:
        cfg['canvas_id'] = 'price-chart-canvas'

    # Cursor id
    for cur in ['cur', 'C']:
        if f'id="{cur}"' in html:
            cfg['cursor_id'] = cur
            break
    else:
        cfg['cursor_id'] = None

    return cfg

def build_shim(cfg):
    page_sel    = cfg['page_sel']
    active_cls  = cfg['active_class']
    nav_sel     = cfg['nav_sel']
    nav_active  = cfg['nav_active']
    page_prefix = cfg['page_prefix']
    nav_prefix  = cfg['nav_prefix']
    tape_id     = cfg['tape_id']
    canvas_id   = cfg['canvas_id']
    cursor_id   = cfg['cursor_id']

    tape_block = ''
    if tape_id:
        tape_block = f"""
  // Tape
  var tape = document.getElementById('{tape_id}');
  if (tape) {{
    var td = [
      {{s:'S&P 500',p:'5,420',c:'+0.4%',u:1}},{{s:'NASDAQ',p:'18,650',c:'+1.2%',u:1}},
      {{s:'NVDA',p:'$205.10',c:'+46.51%',u:1}},{{s:'AAPL',p:'$182.10',c:'+1.2%',u:1}},
      {{s:'BTC',p:'$68,400',c:'−0.8%',u:0}},{{s:'MSFT',p:'$431.20',c:'+0.8%',u:1}}
    ];
    tape.innerHTML = [...td,...td].map(t =>
      '<div class="tc"><span>' + t.s + '</span> <span>' + t.p + '</span> <span>' + t.c + '</span></div>'
    ).join('');
  }}"""

    cursor_block = ''
    if cursor_id:
        cursor_block = f"""
  // Cursor
  var C = document.getElementById('{cursor_id}');
  if (C) {{
    document.addEventListener('mousemove', e => {{ C.style.left = e.clientX+'px'; C.style.top = e.clientY+'px'; }});
    document.addEventListener('mouseover', e => {{ C.classList.toggle('h', !!e.target.closest('button,a,[onclick]')); }});
    document.addEventListener('mousedown', () => C.style.transform = 'translate(-50%,-50%) scale(.75)');
    document.addEventListener('mouseup', () => C.style.transform = 'translate(-50%,-50%)');
  }}"""

    return f"""<script src="../../src/js/app.js"></script>
<script>
(function() {{
  window.showPage = function(page) {{
    document.querySelectorAll('{page_sel}').forEach(p => p.classList.remove('{active_cls}'));
    document.querySelectorAll('{nav_sel}').forEach(n => n.classList.remove('{nav_active}'));
    var pg = document.getElementById('{page_prefix}' + page);
    if (pg) pg.classList.add('{active_cls}');
    var ni = document.getElementById('{nav_prefix}' + page);
    if (ni) ni.classList.add('{nav_active}');
    window.scrollTo(0, 0);
    if (page === 'analytics') setTimeout(drawChart, 60);
  }};
  window.G = window.showPage;
  window.navigateTo = window.showPage;
{tape_block}
{cursor_block}
  // Chart bridge
  window.drawChart = function() {{
    var cv = document.getElementById('{canvas_id}') ||
             document.getElementById('price-chart-canvas');
    if (!cv) return;
    var ctx = cv.getContext('2d'), dpr = devicePixelRatio||1, W = cv.offsetWidth, H = 140;
    cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+'px'; cv.style.height=H+'px'; ctx.scale(dpr,dpr);
    var pts=[], v=160;
    for(var i=0;i<80;i++){{ v+=(Math.sin(i*.3)*.3+(Math.random()-.41))*v*.022; pts.push(Math.max(40,v)); }}
    var mn=Math.min(...pts)*.97, mx=Math.max(...pts)*1.03;
    var tx=i=>(i/(pts.length-1))*(W-16)+8, ty=v=>H-6-((v-mn)/(mx-mn))*(H-14);
    var g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'rgba(45,202,114,.15)'); g.addColorStop(1,'rgba(45,202,114,0)');
    ctx.beginPath(); pts.forEach((v,i)=>i?ctx.lineTo(tx(i),ty(v)):ctx.moveTo(tx(i),ty(v)));
    ctx.lineTo(tx(pts.length-1),H); ctx.lineTo(8,H); ctx.closePath(); ctx.fillStyle=g; ctx.fill();
    ctx.beginPath(); ctx.strokeStyle='#2dca72'; ctx.lineWidth=2; ctx.lineJoin='round';
    pts.forEach((v,i)=>i?ctx.lineTo(tx(i),ty(v)):ctx.moveTo(tx(i),ty(v))); ctx.stroke();
  }};

  setTimeout(() => showPage('analytics'), 50);
}})();
</script>"""

def process(path):
    html = open(path, encoding='utf-8').read()
    cfg = detect(html)

    print(f"Detected config for {path}:")
    for k,v in cfg.items():
        print(f"  {k}: {v}")

    shim = build_shim(cfg)

    # Replace existing inline script + </body>, or just append before </body>
    new_html = re.sub(r'<script>[\s\S]*?</script>\s*</body>', shim + '\n</body>', html)
    if new_html == html:
        # No inline script found — remove any existing script tags loading templates/app, then append
        new_html = re.sub(r'<script src="[^"]*templates\.js[^"]*"></script>\s*', '', html)
        new_html = re.sub(r'<script src="[^"]*app\.js[^"]*"></script>\s*', '', new_html)
        new_html = new_html.replace('</body>', shim + '\n</body>')

    open(path, 'w', encoding='utf-8').write(new_html)
    print(f"Done — {len(new_html.splitlines())} lines written.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/add_design.py designs/vN-name/index.html")
        sys.exit(1)
    process(sys.argv[1])
