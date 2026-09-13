// 言語の切り替え。初回は端末の言語、以降は選んだものを覚える。
(function () {
  var KEY = 'mercury-site-lang';
  var root = document.documentElement;

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    var t = document.querySelector('title[data-' + lang + ']');
    if (t) document.title = t.dataset[lang];
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
  var initial = saved || ((navigator.language || 'ja').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en');
  apply(initial);

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.lang);
      try { localStorage.setItem(KEY, b.dataset.lang); } catch (e) {}
    });
  });
})();
