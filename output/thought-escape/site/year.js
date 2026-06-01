(function () {
  // Year
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();

  // Apply persisted theme to body so palette matches the chosen world.
  try {
    var t = localStorage.getItem('te.theme');
    if (t && ['forest','ocean','mountain','snow'].indexOf(t) !== -1) {
      document.body.setAttribute('data-theme', t);
    }
  } catch (e) { /* no-op when storage is blocked */ }
})();
