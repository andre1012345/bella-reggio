/* Bella Reggio · script condiviso: lingua, mappa al clic, consigli approvati dal foglio. */
(function () {
  var BR = window.BR = {
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbxWcEQ5eF6_843dAVen6mXXAgchis4HXTHRUVMbFhVmGPcTRYEBdzan7QYl61JKemKB/exec',
    TEMI: { mangiare: ['Mangiare e bere', 'Food & drink'], muoversi: ['Come muoversi', 'Getting around'],
            'da-vedere': ['Da vedere', 'Things to see'], mare: ['Mare e spiagge', 'Sea & beaches'],
            casa: ['La casa', 'The house'], altro: ['Consiglio', 'Tip'] },
    MI: ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],
    ME: ['January','February','March','April','May','June','July','August','September','October','November','December']
  };

  /* --- lingua --- */
  var root = document.documentElement, bIt = document.getElementById('btn-it'), bEn = document.getElementById('btn-en');
  function setLang(l) {
    root.lang = l;
    if (bIt) bIt.setAttribute('aria-pressed', String(l === 'it'));
    if (bEn) bEn.setAttribute('aria-pressed', String(l === 'en'));
    try { localStorage.setItem('br-lang', l); } catch (e) {}
  }
  function fromHash() { var h = (location.hash || '').slice(1); return (h === 'it' || h === 'en') ? h : null; }
  var saved = null; try { saved = localStorage.getItem('br-lang'); } catch (e) {}
  setLang(fromHash() || saved || ((navigator.language || 'it').toLowerCase().indexOf('it') === 0 ? 'it' : 'en'));
  if (bIt) bIt.addEventListener('click', function () { setLang('it'); });
  if (bEn) bEn.addEventListener('click', function () { setLang('en'); });
  window.addEventListener('hashchange', function () { var h = fromHash(); if (h) setLang(h); });

  /* --- helper DOM --- */
  BR.el = function (t, c, txt) { var e = document.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; };
  BR.bi = function (a, b) { var w = BR.el('span'), x = BR.el('span', null, a), y = BR.el('span', null, b);
    x.setAttribute('data-l', 'it'); y.setAttribute('data-l', 'en'); w.append(x, y); return w; };

  /* --- mappa: si carica solo al clic (più leggera, niente cookie Google finché non serve) --- */
  document.querySelectorAll('.map[data-src]').forEach(function (m) {
    var b = m.querySelector('.load'); if (!b) return;
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = m.getAttribute('data-src'); f.title = 'Mappa / Map'; f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      m.innerHTML = ''; m.appendChild(f);
    });
  });

  /* --- consigli approvati: una chiamata, usata da tutte le pagine che la chiedono --- */
  var cache = null;
  BR.tips = function () {
    if (!cache) cache = fetch(BR.ENDPOINT).then(function (r) { return r.json(); })
      .then(function (d) { return d.tips || []; }).catch(function () { return []; });
    return cache;
  };
  /* crea la scheda di un consiglio (tag: 'figure' in home, 'article' nel blog) */
  BR.tipNode = function (t, tag, cls) {
    var key = BR.TEMI[t.k] ? t.k : 'altro', k = BR.TEMI[key];
    var ym = String(t.m || '').split('-'), mi = +ym[1] - 1, name = String(t.n || '').trim(), city = t.c ? ', ' + t.c : '';
    var n = BR.el(tag, cls + ' guest'); n.dataset.k = key;
    var lab = BR.el('span', 'k'); lab.append(BR.bi(k[0], k[1]));
    var p = BR.el('p', null, t.t); if (t.l) p.lang = t.l;
    var who = BR.el(tag === 'figure' ? 'cite' : 'footer', 'who');
    who.append(BR.el('span', 'av', (name || '★').charAt(0).toUpperCase()));
    var line = BR.el('span');
    line.append(name ? BR.el('span', null, name + city) : BR.bi('Ospite' + city, 'Guest' + city));
    if (mi >= 0) { line.append(BR.el('span', null, ' · ')); line.append(BR.bi(BR.MI[mi] + ' ' + ym[0], BR.ME[mi] + ' ' + ym[0])); }
    who.append(line);
    n.append(lab, p, who);
    return n;
  };
})();
