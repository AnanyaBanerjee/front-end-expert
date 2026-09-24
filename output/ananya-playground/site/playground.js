(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

  const feature = document.querySelector('.world-feature');
  const announcement = document.getElementById('world-announcement');
  const controls = Array.from(document.querySelectorAll('[data-choose]'));
  function chooseWorld(world) {
    if (!controls.some(button => button.dataset.choose === world)) return;
    feature.dataset.world = world;
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choose === world)));
    document.querySelectorAll('[data-art]').forEach(image => image.classList.toggle('is-visible', image.dataset.art === world));
    document.querySelectorAll('[data-scene]').forEach(scene => {
      const active = scene.dataset.scene === world;
      scene.classList.toggle('is-visible', active);
      scene.setAttribute('aria-hidden', String(!active));
    });
    announcement.textContent = `${world[0].toUpperCase()}${world.slice(1)} world selected.`;
  }
  controls.forEach(button => button.addEventListener('click', () => chooseWorld(button.dataset.choose)));

  const menu = document.querySelector('.menu-button');
  const navigation = document.getElementById('navigation');
  function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  }
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.header')) setMenu(false);
  });
})();
