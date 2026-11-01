const ziProducts = [
  { no: '01', type: 'DESKTOP', name: 'ZiSpace', description: '让桌面画面有自己的时间与空间。', status: '本地开发验证', image: 'space', url: 'zispace-zh.html' },
  { no: '02', type: 'SCREEN EDGE', name: 'ZIsland', description: '让屏幕上缘的信息出现得恰到好处。', status: '品牌整合与原生开发中', image: 'island', url: 'zisland-zh.html' },
  { no: '03', type: 'MENU BAR', name: 'Zilan', description: '让图标，各归其位。', status: '开发预览', image: 'zilan', url: 'zilan-zh.html' },
  { no: '04', type: 'VOICE INPUT', name: 'ZiVoice', description: '让声音，成为文字。', status: 'P0 自用测试版', image: 'voice', url: 'zivoice-zh.html' },
];

const ziOrigin = 'https://zi.fuluoyide.top/';
window.ZI_SECTION_HTML = `
  <div class="zi-rows" data-annotation-id="zi-product-index">
    <a class="zi-row zi-brand-row" href="${ziOrigin}zh.html" target="_blank" rel="noopener noreferrer" data-annotation-id="zi-brand-entry">
      <div class="zi-row-copy"><span class="zi-row-kicker">00 / PERSONAL PRODUCT STUDIO</span><h3>Zi / 梓</h3><p>一个名字，容纳不同作品。先认识品牌，再走进每件产品。</p><span class="zi-row-bottom">BRAND SITE <b>进入品牌网站 ↗</b></span></div>
      <div class="zi-row-media zi-brand-media"><img src="/assets/zi-wordmark.svg" alt="" loading="lazy"><span>ONE NAME. FOUR DIRECTIONS.</span></div>
    </a>
    <div class="zi-index-label"><span>PRODUCT INDEX</span><span>01—04</span></div>
    ${ziProducts.map(product => `
      <a class="zi-row" href="${ziOrigin}${product.url}" target="_blank" rel="noopener noreferrer" data-annotation-id="zi-${product.image}-entry">
        <div class="zi-row-copy"><span class="zi-row-kicker">${product.no} / ${product.type}</span><h3>${product.name}</h3><p>${product.description}</p><span class="zi-row-bottom"><span class="zi-status">● ${product.status}</span><b>了解产品 ↗</b></span></div>
        <div class="zi-row-media"><img src="/assets/zi-media/zi-collage-${product.image}-v1.jpg" alt="${product.name} 纸张拼贴概念图，非应用截图" loading="lazy"><span>${product.name.toUpperCase()} / VOL. ${product.no}</span></div>
      </a>`).join('')}
  </div>`;

window.ZI_SKILLS_HTML = `<div class="about-skills"><span>CAPABILITIES / 01—04</span><h4>我如何把想法做成产品</h4><ol><li>AIGC 产品架构与工作流设计</li><li>实时对话与多模态交互体验</li><li>Agent、RAG 与数据产品策略</li><li>从指标到商业化的闭环推进</li></ol></div>`;

function bindZiHash() {
  const tabs = document.querySelector('[role="tablist"][aria-label="个人内容栏目"]');
  if (!tabs || tabs.dataset.ziHashBound) return false;
  tabs.dataset.ziHashBound = 'true';
  tabs.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    const suffix = tab.id === 'tab-zi' ? '#zi' : '';
    history.replaceState(history.state, '', location.pathname + location.search + suffix);
  });
  const selectionObserver = new MutationObserver(() => {
    const active = tabs.querySelector('[role="tab"][aria-selected="true"]');
    if (active?.id === 'tab-zi' && location.hash !== '#zi') history.replaceState(history.state, '', location.pathname + location.search + '#zi');
    if (active?.id !== 'tab-zi' && location.hash === '#zi') history.replaceState(history.state, '', location.pathname + location.search);
  });
  selectionObserver.observe(tabs, { subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
  if (location.hash === '#zi') {
    document.getElementById('tab-zi')?.click();
    requestAnimationFrame(() => document.getElementById('work')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }
  window.addEventListener('hashchange', () => {
    if (location.hash === '#zi') {
      document.getElementById('tab-zi')?.click();
      document.getElementById('work')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  return true;
}

if (!bindZiHash()) {
  const observer = new MutationObserver(() => { if (bindZiHash()) observer.disconnect(); });
  observer.observe(document.getElementById('root'), { childList: true, subtree: true });
}
