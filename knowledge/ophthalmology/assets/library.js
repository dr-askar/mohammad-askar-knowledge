const filters=[...document.querySelectorAll('.kb-filter')];
const cards=[...document.querySelectorAll('.kb-card')];
const search=document.querySelector('.kb-search');
let active='all';
function filterCards(){const term=(search?.value||'').trim().toLocaleLowerCase('de');let visible=0;cards.forEach(card=>{const matchesCategory=active==='all'||card.dataset.category===active;const matchesText=!term||card.textContent.toLocaleLowerCase('de').includes(term);card.hidden=!(matchesCategory&&matchesText);if(!card.hidden)visible+=1});const empty=document.querySelector('.kb-empty');if(empty)empty.hidden=visible!==0}
filters.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));filterCards()}));
search?.addEventListener('input',filterCards);
const viewButtons=[...document.querySelectorAll('.kb-view-button')];
const views=[...document.querySelectorAll('.kb-view')];
function setView(name,focus=false){viewButtons.forEach(button=>{const active=button.dataset.view===name;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus()});views.forEach(view=>view.hidden=view.dataset.view!==name);history.replaceState(null,'',`#${name}`)}
viewButtons.forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
viewButtons.forEach((button,index)=>button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const offset=event.key==='ArrowRight'?1:-1;const next=(index+offset+viewButtons.length)%viewButtons.length;setView(viewButtons[next].dataset.view,true)}));
if(viewButtons.length)setView(location.hash==='#patienten'?'patienten':'facharzt');
