// A quiet, accessible footer entry. Private content is returned only by the server.
(() => {
  function attach() {
    const footer = document.querySelector('footer.footer');
    if (!footer || footer.querySelector('[data-private-entry]')) return;
    const slot = footer.querySelector('span');
    if (!slot) return;
    const link = document.createElement('a');
    link.href = '/private/training';
    link.textContent = '私人空间';
    link.rel = 'nofollow';
    link.dataset.privateEntry = '';
    link.style.cssText = 'display:inline-flex;align-items:center;min-height:36px;margin-left:14px;font-size:11px;font-weight:400;letter-spacing:.04em;color:inherit;opacity:.7';
    slot.append(link);
  }
  let queued = false;
  const observer = new MutationObserver(() => {
    if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; attach(); }); }
  });
  observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  attach();
})();
