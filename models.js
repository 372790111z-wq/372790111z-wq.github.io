/**
 * AI模型数据可视化模块
 * 数据来源: Artificial Analysis (artificialanalysis.ai)
 */

// AI模型数据
const aiModelsData = {
    metadata: {
        source: "OpenCompass & SuperCLUE",
        source_url: "https://rank.opencompass.org.cn/home & https://www.superclueai.com/generalpage",
        last_updated: "2026-01-31",
        total_models: 377,
        intelligence_index_version: "4.0"
    },
    top_models: [
        { rank: 1, model_name: "GPT-5.2", organization: "OpenAI", context_window: 400000, intelligence_index: 50.51, license: "proprietary", release_date: "2025-05" },
        { rank: 2, model_name: "Claude Opus 4.5", organization: "Anthropic", context_window: 200000, intelligence_index: 49.08, license: "proprietary", release_date: "2025-01" },
        { rank: 3, model_name: "Gemini 3 Pro", organization: "Google", context_window: 1000000, intelligence_index: 47.92, license: "proprietary", release_date: "2025-01" },
        { rank: 4, model_name: "GPT-5.1", organization: "OpenAI", context_window: 400000, intelligence_index: 47.02, license: "proprietary", release_date: "2025-01" },
        { rank: 5, model_name: "Gemini 3 Flash", organization: "Google", context_window: 1000000, intelligence_index: 45.85, license: "proprietary", release_date: "2025-01" },
        { rank: 6, model_name: "GPT-5.2 (medium)", organization: "OpenAI", context_window: 400000, intelligence_index: 45.32, license: "proprietary", release_date: "2025-05" },
        { rank: 7, model_name: "GPT-5 (high)", organization: "OpenAI", context_window: 400000, intelligence_index: 44.10, license: "proprietary", release_date: "2025-01" },
        { rank: 8, model_name: "Claude 4.5 Sonnet", organization: "Anthropic", context_window: 1000000, intelligence_index: 42.44, license: "proprietary", release_date: "2025-01" },
        { rank: 9, model_name: "Claude Opus 4.5", organization: "Anthropic", context_window: 200000, intelligence_index: 42.54, license: "proprietary", release_date: "2025-01" },
        { rank: 10, model_name: "Grok 4", organization: "xAI", context_window: 256000, intelligence_index: 41.33, license: "proprietary", release_date: "2025-02" }
    ],
    context_evolution: [
        { year: "2023", context: "4K-8K", models: "GPT-3.5, Llama 2" },
        { year: "2024初", context: "32K-128K", models: "GPT-4o, Claude 3" },
        { year: "2024中", context: "128K-200K", models: "Gemini 1.5, Qwen2.5" },
        { year: "2024末", context: "200K-1M", models: "GPT-5.1, Claude 3.7" },
        { year: "2025", context: "1M-10M", models: "Llama 4, Nova" }
    ]
};

// 机构颜色配置
const orgColors = {
    'OpenAI': '#00A67E',
    'Anthropic': '#D97757',
    'Google': '#4285F4',
    'xAI': '#000000',
    'default': '#999999'
};

// 获取机构颜色
function getOrgColor(org) {
    return orgColors[org] || orgColors['default'];
}

// 格式化上下文长度
function formatContext(tokens) {
    if (tokens >= 1000000) {
        return (tokens / 1000000).toFixed(0) + 'M';
    } else if (tokens >= 1000) {
        return (tokens / 1000).toFixed(0) + 'K';
    }
    return tokens.toString();
}

// 获取排名徽章类名
function getRankClass(rank) {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-default';
}

// 获取许可证类名
function getLicenseClass(license) {
    return license === 'open' ? 'license-open' : 'license-proprietary';
}

// 获取许可证文本
function getLicenseText(license) {
    return license === 'open' ? '开源' : '闭源';
}

// 渲染坐标图
function renderScatterChart(models) {
    const canvas = document.getElementById('modelsCanvas');
    const tooltip = document.getElementById('chartTooltip');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // 设置 Canvas 尺寸
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    const padding = { top: 60, right: 40, bottom: 60, left: 80 };
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 计算数据范围
    const maxContext = Math.max(...models.map(m => m.context_window));
    const maxIndex = Math.max(...models.map(m => m.intelligence_index));
    const minIndex = Math.min(...models.map(m => m.intelligence_index));
    
    // 绘制坐标轴
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Y轴
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    
    // X轴
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();
    
    // 绘制网格线
    ctx.strokeStyle = '#f5f5f5';
    ctx.lineWidth = 1;
    
    // 水平网格线
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const y = padding.top + (height - padding.top - padding.bottom) * (i / ySteps);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Y轴标签
        const indexValue = maxIndex - (maxIndex - minIndex) * (i / ySteps);
        ctx.fillStyle = '#999';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(indexValue.toFixed(1), padding.left - 10, y + 4);
    }
    
    // 垂直网格线
    const xSteps = 5;
    for (let i = 0; i <= xSteps; i++) {
        const x = padding.left + (width - padding.left - padding.right) * (i / xSteps);
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
        
        // X轴标签
        const contextValue = (maxContext / xSteps) * i;
        ctx.fillStyle = '#999';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(formatContext(contextValue), x, height - padding.bottom + 25);
    }
    
    // 绘制轴标题
    ctx.fillStyle = '#666';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('上下文窗口', width / 2, height - 15);
    
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('智能指数', 0, 0);
    ctx.restore();
    
    // 存储数据点位置用于交互
    const points = [];
    
    // 绘制数据点
    models.forEach(model => {
        const x = padding.left + (model.context_window / maxContext) * (width - padding.left - padding.right);
        const y = padding.top + (1 - (model.intelligence_index - minIndex) / (maxIndex - minIndex)) * (height - padding.top - padding.bottom);
        
        // 绘制点
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = getOrgColor(model.organization);
        ctx.fill();
        
        // 绘制边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 存储点信息
        points.push({
            x, y,
            model,
            radius: 8
        });
    });

    // 添加鼠标交互
    canvas.onmousemove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let found = null;
        for (const point of points) {
            const distance = Math.sqrt((mouseX - point.x) ** 2 + (mouseY - point.y) ** 2);
            if (distance < point.radius + 5) {
                found = point;
                break;
            }
        }

        if (found) {
            tooltip.innerHTML = `
                <div class="tooltip-model">${found.model.model_name}</div>
                <div class="tooltip-org">${found.model.organization}</div>
                <div class="tooltip-stats">
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">智能指数</span>
                        <span class="tooltip-stat-value">${found.model.intelligence_index.toFixed(2)}</span>
                    </div>
                    <div class="tooltip-stat">
                        <span class="tooltip-stat-label">上下文</span>
                        <span class="tooltip-stat-value">${formatContext(found.model.context_window)}</span>
                    </div>
                </div>
            `;

            // 获取容器位置
            const containerRect = canvas.parentElement.getBoundingClientRect();

            // 计算tooltip相对于容器的位置（使用鼠标位置）
            let tooltipX = e.clientX - containerRect.left + 15;
            let tooltipY = e.clientY - containerRect.top - 10;

            // 先显示tooltip以获取其尺寸
            tooltip.classList.add('visible');

            // 获取tooltip实际尺寸
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            // 检查是否超出右侧边界
            if (tooltipX + tooltipWidth > containerRect.width) {
                tooltipX = e.clientX - containerRect.left - tooltipWidth - 15;
            }

            // 检查是否超出左侧边界
            if (tooltipX < 0) {
                tooltipX = 15;
            }

            // 检查是否超出顶部边界
            if (tooltipY < 0) {
                tooltipY = e.clientY - containerRect.top + 20;
            }

            // 检查是否超出底部边界
            if (tooltipY + tooltipHeight > containerRect.height) {
                tooltipY = containerRect.height - tooltipHeight - 10;
            }

            tooltip.style.left = tooltipX + 'px';
            tooltip.style.top = tooltipY + 'px';
            canvas.style.cursor = 'pointer';
        } else {
            tooltip.classList.remove('visible');
            canvas.style.cursor = 'default';
        }
    };

    canvas.onmouseleave = () => {
        tooltip.classList.remove('visible');
    };
}



// 渲染时间线
function renderTimeline() {
    const timeline = document.getElementById('contextTimeline');
    if (!timeline) return;

    timeline.innerHTML = aiModelsData.context_evolution.map((item, index) => `
        <div class="timeline-node ${index === aiModelsData.context_evolution.length - 1 ? 'active' : ''}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-context">${item.context} tokens</div>
                <div class="timeline-models">${item.models}</div>
            </div>
        </div>
    `).join('');
}

// 筛选模型
function filterModels() {
    const orgFilter = document.getElementById('modelOrgFilter')?.value || 'all';
    const yearFilter = document.getElementById('modelYearFilter')?.value || 'all';

    let filtered = aiModelsData.top_models;

    if (orgFilter !== 'all') {
        filtered = filtered.filter(m => m.organization === orgFilter);
    }

    if (yearFilter !== 'all') {
        filtered = filtered.filter(m => m.release_date.startsWith(yearFilter));
    }

    renderScatterChart(filtered);
}

// 初始化模型模块
function initModelsModule() {
    // 渲染坐标图
    renderScatterChart(aiModelsData.top_models);

    // 渲染时间线
    renderTimeline();

    // 绑定筛选事件
    const orgFilter = document.getElementById('modelOrgFilter');
    const yearFilter = document.getElementById('modelYearFilter');

    if (orgFilter) {
        orgFilter.addEventListener('change', filterModels);
    }

    if (yearFilter) {
        yearFilter.addEventListener('change', filterModels);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initModelsModule);
