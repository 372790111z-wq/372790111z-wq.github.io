// public/annotation-overlay.js
// ⚠️ 此文件由标注系统统一维护，请勿修改
// v3.7：sections 兼容新旧 PRD 格式（数字章节号 + v3.6 功能点标题文本）
(function () {
  const host = location.hostname;
  const enabled = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '';
  if (!enabled) return;

  const style = document.createElement('style');
  style.textContent = `
    .ann-box { position:absolute; outline:2px solid red; pointer-events:none; z-index:9998; border-radius:2px; transition:opacity .2s; }
    .ann-box.ann-box-highlight { outline:3px solid #ff9500; outline-offset:2px; animation:annPulse 1s ease-in-out infinite; }
    @keyframes annPulse { 0%,100% { outline-color:#ff9500; } 50% { outline-color:#ffd23f; } }
    .ann-badge { position:absolute; top:-14px; left:-2px; background:red; color:#fff; font-size:12px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; padding:3px 9px; border-radius:4px; pointer-events:auto; cursor:pointer; white-space:nowrap; z-index:9999; font-weight:600; box-shadow:0 1px 4px rgba(0,0,0,.2); transition:all .15s; }
    .ann-badge:hover { background:#c53030; transform:scale(1.08); box-shadow:0 2px 8px rgba(0,0,0,.3); }
    .ann-popup { position:fixed; background:#fff; border:1.5px solid #e53e3e; border-radius:8px; box-shadow:0 4px 24px rgba(0,0,0,.15); z-index:10000; min-width:280px; max-width:400px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; overflow:hidden; }
    .ann-popup-header { background:#e53e3e; color:#fff; padding:8px 12px; cursor:move; display:flex; justify-content:space-between; align-items:center; user-select:none; font-weight:600; font-size:12px; gap:8px; }
    .ann-popup-page-hint { background:rgba(255,255,255,.25); padding:1px 6px; border-radius:3px; font-size:10px; margin-left:6px; font-weight:normal; }
    .ann-popup-actions { display:flex; gap:6px; align-items:center; }
    .ann-popup-btn { cursor:pointer; font-size:14px; line-height:1; opacity:.85; background:none; border:none; color:#fff; padding:0 2px; }
    .ann-popup-btn:hover { opacity:1; }
    .ann-popup-body { padding:12px 14px; max-height:500px; overflow-y:auto; line-height:1.6; color:#333; }
    .ann-popup-tabs { display:flex; gap:0; background:#fafafa; border-bottom:1px solid #eee; padding:0 14px; }
    .ann-popup-tab { border:none; background:none; padding:8px 12px; cursor:pointer; font-size:12px; color:#888; border-bottom:2px solid transparent; margin-bottom:-1px; }
    .ann-popup-tab:hover { color:#e53e3e; }
    .ann-popup-tab.active { color:#e53e3e; border-bottom-color:#e53e3e; font-weight:600; }
    .ann-popup-body h1,.ann-popup-body h2,.ann-popup-body h3 { font-size:13px; font-weight:700; margin:10px 0 4px; }
    .ann-popup-body p { margin:4px 0; }
    .ann-popup-body ul,.ann-popup-body ol { padding-left:18px; margin:4px 0; }
    .ann-popup-body li { margin:2px 0; }
    .ann-popup-body code { background:#f3f3f3; border-radius:3px; padding:1px 4px; font-size:11px; }
    .ann-popup-body strong { font-weight:700; }
    .ann-popup-notvisible { background:#fff8e6; border:1px solid #ffe0a3; padding:8px 10px; border-radius:4px; margin:0 0 10px; font-size:12px; color:#8a6d1f; }
    #ann-panel { position:fixed; bottom:20px; right:20px; z-index:10001; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:12px; }
    #ann-toggle-btn { background:#e53e3e; color:#fff; border:none; border-radius:50%; width:40px; height:40px; font-size:18px; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,.2); display:flex; align-items:center; justify-content:center; margin-left:auto; }
    #ann-drawer { background:#fff; border:1.5px solid #e53e3e; border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,.13); padding:14px; margin-bottom:10px; min-width:280px; max-width:340px; max-height:70vh; overflow-y:auto; display:none; }
    #ann-drawer.open { display:block; }
    .ann-section-title { font-weight:700; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.5px; margin-bottom:6px; }
    .ann-month-group { margin-bottom:8px; }
    .ann-month-header { font-weight:600; font-size:11px; color:#666; cursor:pointer; padding:3px 0; user-select:none; display:flex; align-items:center; gap:4px; }
    .ann-month-header:hover { color:#e53e3e; }
    .ann-month-arrow { display:inline-block; transition:transform .15s; font-size:10px; }
    .ann-month-group.collapsed .ann-month-arrow { transform:rotate(-90deg); }
    .ann-month-group.collapsed .ann-version-list { display:none; }
    .ann-version-list,.ann-req-list { display:flex; flex-direction:column; gap:4px; margin-bottom:8px; margin-left:12px; }
    .ann-req-list { margin-left:0; }
    .ann-chip { border:1.5px solid #ddd; background:#fafafa; border-radius:6px; padding:4px 10px; cursor:pointer; text-align:left; font-size:12px; color:#333; transition:all .15s; position:relative; width:100%; }
    .ann-chip:hover { border-color:#e53e3e; color:#e53e3e; }
    .ann-chip.active { border-color:#e53e3e; background:#e53e3e; color:#fff; font-weight:600; }
    .ann-chip-tag { display:inline-block; font-size:9px; padding:0 4px; border-radius:2px; margin-left:4px; vertical-align:middle; background:#ffa; color:#666; }
    .ann-annotation-list { margin-top:6px; margin-bottom:4px; padding-left:8px; display:flex; flex-direction:column; gap:3px; }
    .ann-annotation-item { display:flex; align-items:center; gap:6px; padding:4px 8px; border:1px solid #eee; border-radius:4px; cursor:pointer; font-size:11px; transition:all .15s; }
    .ann-annotation-item:hover { border-color:#e53e3e; background:#fff5f5; }
    .ann-annotation-item.not-visible { color:#999; background:#fafafa; }
    .ann-annotation-item.not-visible:hover { color:#666; background:#f5f5f5; }
    .ann-status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .ann-status-dot.visible { background:#52c41a; }
    .ann-status-dot.not-visible { background:#d9d9d9; }
    .ann-annotation-label { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .ann-page-hint { font-size:9px; color:#999; background:#f0f0f0; padding:1px 5px; border-radius:2px; flex-shrink:0; }
    .ann-annotation-item.not-visible .ann-page-hint { background:#e6f4ff; color:#1890ff; }
    .ann-annotation-item.ann-annotation-selected { border-color:#e53e3e; background:#fff5f5; font-weight:600; }
    .ann-annotation-item.ann-annotation-selected .ann-annotation-label { color:#e53e3e; }
    .ann-annotation-item.ann-annotation-showall { border-style:dashed; color:#1890ff; border-color:#91caff; background:#f0f9ff; margin-top:4px; }
    .ann-annotation-item.ann-annotation-showall:hover { background:#e6f4ff; border-color:#1890ff; }
    .ann-showall-icon { font-size:13px; }
    .ann-divider { border:none; border-top:1px solid #eee; margin:10px 0; }
    .ann-hide-btn, .ann-archive-btn { width:100%; background:none; border:1.5px solid #ddd; border-radius:6px; padding:5px; cursor:pointer; color:#888; font-size:11px; margin-top:4px; }
    .ann-hide-btn:hover, .ann-archive-btn:hover { border-color:#999; color:#333; }
    .ann-empty { color:#999; font-size:11px; text-align:center; padding:8px; }
  `;
  document.head.appendChild(style);

  // 从 fullPrdContent 里按 section id 抽取对应小节
  // section id 支持三种格式（v3.6 起）：
  //   1. 数字编号：     "6.1" / "4.7" / "12"         → 匹配标题前缀的数字（老 PRD）
  //   2. 完整标题文本：  "§ 功能点：个人技能 Tab"       → 匹配整个标题去掉 # 后的文本（v3.6 新 PRD）
  //   3. 部分标题关键词："功能点：个人技能 Tab"        → 包含匹配（容错）
  // 匹配该 section 的标题（## / ###）一直到下一个同级或更高级标题
  function extractSections(fullMd, sectionIds) {
    if (!fullMd || !sectionIds || sectionIds.length === 0) return '';
    const lines = fullMd.split(/\r?\n/);
    // 先找出所有标题行的索引和 level/title
    const headers = [];
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(#{1,6})\s+(.+)$/);
      if (!m) continue;
      const level = m[1].length;
      const title = m[2].trim();
      // 数字编号（老格式）：从标题里找 X 或 X.Y 这样的数字
      const idMatch = title.match(/^(\d+(?:\.\d+)*)\s/);
      headers.push({
        index: i,
        level,
        title,
        id: idMatch ? idMatch[1] : null,  // 老 PRD：数字章节号
      });
    }
    const blocks = [];
    sectionIds.forEach(sid => {
      if (!sid) return;
      const sidStr = String(sid).trim();
      // 三种匹配策略（按优先级）：
      let startIdx = -1;

      // 策略 1：数字章节号精确匹配（老 PRD 格式，如 "4.7"、"6.1"）
      if (/^\d+(?:\.\d+)*$/.test(sidStr)) {
        startIdx = headers.findIndex(h => h.id === sidStr);
      }

      // 策略 2：完整标题匹配（v3.6 新 PRD，如 "§ 功能点：个人技能 Tab"）
      if (startIdx < 0) {
        startIdx = headers.findIndex(h => h.title === sidStr);
      }

      // 策略 3：标题包含匹配（容错，如用户只写 "功能点：xxx" 没带 §）
      if (startIdx < 0) {
        startIdx = headers.findIndex(h => h.title.indexOf(sidStr) >= 0);
      }

      if (startIdx < 0) return;
      const startHeader = headers[startIdx];
      // 找下一个 level <= startHeader.level 的标题
      let endLine = lines.length;
      for (let j = startIdx + 1; j < headers.length; j++) {
        if (headers[j].level <= startHeader.level) {
          endLine = headers[j].index;
          break;
        }
      }
      const block = lines.slice(startHeader.index, endLine).join('\n').trim();
      if (block) blocks.push(block);
    });
    return blocks.join('\n\n---\n\n');
  }

  function renderMd(md) {
    if (!md) return '';
    // 先做 HTML 转义
    let text = md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    // 链接：[text](url) 支持，注意 url 可能含括号（相对路径），我们匹配到 )结尾
    text = text.replace(/\[([^\]]+)\]\(([^\s)]+(?:\([^)]*\)[^\s)]*)*)\)/g, '<a href="$2" target="_blank">$1</a>');
    // 行内样式
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 按行处理
    const lines = text.split(/\r?\n/);
    const out = [];
    let inList = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // 标题
      let m;
      if ((m = trimmed.match(/^###\s+(.+)$/))) {
        if (inList) { out.push('</ul>'); inList = false; }
        out.push('<h3>' + m[1] + '</h3>');
        continue;
      }
      if ((m = trimmed.match(/^##\s+(.+)$/))) {
        if (inList) { out.push('</ul>'); inList = false; }
        out.push('<h2>' + m[1] + '</h2>');
        continue;
      }
      if ((m = trimmed.match(/^#\s+(.+)$/))) {
        if (inList) { out.push('</ul>'); inList = false; }
        out.push('<h1>' + m[1] + '</h1>');
        continue;
      }
      // 列表项
      if ((m = trimmed.match(/^[-*]\s+(.+)$/))) {
        if (!inList) { out.push('<ul>'); inList = true; }
        out.push('<li>' + m[1] + '</li>');
        continue;
      }
      // 空行
      if (trimmed === '') {
        if (inList) { out.push('</ul>'); inList = false; }
        out.push('');
        continue;
      }
      // 普通段落
      if (inList) { out.push('</ul>'); inList = false; }
      out.push('<p>' + line + '</p>');
    }
    if (inList) out.push('</ul>');
    return out.join('\n');
  }

  function makeDraggable(el, handle) {
    let ox=0, oy=0, sx=0, sy=0;
    handle.addEventListener('mousedown', e => {
      if (e.target.classList.contains('ann-popup-btn')) return;
      e.preventDefault();
      sx=e.clientX; sy=e.clientY;
      const rect = el.getBoundingClientRect();
      ox = rect.left; oy = rect.top;
      el.style.right = 'auto'; el.style.bottom = 'auto';
      el.style.left = ox + 'px'; el.style.top = oy + 'px';
      const move = e2 => {
        const newLeft = ox + e2.clientX - sx;
        const newTop = oy + e2.clientY - sy;
        el.style.left = Math.max(-el.offsetWidth + 80, Math.min(window.innerWidth - 80, newLeft)) + 'px';
        el.style.top = Math.max(0, Math.min(window.innerHeight - 40, newTop)) + 'px';
      };
      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  }

  let data = { versions: [], archive: [] };
  let currentVersionId = null;
  let currentReqId = 'ALL';
  let currentAnnId = null;  // null = 不按功能点过滤；非 null = 只显示这一个功能点
  let visible = true;
  let collapsedMonths = new Set();
  const boxes = [];
  const popups = {};
  let popupCount = 0;

  async function loadData() {
    const previousData = data;
    const previousVersionId = currentVersionId;
    try {
      const res = await fetch('/annotations/index.json?t=' + Date.now());
      if (!res.ok) throw new Error('no index');
      const index = await res.json();
      const versionPromises = (index.versions || []).map(async v => {
        const r = await fetch(`/annotations/${v.id}.json?t=${Date.now()}`);
        return r.ok ? await r.json() : null;
      });
      data.versions = (await Promise.all(versionPromises)).filter(Boolean);
      data.archive = index.archive || [];
      const cur = data.versions.find(v => v.current) || data.versions[0];
      currentVersionId = cur ? cur.id : null;
    } catch (err) {
      // 保留已有内存态，避免面板关闭再打开时因瞬时请求失败而变空
      data = previousData && Array.isArray(previousData.versions) ? previousData : { versions: [], archive: [] };
      if (!currentVersionId) {
        currentVersionId = previousVersionId || null;
      }
    }
  }

  function getAnnotations() {
    const ver = data.versions.find(v => v.id === currentVersionId);
    if (!ver) return [];
    // 过滤掉 deprecated 的需求
    const activeReqs = ver.requirements.filter(r => r.status !== 'deprecated');
    const reqs = currentReqId === 'ALL' ? activeReqs : activeReqs.filter(r => r.id === currentReqId);
    // 过滤掉 deprecated 的 annotation
    let list = reqs.flatMap(r => (r.annotations || [])
      .filter(a => a.status !== 'deprecated')
      .map(a => ({...a, reqId:r.id, reqLabel:r.label, prdContent:r.prdContent, reqStatus:r.status})));
    if (currentAnnId) {
      list = list.filter(a => (a.annotationId || a.id) === currentAnnId);
    }
    return list;
  }

  function resolveElement(ann) {
    const aid = ann.annotationId;
    if (aid) {
      const el = document.querySelector(`[data-annotation-id="${aid}"]`);
      if (el) return el;
    }
    try { return document.querySelector(ann.selector); } catch { return null; }
  }

  function isVisible(ann) {
    const el = resolveElement(ann);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0;
  }

  function clearBoxes() { boxes.forEach(b => b.remove()); boxes.length = 0; }

  function drawBoxes() {
    clearBoxes();
    if (!visible) return;
    getAnnotations().forEach(ann => {
      const el = resolveElement(ann);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      const sY = window.scrollY || 0, sX = window.scrollX || 0;
      const box = document.createElement('div');
      box.className = 'ann-box';
      box.dataset.annId = ann.annotationId || ann.id;
      box.style.cssText = `left:${rect.left+sX-2}px;top:${rect.top+sY-2}px;width:${rect.width+4}px;height:${rect.height+4}px;`;
      const badge = document.createElement('div');
      badge.className = 'ann-badge';
      badge.textContent = ann.label || ann.id;
      badge.addEventListener('click', () => openPopup(ann));
      box.appendChild(badge);
      document.body.appendChild(box);
      boxes.push(box);
    });
  }

  function highlightBox(annotationId) {
    boxes.forEach(b => b.classList.remove('ann-box-highlight'));
    const box = boxes.find(b => b.dataset.annId === annotationId);
    if (!box) return false;
    box.classList.add('ann-box-highlight');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => box.classList.remove('ann-box-highlight'), 3000);
    return true;
  }

  function findAnnByAnnotationId(aid) {
    const ver = data.versions.find(v => v.id === currentVersionId);
    if (!ver) return null;
    for (const req of ver.requirements) {
      for (const a of (req.annotations || [])) {
        if ((a.annotationId || a.id) === aid) {
          return {...a, reqId:req.id, reqLabel:req.label, prdContent:req.prdContent, reqStatus:req.status};
        }
      }
    }
    return null;
  }

  function openPopup(ann) {
    const key = ann.annotationId || ann.id;
    if (popups[key]) { popups[key].remove(); delete popups[key]; }
    const offset = (popupCount % 6) * 30;
    popupCount++;
    const pop = document.createElement('div');
    pop.className = 'ann-popup';
    // v3.6 修复：用 left 明确定位，且约束在屏幕可见区（防止系统缩放导致弹窗跑到屏幕外）
    // 弹窗宽度按 CSS 里的 ann-popup 样式约为 400-420px
    const POP_W = 420;
    const visibleW = Math.min(window.innerWidth, window.screen.availWidth || window.innerWidth);
    const desiredLeft = visibleW - POP_W - 20 - offset;
    const safeLeft = Math.max(20, desiredLeft);
    pop.style.cssText = `top:${80 + offset}px; left:${safeLeft}px;`;
    const visibleNow = isVisible(ann);
    const pageHint = ann.page ? `<span class="ann-popup-page-hint">${ann.page}</span>` : '';
    const notVisibleTip = !visibleNow && ann.page
      ? `<div class="ann-popup-notvisible">⚠️ 此元素在当前页不可见，请前往 <strong>${ann.page}</strong> 查看实际效果</div>`
      : (!visibleNow ? `<div class="ann-popup-notvisible">⚠️ 此元素在当前页不可见</div>` : '');

    // 从 requirement 层取 fullPrdContent
    const ver = data.versions.find(v => v.id === currentVersionId);
    let fullPrd = '';
    if (ver) {
      const req = ver.requirements.find(r => r.id === ann.reqId);
      if (req && req.fullPrdContent) fullPrd = req.fullPrdContent;
    }
    const hasFull = !!fullPrd;
    const sections = ann.sections || [];
    const sectionPrd = (hasFull && sections.length > 0) ? extractSections(fullPrd, sections) : '';
    const hasSection = !!sectionPrd;

    const summaryHtml = `${notVisibleTip}${renderMd(ann.prdContent || '（无 PRD 内容）')}`;
    const fullHtml = hasFull ? renderMd(fullPrd) : '<p style="color:#999">暂无完整 PRD 原文</p>';
    // sections 显示：数字前加 § 前缀，文本 section 直接显示
    const sectionLabel = sections.map(s => {
      const str = String(s).trim();
      return /^\d+(?:\.\d+)*$/.test(str) ? `§${str}` : str;
    }).join(' · ');
    const sectionHtml = hasSection
      ? `${notVisibleTip}<p style="color:#888;font-size:11px;margin:0 0 8px">本标注对应原 PRD 小节：${sectionLabel}</p>${renderMd(sectionPrd)}`
      : '';

    // 默认 tab：优先 section；没有 section 时回退到 summary（兼容 v3.3 及以前的数据）
    const defaultTab = hasSection ? 'section' : (hasFull ? 'full' : 'summary');
    const tabs = [];
    if (hasSection) tabs.push({ id: 'section', label: '本节 PRD', html: sectionHtml });
    if (hasFull) tabs.push({ id: 'full', label: '完整原 PRD', html: fullHtml });
    // 只有当既没 section 又没 full 时才降级显示 summary
    if (!hasSection && !hasFull) tabs.push({ id: 'summary', label: 'PRD', html: summaryHtml });

    const tabsHtml = tabs.length > 1 ? `
      <div class="ann-popup-tabs">
        ${tabs.map(t => `<button class="ann-popup-tab${t.id === defaultTab ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
      </div>` : '';

    const bodiesHtml = tabs.map(t => `
      <div class="ann-popup-body" data-role="${t.id}" ${t.id === defaultTab ? '' : 'style="display:none"'}>${t.html}</div>
    `).join('');

    pop.innerHTML = `
      <div class="ann-popup-header">
        <span>📋 ${ann.reqLabel || ''} · ${ann.label || ann.id}${pageHint}</span>
        <div class="ann-popup-actions">
          <button class="ann-popup-btn ann-popup-reset" title="重置位置">⊙</button>
          <button class="ann-popup-btn ann-popup-close" title="关闭">×</button>
        </div>
      </div>
      ${tabsHtml}
      ${bodiesHtml}
    `;

    pop.querySelector('.ann-popup-close').addEventListener('click', () => { pop.remove(); delete popups[key]; });
    pop.querySelector('.ann-popup-reset').addEventListener('click', () => {
      // 重置时也用约束后的 left（和初始定位保持一致）
      const visibleW2 = Math.min(window.innerWidth, window.screen.availWidth || window.innerWidth);
      const safeLeft2 = Math.max(20, visibleW2 - POP_W - 20 - offset);
      pop.style.left = safeLeft2 + 'px';
      pop.style.top = (80 + offset) + 'px';
      pop.style.right = 'auto';
      pop.style.bottom = 'auto';
    });

    // tab 切换
    if (tabs.length > 1) {
      pop.querySelectorAll('.ann-popup-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          pop.querySelectorAll('.ann-popup-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const which = tab.dataset.tab;
          pop.querySelectorAll('.ann-popup-body').forEach(b => {
            b.style.display = (b.dataset.role === which) ? 'block' : 'none';
          });
        });
      });
    }

    makeDraggable(pop, pop.querySelector('.ann-popup-header'));
    document.body.appendChild(pop);
    popups[key] = pop;

    // v3.7：强制同步 reflow，确保弹窗立即可见
    pop.offsetHeight;
    requestAnimationFrame(() => {
      pop.style.transform = pop.style.transform || 'translateZ(0)';
    });
  }

  function groupByMonth(versions) {
    const groups = {};
    versions.forEach(v => {
      const m = v.id.substring(0, 6);
      if (!groups[m]) groups[m] = [];
      groups[m].push(v);
    });
    return Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(m => ({
      month: m,
      label: `${m.substring(0,4)}年${parseInt(m.substring(4,6))}月`,
      versions: groups[m].sort((a, b) => b.id.localeCompare(a.id))
    }));
  }

  let panelEl = null, drawerEl = null;

  function buildPanel() {
    if (panelEl) return;
    panelEl = document.createElement('div');
    panelEl.id = 'ann-panel';
    drawerEl = document.createElement('div');
    drawerEl.id = 'ann-drawer';
    const tb = document.createElement('button');
    tb.id = 'ann-toggle-btn';
    tb.title = '标注面板';
    tb.textContent = '📋';
    tb.addEventListener('click', async () => {
      drawerEl.classList.toggle('open');
      // 关闭只隐藏 UI，不清状态；重新打开直接显示当前内存数据
      renderPanel();
      drawBoxes();
    });
    panelEl.appendChild(drawerEl);
    panelEl.appendChild(tb);
    document.body.appendChild(panelEl);

    // 用事件委托：只绑定一次 click 到 drawer 上，之后无论 innerHTML 怎么重建都能工作
    drawerEl.addEventListener('click', handleDrawerClick);
  }

  function handleDrawerClick(e) {
    // 版本切换
    const vBtn = e.target.closest('[data-vid]');
    if (vBtn && drawerEl.contains(vBtn)) {
      e.stopPropagation();
      currentVersionId = vBtn.dataset.vid;
      currentReqId = 'ALL';
      renderPanel();
      drawBoxes();
      return;
    }

    // 月份折叠
    const mh = e.target.closest('.ann-month-header');
    if (mh) {
      const g = mh.parentElement;
      const m = g.dataset.month;
      g.classList.toggle('collapsed');
      if (g.classList.contains('collapsed')) collapsedMonths.delete('open:' + m);
      else collapsedMonths.add('open:' + m);
      return;
    }

    // 需求按钮
    const rBtn = e.target.closest('[data-rid]');
    if (rBtn) {
      currentReqId = rBtn.dataset.rid;
      currentAnnId = null;  // 切换需求时清除功能点选择
      renderPanel();
      drawBoxes();
      return;
    }

    // annotation 点击：切换为"只显示此功能点"模式 + 弹 PRD 面板 + 定位页面
    const ai = e.target.closest('.ann-annotation-item');
    if (ai) {
      const aid = ai.dataset.annId;
      // 如果当前已经是这个功能点选中，再点一次就取消筛选（回到需求级）
      if (currentAnnId === aid) {
        currentAnnId = null;
        renderPanel();
        drawBoxes();
        return;
      }
      currentAnnId = aid;
      renderPanel();
      drawBoxes();
      // v3.7：点面板条目 → 同时弹 PRD 面板 + 定位页面红框
      const ann = findAnnByAnnotationId(aid);
      if (ann) {
        openPopup(ann);
        // 如果元素在当前页可见，滚动定位并高亮
        if (isVisible(ann)) {
          setTimeout(() => highlightBox(aid), 100);
        }
      }
      return;
    }
    // 显示该需求全部按钮
    const showAllBtn = e.target.closest('[data-req-show-all]');
    if (showAllBtn) {
      currentAnnId = null;
      renderPanel();
      drawBoxes();
      return;
    }

    // 隐藏按钮
    if (e.target.id === 'ann-hide') {
      visible = !visible;
      renderPanel();
      drawBoxes();
      return;
    }

    // 归档按钮
    if (e.target.classList.contains('ann-archive-btn')) {
      window.open('/annotations/archive.html', '_blank');
      return;
    }
  }

  function renderPanel() {
    if (!drawerEl) return;
    const ver = data.versions.find(v => v.id === currentVersionId) || { requirements: [] };
    const mg = groupByMonth(data.versions);
    const monthHtml = mg.map((g, idx) => {
      const cm = idx === 0;
      const col = !cm && !collapsedMonths.has('open:' + g.month);
      return `
        <div class="ann-month-group${col ? ' collapsed' : ''}" data-month="${g.month}">
          <div class="ann-month-header"><span class="ann-month-arrow">▼</span><span>${g.label}（${g.versions.length}）</span></div>
          <div class="ann-version-list">
            ${g.versions.map(v => `<button class="ann-chip${v.id === currentVersionId ? ' active' : ''}" data-vid="${v.id}">${v.label}</button>`).join('')}
          </div>
        </div>`;
    }).join('');

    const archiveHtml = data.archive && data.archive.length > 0 ? `<button class="ann-archive-btn">📦 查看归档（${data.archive.length} 个）</button>` : '';

    // 面板只显示非 deprecated 的需求
    const reqHtml = ver.requirements.filter(r => r.status !== 'deprecated').map(r => {
      const tag = r.status === 'prd-only' ? '<span class="ann-chip-tag">待实现</span>' : '';
      const isActive = r.id === currentReqId;
      const annotationsHtml = isActive ? (() => {
        // 面板只显示非 deprecated 的 annotation
        const items = (r.annotations || []).filter(a => a.status !== 'deprecated').map(a => {
          const aid = a.annotationId || a.id;
          const vis = isVisible({annotationId: a.annotationId, selector: a.selector});
          const cls = vis ? 'visible' : 'not-visible';
          const dotCls = vis ? 'visible' : 'not-visible';
          const selectedCls = currentAnnId === aid ? ' ann-annotation-selected' : '';
          const pageHint = a.page ? `<span class="ann-page-hint">${vis ? a.page : '在 ' + a.page}</span>` : '';
          const title = currentAnnId === aid
            ? '再次点击取消筛选'
            : (vis ? '点击只显示此功能点' : `当前页不可见${a.page ? '，可前往 ' + a.page : ''}`);
          return `<div class="ann-annotation-item ${cls}${selectedCls}" data-ann-id="${aid}" title="${title}">
            <span class="ann-status-dot ${dotCls}"></span>
            <span class="ann-annotation-label">${a.label || a.id}</span>
            ${pageHint}
          </div>`;
        }).join('');
        // 加一个"显示该需求全部"按钮，只在有选中时显示
        const showAllHtml = currentAnnId
          ? `<div class="ann-annotation-item ann-annotation-showall" data-req-show-all="1" title="回到该需求全部功能点">
              <span class="ann-showall-icon">↻</span>
              <span class="ann-annotation-label">显示该需求全部标注</span>
            </div>`
          : '';
        return items + showAllHtml;
      })() : '';
      return `
        <div>
          <button class="ann-chip${isActive ? ' active' : ''}" data-rid="${r.id}">${r.label}${tag}</button>
          ${isActive ? `<div class="ann-annotation-list">${annotationsHtml}</div>` : ''}
        </div>`;
    }).join('');

    drawerEl.innerHTML = `
      <div class="ann-section-title">版本</div>
      ${mg.length > 0 ? monthHtml : '<div class="ann-empty">暂无版本</div>'}
      ${archiveHtml}
      <hr class="ann-divider">
      <div class="ann-section-title">需求</div>
      <div class="ann-req-list">
        <button class="ann-chip${currentReqId === 'ALL' ? ' active' : ''}" data-rid="ALL">全部显示</button>
        ${reqHtml}
      </div>
      <hr class="ann-divider">
      <button class="ann-hide-btn" id="ann-hide">${visible ? '隐藏所有标注' : '显示所有标注'}</button>
    `;
  }

  // ─── 只重绘红框，不重建面板 ───
  let redrawTimer = null;
  function scheduleRedraw() {
    if (redrawTimer) return;
    redrawTimer = requestAnimationFrame(() => {
      redrawTimer = null;
      drawBoxes();
    });
  }

  // ─── 面板的可见性状态每 2 秒低频刷一次 ───
  function scheduleVisibilityRefresh() {
    setInterval(() => {
      if (drawerEl && drawerEl.classList.contains('open')) {
        renderPanel();
      }
    }, 2000);
  }

  window.addEventListener('resize', scheduleRedraw);
  window.addEventListener('scroll', scheduleRedraw, true);

  // MutationObserver 只管红框，不管面板
  const mo = new MutationObserver((mutations) => {
    // 忽略来自 drawer 内部的变化，防止自循环
    const allFromDrawer = mutations.every(m => drawerEl && drawerEl.contains(m.target));
    if (allFromDrawer) return;
    scheduleRedraw();
  });
  function observeDOM() {
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  }

  function hookHistory() {
    const op = history.pushState, or = history.replaceState;
    history.pushState = function() { op.apply(this, arguments); setTimeout(() => { scheduleRedraw(); renderPanel(); }, 100); };
    history.replaceState = function() { or.apply(this, arguments); setTimeout(() => { scheduleRedraw(); renderPanel(); }, 100); };
    window.addEventListener('popstate', () => setTimeout(() => { scheduleRedraw(); renderPanel(); }, 100));
    window.addEventListener('hashchange', () => setTimeout(() => { scheduleRedraw(); renderPanel(); }, 100));
  }

  async function init() {
    await loadData();
    buildPanel();
    renderPanel();
    drawBoxes();
    observeDOM();
    hookHistory();
    scheduleVisibilityRefresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.__ANN_RELOAD__ = async () => { await loadData(); renderPanel(); drawBoxes(); };
})();
