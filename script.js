// ===== 粒子背景效果 - 增强版 =====
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 粒子配置
    const particleCount = window.innerWidth > 768 ? 80 : 40;
    const connectionDistance = 160;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.5 + 0.2;
        }
    
        update() {
            this.x += this.vx;
            this.y += this.vy;
    
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.baseAlpha})`;
            ctx.fill();
        }
    }
    
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.4;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    
        connect();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== 增强版滚动动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 添加动画的元素
const animateElements = [
    '.competency-card',
    '.timeline-card',
    '.project-card',
    '.skill-category',
    '.portfolio-link',
    '.content-card'
];

animateElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== 平滑滚动增强 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 悬浮导航栏滚动高亮 - 优化版 =====
const sections = document.querySelectorAll('section[id]');
const floatingNavItems = document.querySelectorAll('.floating-nav-item');
const navSectionIds = Array.from(floatingNavItems).map(item => item.getAttribute('data-target'));

function updateActiveNav() {
    const scrollPosition = window.scrollY + 300;
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // 滚动到页面底部时激活最后一个
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSection = navSectionIds[navSectionIds.length - 1];
    }
    
    // 滚动到顶部时激活第一个
    if (window.scrollY < 200) {
        currentSection = 'hero';
    }
    
    floatingNavItems.forEach(item => {
        const target = item.getAttribute('data-target');
        if (target === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// ===== 导航栏滚动效果 - 优化版 =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, { passive: true });

// ===== 技能标签悬停效果 - 增强版 =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08) translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===== 项目卡片悬停效果 - 简洁版 =====
// 3D效果已由CSS处理，这里只添加额外的交互动画
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.project-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(8deg)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.project-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// ===== 时间线卡片悬停效果 =====
document.querySelectorAll('.timeline-card').forEach(card => {
    let animationFrame;
    
    card.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(animationFrame);
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        animationFrame = requestAnimationFrame(() => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ===== 能力卡片悬停效果 =====
document.querySelectorAll('.competency-card').forEach(card => {
    let animationFrame;
    
    card.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(animationFrame);
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 35;
        const rotateY = (centerX - x) / 35;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        animationFrame = requestAnimationFrame(() => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ===== 下载简历功能 =====
function downloadResume() {
    window.open('张梓琪AI2026.pdf', '_blank');
}

// ===== 控制台彩蛋 - 优化版 =====
console.log('%c👋 你好，代码探索者！', 'font-size: 20px; color: #3b82f6; font-weight: bold; font-family: system-ui, sans-serif;');
console.log('%c🚀 这个网站由AI产品经理张梓琪搭建', 'font-size: 14px; color: #64748b; font-family: system-ui, sans-serif;');
console.log('%c💡 如果你也热爱AI和产品，欢迎联系我！', 'font-size: 14px; color: #8b5cf6; font-family: system-ui, sans-serif;');
console.log('%c📧 372790111@qq.com', 'font-size: 14px; color: #3b82f6; font-weight: bold; font-family: system-ui, sans-serif;');

// ===== 页面加载完成 =====
window.addEventListener('load', () => {
    console.log('✅ 页面加载完成 - 视觉效果已优化');
    document.body.classList.add('loaded');
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===== 侧边栏头像悬停效果 =====
const sidebarAvatar = document.querySelector('.sidebar-avatar');
if (sidebarAvatar) {
    sidebarAvatar.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.45)';
    });
    
    sidebarAvatar.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.35)';
    });
}

// ===== 按钮点击波纹效果 =====
document.querySelectorAll('.cta-button, .knowledge-link, .portfolio-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 添加波纹动画样式
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== 打字效果 - 优化版 =====
const typingTextElement = document.getElementById('typing-text');
if (typingTextElement) {
    const titles = ['AI产品经理', 'AIGC专家', 'RTC架构师', '数据驱动决策'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeTitle() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(typeTitle, typingSpeed);
    }

    setTimeout(typeTitle, 1000);
}

// ===== 技能分类悬停效果 =====
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.15)';
    });

    category.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ===== 作品集链接悬停效果 =====
document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.portfolio-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.portfolio-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// ===== 内容卡片悬停效果 =====
document.querySelectorAll('.content-card:not(.disabled)').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.content-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(8deg)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.content-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// ===== 侧边标签悬停效果 =====
document.querySelectorAll('.sidebar-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== 联系人项目悬停效果 =====
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '1rem';
    });

    item.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0.8rem';
    });
});

// ===== 时间线卡片悬停指示器 =====
document.querySelectorAll('.timeline-card.clickable').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const dot = this.querySelector('.timeline-dot');
        if (dot) {
            dot.style.transform = 'translateX(-50%) scale(1.3)';
            dot.style.boxShadow = '0 0 0 4px var(--bg-secondary), 0 4px 16px rgba(59, 130, 246, 0.4)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const dot = this.querySelector('.timeline-dot');
        if (dot) {
            dot.style.transform = 'translateX(-50%) scale(1)';
            dot.style.boxShadow = '';
        }
    });
});

// ===== 项目亮点悬停效果 =====
document.querySelectorAll('.highlight').forEach(highlight => {
    highlight.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    highlight.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// ===== 项目标签悬停效果 =====
document.querySelectorAll('.project-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// ===== 页脚社交图标悬停效果 =====
document.querySelectorAll('.footer-social a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) rotate(3deg)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// ===== 导航知识库链接悬停效果 =====
const knowledgeLink = document.querySelector('.knowledge-link');
if (knowledgeLink) {
    knowledgeLink.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    knowledgeLink.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

console.log('🎨 所有视觉效果优化已完成！');
