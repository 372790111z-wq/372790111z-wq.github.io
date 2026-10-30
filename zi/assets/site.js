const tabs=[...document.querySelectorAll('.product-tab')];
const panels=[...document.querySelectorAll('.stage-panel')];
const video=document.querySelector('.media-space video');
const videoButton=document.querySelector('.video-toggle');
const videoText=document.documentElement.lang==='en'?{pause:'Pause demo video',play:'Play demo video'}:{pause:'暂停演示视频',play:'播放演示视频'};
function selectProduct(tab){
  tabs.forEach(item=>{const selected=item===tab;item.classList.toggle('is-active',selected);item.setAttribute('aria-selected',selected?'true':'false');item.tabIndex=selected?0:-1});
  panels.forEach(panel=>{const selected=panel.id===tab.getAttribute('aria-controls');panel.hidden=!selected;panel.classList.toggle('is-active',selected)});
  if(tab.dataset.product==='space'){video.play().catch(()=>{});videoButton.textContent='Ⅱ';videoButton.setAttribute('aria-label',videoText.pause)}else video.pause();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectProduct(tab));
  tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectProduct(tabs[next]);tabs[next].focus()});
});
videoButton.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{});videoButton.textContent='Ⅱ';videoButton.setAttribute('aria-label',videoText.pause)}else{video.pause();videoButton.textContent='▶';videoButton.setAttribute('aria-label',videoText.play)}});
