// 侧边栏导航交互
let navItems, sections;

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 确保模态框处于隐藏状态
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 获取导航项和section元素
    navItems = document.querySelectorAll('.nav-item');
    sections = document.querySelectorAll('.section');
    
    // 为每个导航项添加点击事件监听器
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 获取目标section的id
            const targetId = item.getAttribute('href').substring(1);
            
            // 立即激活当前导航项
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // 平滑滚动到目标section
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // 使用更精确的滚动位置计算
                const offsetTop = targetElement.offsetTop;
                const offset = 20; // 顶部偏移量，避免导航栏遮挡
                
                window.scrollTo({
                    top: offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // 确保导航项保持激活状态
                setTimeout(() => {
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                }, 1000); // 滚动完成后再次激活，确保状态正确
            }
        });
    });
    
    // 监听滚动事件，更新导航高亮
    window.addEventListener('scroll', () => {
        let current = '';
        let maxVisibleRatio = 0;
        
        // 确保sections已正确获取
        if (sections.length === 0) {
            sections = document.querySelectorAll('.section');
        }
        
        // 找出当前可见的section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // 计算section与视口的交集
            const overlapTop = Math.max(sectionTop, window.scrollY);
            const overlapBottom = Math.min(sectionBottom, window.scrollY + window.innerHeight);
            const overlapHeight = Math.max(0, overlapBottom - overlapTop);
            
            // 如果section有可见部分，计算可见比例
            const visibleRatio = overlapHeight / sectionHeight;
            
            // 特殊处理：当页面在顶部时，激活第一个section
            if (window.scrollY < 100) {
                current = sections[0].getAttribute('id');
                maxVisibleRatio = 1;
            }
            // 特殊处理：当滚动到页面底部时，激活最后一个section
            else if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
                current = sections[sections.length - 1].getAttribute('id');
                maxVisibleRatio = 1;
            }
            // 正常情况：找出可见比例最大的section
            else if (visibleRatio > maxVisibleRatio) {
                maxVisibleRatio = visibleRatio;
                current = section.getAttribute('id');
            }
        });
        
        // 激活对应的导航项
        navItems.forEach(item => {
            const href = item.getAttribute('href').substring(1);
            if (href === current) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
    
    // 从localStorage加载数据并渲染页面
    loadBasicInfo();
    loadEducation();
    loadSkills();
    loadWork();
    loadProjects();
    loadWorks();
});

// 加载基本信息
function loadBasicInfo() {
    const basicInfo = localStorage.getItem('basicInfo');
    if (basicInfo) {
        const data = JSON.parse(basicInfo);
        document.querySelector('.name').textContent = data.name || '张三';
        document.querySelectorAll('.contact-item')[0].textContent = `电话：${data.phone || '138-0000-0000'}`;
        document.querySelectorAll('.contact-item')[1].textContent = `邮箱：${data.email || 'zhangsan@example.com'}`;
        
        // 加载头像
        if (data.avatar) {
            document.querySelector('.avatar').src = data.avatar;
        }
    }
}

// 加载教育经历
function loadEducation() {
    const education = localStorage.getItem('education');
    if (education) {
        const data = JSON.parse(education);
        const educationContainer = document.getElementById('education');
        
        // 清空现有内容（保留标题）
        const title = educationContainer.querySelector('.section-title');
        educationContainer.innerHTML = '';
        educationContainer.appendChild(title);
        
        // 添加教育经历项
        data.forEach(item => {
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.innerHTML = `
                <h3 class="education-degree">${item.degree}</h3>
                <p class="education-school">${item.school}</p>
                <p class="education-time">${item.time}</p>
                <p class="education-desc">${item.desc}</p>
            `;
            educationContainer.appendChild(educationItem);
        });
    }
}

// 加载技能
function loadSkills() {
    const skills = localStorage.getItem('skills');
    if (skills) {
        const data = JSON.parse(skills);
        const skillsContainer = document.getElementById('skills');
        
        // 清空现有内容（保留标题）
        const title = skillsContainer.querySelector('.section-title');
        skillsContainer.innerHTML = '';
        skillsContainer.appendChild(title);
        
        // 创建技能容器
        const skillsList = document.createElement('div');
        skillsList.className = 'skills-container';
        
        // 添加技能项
        data.forEach(item => {
            // 将10分制转换为百分比（1分=10%）
            const percentage = item.level * 10;
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${item.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${percentage}%;" data-level="${item.level}"></div>
                </div>
            `;
            skillsList.appendChild(skillItem);
        });
        
        skillsContainer.appendChild(skillsList);
        
        // 重新观察技能section，以便再次触发动画
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
}

// 加载工作经历
function loadWork() {
    const work = localStorage.getItem('work');
    if (work) {
        const data = JSON.parse(work);
        const workContainer = document.getElementById('work');
        
        // 清空现有内容（保留标题）
        const title = workContainer.querySelector('.section-title');
        workContainer.innerHTML = '';
        workContainer.appendChild(title);
        
        // 添加工作经历项
        data.forEach(item => {
            const workItem = document.createElement('div');
            workItem.className = 'work-item';
            workItem.innerHTML = `
                <h3 class="work-position">${item.position}</h3>
                <p class="work-company">${item.company}</p>
                <p class="work-time">${item.time}</p>
                <ul class="work-desc">
                    ${item.desc.split('\n').map(line => `<li>${line}</li>`).join('')}
                </ul>
            `;
            workContainer.appendChild(workItem);
        });
    }
}

// 加载项目经历
function loadProjects() {
    const projects = localStorage.getItem('projects');
    if (projects) {
        const data = JSON.parse(projects);
        const projectsContainer = document.getElementById('projects');
        
        // 清空现有内容（保留标题）
        const title = projectsContainer.querySelector('.section-title');
        projectsContainer.innerHTML = '';
        projectsContainer.appendChild(title);
        
        // 添加项目经历项
        data.forEach(item => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <h3 class="project-name">${item.name}</h3>
                <p class="project-time">${item.time}</p>
                <p class="project-desc">${item.desc}</p>
                <p class="project-tech">技术栈：${item.tech}</p>
            `;
            projectsContainer.appendChild(projectItem);
        });
    }
}

// 加载作品展示
function loadWorks() {
    const works = localStorage.getItem('works');
    const worksContainer = document.getElementById('works');
    
    // 清空现有内容（保留标题）
    const title = worksContainer.querySelector('.section-title');
    worksContainer.innerHTML = '';
    worksContainer.appendChild(title);
    
    // 创建作品容器
    const worksList = document.createElement('div');
    worksList.className = 'works-container';
    
    // 添加作品项
    if (works) {
        const data = JSON.parse(works);
        if (data.length > 0) {
            data.forEach(item => {
                const workItem = document.createElement('div');
                workItem.className = 'work-item';
                workItem.innerHTML = `
                    <img src="${item.img || 'work1.jpg'}" alt="${item.title}" class="work-img">
                    <p class="work-title">${item.title}</p>
                    ${item.desc ? `<p class="work-desc">${item.desc}</p>` : ''}
                `;
                
                // 添加点击事件，用于图片预览
                workItem.addEventListener('click', () => {
                    openImageModal(item);
                });
                
                worksList.appendChild(workItem);
            });
        } else {
            // 如果没有作品，添加一个提示
            worksList.innerHTML = `
                <div class="no-works">
                    <p>暂无作品，请到后台管理页面添加作品</p>
                </div>
            `;
        }
    } else {
        // 如果没有作品数据，添加一个提示
        worksList.innerHTML = `
            <div class="no-works">
                <p>暂无作品，请到后台管理页面添加作品</p>
            </div>
        `;
    }
    
    worksContainer.appendChild(worksList);
}

// 图片预览功能
const modal = document.getElementById('imageModal');
const modalContent = document.getElementById('modalContent');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.close');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetZoomBtn = document.getElementById('resetZoomBtn');
const zoomLevel = document.getElementById('zoomLevel');

// 放大相关变量
let scale = 1;
let minScale = 0.5;
let maxScale = 5;
let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;

// 打开图片预览模态框
function openImageModal(workItem) {
    // 首先隐藏模态框，避免图片加载时的闪烁
    modal.style.display = 'none';
    
    // 设置图片和信息
    modalImage.src = workItem.img || 'work1.jpg';
    modalTitle.textContent = workItem.title;
    modalDesc.textContent = workItem.desc || '';
    
    // 重置缩放和平移
    resetZoom();
    
    // 等待图片加载完成后显示模态框
    modalImage.onload = function() {
        // 显示模态框
        modal.style.display = 'flex';
        
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
        
        // 确保图片正确显示
        updateImageTransform();
        updateZoomLevel();
    };
    
    // 处理图片加载错误
    modalImage.onerror = function() {
        // 如果图片加载失败，显示默认图片
        modalImage.src = 'work1.jpg';
        // 显示模态框
        modal.style.display = 'flex';
        
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
        
        // 确保图片正确显示
        updateImageTransform();
        updateZoomLevel();
    };
}

// 关闭图片预览模态框
function closeImageModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetZoom();
}

// 重置缩放和平移
function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
    updateZoomLevel();
}

// 更新图片变换
function updateImageTransform() {
    // 使用transform属性并添加硬件加速
    modalImage.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    // 确保启用硬件加速
    modalImage.style.willChange = 'transform';
}

// 更新缩放比例显示
function updateZoomLevel() {
    const percent = Math.round(scale * 100);
    zoomLevel.textContent = `${percent}%`;
}

// 放大图片
function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        updateImageTransform();
        updateZoomLevel();
    }
}

// 缩小图片
function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateImageTransform();
        updateZoomLevel();
    }
}

// 滚轮缩放
function handleWheel(e) {
    e.preventDefault();
    
    // 保存当前缩放值
    const prevScale = scale;
    
    // 计算鼠标在模态框内的位置
    const modalRect = modalContent.getBoundingClientRect();
    const mouseX = e.clientX - modalRect.left;
    const mouseY = e.clientY - modalRect.top;
    
    // 优化：使用更小的缩放增量，使缩放更流畅
    const zoomSpeed = 0.05;
    if (e.deltaY < 0) {
        scale = Math.min(scale + zoomSpeed, maxScale);
    } else {
        scale = Math.max(scale - zoomSpeed, minScale);
    }
    
    // 计算缩放比例变化
    const scaleRatio = scale / prevScale;
    
    // 计算平移调整，使鼠标位置保持在图片上的同一位置
    // 优化：使用更精确的计算方式
    const offsetX = mouseX - modalRect.width / 2;
    const offsetY = mouseY - modalRect.height / 2;
    
    translateX = translateX * scaleRatio + offsetX * (scaleRatio - 1);
    translateY = translateY * scaleRatio + offsetY * (scaleRatio - 1);
    
    // 移除限制，允许图片全方位移动
    // 直接更新变换，不限制平移范围
    updateImageTransform();
    updateZoomLevel();
}

// 开始拖动
function startDrag(e) {
    // 无论缩放级别如何，都允许拖动
    isDragging = true;
    // 获取鼠标/触摸点的位置
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    startX = clientX - translateX;
    startY = clientY - translateY;
    modalContent.style.cursor = 'grabbing';
    // 防止选择文本
    e.preventDefault();
}

// 拖动中
function drag(e) {
    if (isDragging) {
        // 获取鼠标/触摸点的位置
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : startX + translateX);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : startY + translateY);
        
        // 优化：直接计算平移量，减少不必要的计算
        const newTranslateX = clientX - startX;
        const newTranslateY = clientY - startY;
        
        // 只有当平移量发生变化时才更新，减少不必要的重绘
        if (newTranslateX !== translateX || newTranslateY !== translateY) {
            translateX = newTranslateX;
            translateY = newTranslateY;
            updateImageTransform();
        }
        
        // 防止选择文本
        e.preventDefault();
    }
}

// 结束拖动
function endDrag() {
    isDragging = false;
    modalContent.style.cursor = 'grab';
}

// 双击重置
function handleDoubleClick() {
    resetZoom();
}

// 事件监听器

// 点击关闭按钮关闭模态框
closeBtn.addEventListener('click', closeImageModal);

// 点击模态框外部关闭模态框
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeImageModal();
    }
});

// 按ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// 放大/缩小/重置按钮
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
resetZoomBtn.addEventListener('click', resetZoom);

// 滚轮缩放
modalImage.addEventListener('wheel', handleWheel);

// 拖动事件
modalContent.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('mouseleave', endDrag);

// 双击重置
modalContent.addEventListener('dblclick', handleDoubleClick);

// 触摸事件支持
modalContent.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
        startDrag(e);
    }
});

modalContent.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
        drag(e);
    }
});

modalContent.addEventListener('touchend', (e) => {
    e.preventDefault();
    endDrag();
});

modalContent.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    endDrag();
});

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        // 获取宽度百分比
        const width = bar.style.width;
        
        // 重置并播放动画
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// 监听技能section的显示，触发动画
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'skills') {
            animateSkillBars();
            // 只观察一次
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// 当技能数据加载完成后，初始化技能条
function initSkillBars() {
    // 已经在loadSkills中设置了data-level属性，无需再次设置
    // 只需要确保技能条有正确的宽度
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        // 确保技能条有正确的宽度
        if (!bar.style.width) {
            const level = bar.getAttribute('data-level');
            if (level) {
                // 将10分制转换为百分比
                const percentage = level * 10;
                bar.style.width = `${percentage}%`;
            }
        }
    });
}

// 页面加载完成后初始化技能条
window.addEventListener('DOMContentLoaded', initSkillBars);