/* Shared mood controller for the support/legal pages.
   Reads the same localStorage key as index.html, so whichever mood the visitor
   picked on the homepage carries across the whole site. */
(function () {
  var STORAGE_KEY = 'dv-mood';
  var MOODS = ['warm', 'fierce', 'bold', 'dreamy', 'wise', 'calm', 'grounded'];

  function apply(mood) {
    if (mood && MOODS.indexOf(mood) !== -1) {
      document.body.setAttribute('data-mood', mood);
    } else {
      document.body.removeAttribute('data-mood');
      mood = null;
    }
    document.querySelectorAll('.mood-orb').forEach(function (d) {
      d.setAttribute('aria-pressed', String(d.dataset.mood === mood));
    });
    var reset = document.querySelector('[data-mood-reset]');
    if (reset) reset.classList.toggle('is-active', !mood);
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved) document.body.classList.add('mood-picked');
    apply(saved);

    document.querySelectorAll('.mood-orb').forEach(function (dot) {
      dot.addEventListener('click', function () {
        var m = dot.dataset.mood;
        document.body.classList.add('mood-picked');
        apply(m);
        try { localStorage.setItem(STORAGE_KEY, m); } catch (e) {}
      });
    });
    var reset = document.querySelector('[data-mood-reset]');
    if (reset) reset.addEventListener('click', function () {
      apply(null);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
