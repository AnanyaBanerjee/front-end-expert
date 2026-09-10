const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const heroHeadline=document.querySelector('main h1');
if(heroHeadline){heroHeadline.innerHTML='Chat with every AI agent you deploy,<br>wherever it lives.';}
document.title='AgentChat Hub — Chat with every AI agent you deploy';
const galleryIntroCopy=document.querySelector('.app-gallery .section-intro > p:last-of-type');
if(galleryIntroCopy){galleryIntroCopy.textContent='Choose any device below to experience it.';}
const screens={cloud:['Cloud provider selection','Choose a supported provider and connect with your own API key.'],local:['Local server connection settings','Connect a reachable Ollama or LM Studio server and choose an installed model.'],agents:['A2A agent discovery by URL','Paste a compatible agent URL, fetch its agent card, and add it to your workspace.'],groups:['Agent groups in the desktop app','Keep your agents organized by project or purpose.']};
const tabs=[...document.querySelectorAll('[data-screen]')];
function selectTab(tab){tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});const key=tab.dataset.screen;const image=document.querySelector('#tour-image');image.src=`images/${key}.webp`;image.alt=`AgentChat Hub: ${screens[key][0]}`;document.querySelector('#tour-caption').textContent=screens[key][1];document.querySelector('#tour-panel').setAttribute('aria-labelledby',tab.id);}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let n;if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%tabs.length;if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i-1+tabs.length)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();selectTab(tabs[n]);tabs[n].focus();}});});
const contactAddress=['ananyabilbanerjee','gmail.com'].join('@');
document.querySelectorAll('[data-contact]').forEach(e=>{e.href=`mailto:${contactAddress}`;});
document.querySelectorAll('[data-contact-label]').forEach(e=>{e.textContent=contactAddress;});
let screenshotReturnFocus;
const screenshotButton=document.querySelector('.screenshot-open');
const imageDialog=document.querySelector('.image-dialog');
screenshotButton?.addEventListener('click',()=>{
  screenshotReturnFocus=screenshotButton;
  imageDialog.classList.remove('is-phone');
  imageDialog.querySelector('.gallery-dialog-controls').hidden=true;
  const source=document.querySelector('#tour-image');
  const enlarged=imageDialog.querySelector('.dialog-image');
  enlarged.src=source.src;
  enlarged.alt=source.alt;
  imageDialog.querySelector('.dialog-caption').textContent=document.querySelector('#tour-caption').textContent+' On small screens, scroll sideways to inspect the full screenshot.';
  imageDialog.showModal();
  document.body.classList.add('image-open');
});
imageDialog?.querySelector('.dialog-close').addEventListener('click',()=>imageDialog.close());
imageDialog?.addEventListener('close',()=>{document.body.classList.remove('image-open');screenshotReturnFocus?.focus();});
imageDialog?.addEventListener('click',e=>{if(e.target===imageDialog){const r=imageDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)imageDialog.close();}});
const themeToggle = document.querySelector('.theme-toggle');
function updateThemeToggle() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  if (themeToggle) themeToggle.querySelector('span').textContent = dark ? '☀' : '☾';
}
updateThemeToggle();
themeToggle?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
  try { localStorage.setItem('agentchat-theme', theme); } catch {}
  updateThemeToggle();
});
const galleryRows=[...document.querySelectorAll('.app-gallery .gallery-row')];
const galleryIntro=document.querySelector('.app-gallery .section-intro');
if(galleryRows.length>=2&&galleryIntro){
  galleryRows[0].dataset.galleryRow='Mac';
  galleryRows[1].dataset.galleryRow='iPhone';
  galleryIntro.insertAdjacentHTML('beforeend','<div class="gallery-switcher" role="tablist" aria-label="Choose a gallery"><button type="button" role="tab" aria-selected="true" data-gallery-view="Mac">Desktop</button><button type="button" role="tab" aria-selected="false" data-gallery-view="iPhone">iPhone</button></div>');
}
document.querySelectorAll('.gallery-arrows').forEach(arrows=>arrows.remove());
const galleryViewButtons=[...document.querySelectorAll('[data-gallery-view]')];
let activeGalleryView='Mac';
function startGalleryMotion(){
  galleryRows.forEach(row=>{
    const rail=row.querySelector('.gallery-rail');
    if(!rail)return;
    cancelAnimationFrame(rail._galleryFrame);
    if(row.dataset.galleryRow!==activeGalleryView||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    if(!rail._galleryMotionReady){
      const pause=()=>{rail._galleryPaused=true;};
      const resume=()=>{rail._galleryPaused=false;};
      rail.addEventListener('mouseenter',pause);
      rail.addEventListener('mouseleave',resume);
      rail.addEventListener('focusin',pause);
      rail.addEventListener('focusout',e=>{if(!rail.contains(e.relatedTarget))resume();});
      rail.addEventListener('touchstart',pause,{passive:true});
      rail.addEventListener('touchend',()=>window.setTimeout(resume,2200),{passive:true});
      rail._galleryMotionReady=true;
    }
    let previous=performance.now();
    const tick=now=>{
      const delta=Math.min(now-previous,40);
      previous=now;
      if(!rail._galleryPaused){
        rail.scrollLeft+=delta*0.018;
        if(rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-1)rail.scrollLeft=0;
      }
      rail._galleryFrame=requestAnimationFrame(tick);
    };
    rail._galleryFrame=requestAnimationFrame(tick);
  });
}
function selectGalleryView(view){
  activeGalleryView=view;
  galleryViewButtons.forEach(button=>button.setAttribute('aria-selected',String(button.dataset.galleryView===view)));
  galleryRows.forEach(row=>{row.hidden=row.dataset.galleryRow!==view;});
  startGalleryMotion();
}
galleryViewButtons.forEach(button=>button.addEventListener('click',()=>selectGalleryView(button.dataset.galleryView)));
const galleryItems=[...document.querySelectorAll('[data-gallery]')];
let galleryGroup=[],galleryPosition=0;
function renderGalleryImage(){
  const item=galleryGroup[galleryPosition];
  const image=imageDialog.querySelector('.dialog-image');
  image.src=item.dataset.full;
  image.alt=item.querySelector('img').alt;
  imageDialog.classList.toggle('is-phone',item.dataset.gallery==='iPhone');
  imageDialog.querySelector('.dialog-caption').textContent=item.dataset.caption;
  imageDialog.querySelector('.gallery-count').textContent=`${galleryPosition+1} / ${galleryGroup.length}`;
  imageDialog.querySelector('.image-scroll').scrollTo(0,0);
}
galleryItems.forEach(item=>item.addEventListener('click',()=>{
  screenshotReturnFocus=item;
  galleryGroup=galleryItems.filter(other=>other.dataset.gallery===item.dataset.gallery);
  galleryPosition=galleryGroup.indexOf(item);
  imageDialog.querySelector('.gallery-dialog-controls').hidden=false;
  renderGalleryImage();
  imageDialog.showModal();
  document.body.classList.add('image-open');
}));
function stepGallery(direction){galleryPosition=(galleryPosition+direction+galleryGroup.length)%galleryGroup.length;renderGalleryImage();}
imageDialog?.querySelector('.gallery-prev')?.addEventListener('click',()=>stepGallery(-1));
imageDialog?.querySelector('.gallery-next')?.addEventListener('click',()=>stepGallery(1));
imageDialog?.addEventListener('keydown',e=>{
  if(imageDialog.querySelector('.gallery-dialog-controls')?.hidden!==false)return;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();stepGallery(e.key==='ArrowRight'?1:-1);}
});
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{
  const rail=document.getElementById(button.dataset.rail);
  rail.scrollBy({left:Number(button.dataset.scroll)*(rail.querySelector('.gallery-item').getBoundingClientRect().width+22),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
selectGalleryView('Mac');
