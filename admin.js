// ==================== API 配置 ====================
// 使用您Vercel项目的生产域名
const API_BASE_URL = 'https://372790111z-wq-github-io.vercel.app';
const API_DATA_URL = `${API_BASE_URL}/api/data`;
// ==================== 结束配置 ====================

// 标签页切换功能
const tabBtns = document.querySelectorAll('.tab-btn');
const formPanels = document.querySelectorAll('.form-panel');

// 为标签按钮添加点击事件
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有按钮的active类
        tabBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的active类
        btn.classList.add('active');
        
        // 获取目标面板id
        const targetTab = btn.getAttribute('data-tab');
        
        // 隐藏所有面板
        formPanels.forEach(panel => panel.classList.remove('active'));
        // 显示目标面板
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// 添加教育经历项
function addEducationItem() {
    const educationList = document.getElementById('education-list');
    const itemCount = educationList.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'education-item form-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label for="edu-degree-${itemCount}">学位</label>
            <input type="text" name="edu-degree" placeholder="本科 - 给水排水工程">
        </div>
        <div class="form-group">
            <label for="edu-school-${itemCount}">学校</label>
            <input type="text" name="edu-school" placeholder="北京大学">
        </div>
        <div class="form-group">
            <label for="edu-time-${itemCount}">时间</label>
            <input type="text" name="edu-time" placeholder="2018.09 - 2022.06">
        </div>
        <div class="form-group">
            <label for="edu-desc-${itemCount}">描述</label>
            <textarea name="edu-desc" rows="3" placeholder="主修课程：数据结构、算法设计..."></textarea>
        </div>
        <button class="remove-btn" onclick="removeItem(this)">删除</button>
    `;
    
    educationList.appendChild(newItem);
}

// 添加技能项
function addSkillItem() {
    const skillsList = document.getElementById('skills-list');
    const itemCount = skillsList.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'skill-item form-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label for="skill-name-${itemCount}">技能名称</label>
            <input type="text" name="skill-name" placeholder="HTML/CSS">
        </div>
        <div class="form-group">
            <label for="skill-level-${itemCount}">熟练度（0-10）</label>
            <input type="number" name="skill-level" min="0" max="10" step="0.5" placeholder="9">
        </div>
        <button class="remove-btn" onclick="removeItem(this)">删除</button>
    `;
    
    skillsList.appendChild(newItem);
}

// 添加工作经历项
function addWorkItem() {
    const workList = document.getElementById('work-list');
    const itemCount = workList.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'work-item form-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label for="work-position-${itemCount}">职位</label>
            <input type="text" name="work-position" placeholder="前端开发工程师">
        </div>
        <div class="form-group">
            <label for="work-company-${itemCount}">公司</label>
            <input type="text" name="work-company" placeholder="ABC科技有限公司">
        </div>
        <div class="form-group">
            <label for="work-time-${itemCount}">时间</label>
            <input type="text" name="work-time" placeholder="2022.07 - 至今">
        </div>
        <div class="form-group">
            <label for="work-desc-${itemCount}">描述</label>
            <textarea name="work-desc" rows="3" placeholder="负责公司官网的前端开发和维护..."></textarea>
        </div>
        <button class="remove-btn" onclick="removeItem(this)">删除</button>
    `;
    
    workList.appendChild(newItem);
}

// 添加项目经历项
function addProjectItem() {
    const projectsList = document.getElementById('projects-list');
    const itemCount = projectsList.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'project-item form-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label for="project-name-${itemCount}">项目名称</label>
            <input type="text" name="project-name" placeholder="电商平台前端重构">
        </div>
        <div class="form-group">
            <label for="project-time-${itemCount}">时间</label>
            <input type="text" name="project-time" placeholder="2023.01 - 2023.06">
        </div>
        <div class="form-group">
            <label for="project-desc-${itemCount}">项目描述</label>
            <textarea name="project-desc" rows="3" placeholder="使用React和Redux重构了公司电商平台的前端部分..."></textarea>
        </div>
        <div class="form-group">
            <label for="project-tech-${itemCount}">技术栈</label>
            <input type="text" name="project-tech" placeholder="React、Redux、React Router、Axios、Sass">
        </div>
        <button class="remove-btn" onclick="removeItem(this)">删除</button>
    `;
    
    projectsList.appendChild(newItem);
}

// 添加作品项
function addWorksItem() {
    const worksList = document.getElementById('works-list');
    const itemCount = worksList.children.length;
    
    const newItem = document.createElement('div');
    newItem.className = 'works-item form-item';
    newItem.innerHTML = `
        <div class="form-group">
            <label for="work-title-${itemCount}">作品标题</label>
            <input type="text" name="work-title" placeholder="作品1">
        </div>
        <div class="form-group">
            <label for="work-desc-${itemCount}">作品描述</label>
            <textarea name="work-desc" rows="3" placeholder="请输入作品描述"></textarea>
        </div>
        <div class="form-group">
            <label for="work-img-${itemCount}">作品图片</label>
            <input type="file" name="work-img" accept="image/*">
        </div>
        <button class="remove-btn" onclick="removeItem(this)">删除</button>
    `;
    
    worksList.appendChild(newItem);
}

// 删除项目
function removeItem(btn) {
    const item = btn.parentElement;
    item.remove();
}

// ==================== 保存函数（已改造为API调用） ====================

// 通用API保存函数
async function saveDataToAPI(dataKey, data, successMessage = '保存成功！') {
    const payload = {};
    payload[dataKey] = data;
    
    try {
        const response = await fetch(API_DATA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            // API保存成功后，同时保存到本地作为缓存
            localStorage.setItem(dataKey, JSON.stringify(data));
            return { success: true, message: '✅ ' + successMessage + ' 数据已上传至服务器。' };
        } else {
            return { success: false, message: '❌ 保存失败：' + (result.message || '未知错误') };
        }
    } catch (error) {
        console.error('保存失败:', error);
        // 网络错误时降级到本地存储
        localStorage.setItem(dataKey, JSON.stringify(data));
        return { success: false, message: '❌ 网络错误，数据已临时保存到本地。' };
    }
}

// 保存基本信息（已改造）
const basicForm = document.getElementById('basic-form');
if (basicForm) {
    basicForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const saveBtn = basicForm.querySelector('button[type="submit"]');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '保存中...';
        saveBtn.disabled = true;
        
        const formData = new FormData(basicForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email')
        };
        
        // 处理头像文件
        const avatarFile = formData.get('avatar');
        if (avatarFile instanceof File && avatarFile.size > 0) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                data.avatar = event.target.result;
                const result = await saveDataToAPI('basicInfo', data, '基本信息保存成功！');
                alert(result.message);
                saveBtn.textContent = originalText;
                saveBtn.disabled = false;
            };
            reader.readAsDataURL(avatarFile);
        } else {
            // 如果没有选择新头像，保留原有头像
            const existingInfo = localStorage.getItem('basicInfo');
            if (existingInfo) {
                const existingData = JSON.parse(existingInfo);
                data.avatar = existingData.avatar;
            }
            
            const result = await saveDataToAPI('basicInfo', data, '基本信息保存成功！');
            alert(result.message);
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }
    });
}

// 保存教育经历（已改造）
async function saveEducation() {
    const saveBtn = document.querySelector('button[onclick="saveEducation()"]');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '保存中...';
    saveBtn.disabled = true;
    
    const educationItems = document.querySelectorAll('#education-list .education-item');
    const educationData = [];
    
    educationItems.forEach(item => {
        const degree = item.querySelector('input[name="edu-degree"]').value;
        const school = item.querySelector('input[name="edu-school"]').value;
        const time = item.querySelector('input[name="edu-time"]').value;
        const desc = item.querySelector('textarea[name="edu-desc"]').value;
        
        if (degree && school) {
            educationData.push({
                degree,
                school,
                time,
                desc
            });
        }
    });
    
    const result = await saveDataToAPI('education', educationData, '教育经历保存成功！');
    alert(result.message);
    
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
}

// 保存技能（已改造）
async function saveSkills() {
    const saveBtn = document.querySelector('button[onclick="saveSkills()"]');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '保存中...';
    saveBtn.disabled = true;
    
    const skillItems = document.querySelectorAll('#skills-list .skill-item');
    const skillsData = [];
    
    skillItems.forEach(item => {
        const name = item.querySelector('input[name="skill-name"]').value;
        const level = parseInt(item.querySelector('input[name="skill-level"]').value);
        
        if (name && !isNaN(level)) {
            skillsData.push({
                name,
                level
            });
        }
    });
    
    const result = await saveDataToAPI('skills', skillsData, '技能保存成功！');
    alert(result.message);
    
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
}

// 保存工作经历（已改造）
async function saveWork() {
    const saveBtn = document.querySelector('button[onclick="saveWork()"]');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '保存中...';
    saveBtn.disabled = true;
    
    const workItems = document.querySelectorAll('#work-list .work-item');
    const workData = [];
    
    workItems.forEach(item => {
        const position = item.querySelector('input[name="work-position"]').value;
        const company = item.querySelector('input[name="work-company"]').value;
        const time = item.querySelector('input[name="work-time"]').value;
        const desc = item.querySelector('textarea[name="work-desc"]').value;
        
        if (position && company) {
            workData.push({
                position,
                company,
                time,
                desc
            });
        }
    });
    
    const result = await saveDataToAPI('work', workData, '工作经历保存成功！');
    alert(result.message);
    
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
}

// 保存项目经历（已改造）
async function saveProjects() {
    const saveBtn = document.querySelector('button[onclick="saveProjects()"]');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '保存中...';
    saveBtn.disabled = true;
    
    const projectItems = document.querySelectorAll('#projects-list .project-item');
    const projectsData = [];
    
    projectItems.forEach(item => {
        const name = item.querySelector('input[name="project-name"]').value;
        const time = item.querySelector('input[name="project-time"]').value;
        const desc = item.querySelector('textarea[name="project-desc"]').value;
        const tech = item.querySelector('input[name="project-tech"]').value;
        
        if (name) {
            projectsData.push({
                name,
                time,
                desc,
                tech
            });
        }
    });
    
    const result = await saveDataToAPI('projects', projectsData, '项目经历保存成功！');
    alert(result.message);
    
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
}

// 保存作品（已改造 - 修复了async/await问题）
async function saveWorks() {
    const saveBtn = document.querySelector('button[onclick="saveWorks()"]');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '保存中...';
    saveBtn.disabled = true;
    
    try {
        const workItems = document.querySelectorAll('#works-list .works-item');
        const worksData = [];
        
        // 使用for...of循环处理异步操作
        for (const item of workItems) {
            const title = item.querySelector('input[name="work-title"]').value;
            const desc = item.querySelector('textarea[name="work-desc"]').value;
            const imgFile = item.querySelector('input[name="work-img"]').files[0];
            
            if (!title) continue; // 跳过没有标题的项
            
            const workData = { title, desc };
            
            // 处理图片文件
            if (imgFile instanceof File) {
                const imgDataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => resolve(event.target.result);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(imgFile);
                });
                workData.img = imgDataUrl;
            } else {
                workData.img = '';
            }
            
            worksData.push(workData);
        }
        
        // 发送到API
        const result = await saveDataToAPI('works', worksData, '作品保存成功！');
        alert(result.message);
        
    } catch (error) {
        console.error('保存作品失败:', error);
        alert('❌ 保存作品时发生错误，数据已保存到本地。');
        
        // 降级方案：保存到本地
        const workItems = document.querySelectorAll('#works-list .works-item');
        const worksData = [];
        
        workItems.forEach(item => {
            const title = item.querySelector('input[name="work-title"]').value;
            const desc = item.querySelector('textarea[name="work-desc"]').value;
            
            if (title) {
                worksData.push({ title, desc, img: '' });
            }
        });
        
        localStorage.setItem('works', JSON.stringify(worksData));
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

// ==================== 页面加载时恢复数据 ====================

// 从API加载数据的通用函数
async function loadDataFromAPI(dataKey, defaultValue = []) {
    try {
        const response = await fetch(API_DATA_URL);
        const allData = await response.json();
        
        if (allData && allData[dataKey] !== undefined) {
            return allData[dataKey];
        }
    } catch (error) {
        console.error(`从API加载${dataKey}失败:`, error);
    }
    
    // 如果API失败，尝试从本地缓存加载
    const localData = localStorage.getItem(dataKey);
    if (localData) {
        return JSON.parse(localData);
    }
    
    return defaultValue;
}

// 页面加载时恢复数据
window.addEventListener('DOMContentLoaded', async () => {
    // 恢复基本信息
    const basicInfo = await loadDataFromAPI('basicInfo', {});
    if (basicInfo && Object.keys(basicInfo).length > 0) {
        document.getElementById('name').value = basicInfo.name || '';
        document.getElementById('phone').value = basicInfo.phone || '';
        document.getElementById('email').value = basicInfo.email || '';
        // 恢复头像（显示在页面上，实际项目中可能需要预览功能）
        if (basicInfo.avatar) {
            // 创建一个预览元素
            const avatarPreview = document.createElement('div');
            avatarPreview.innerHTML = `<img src="${basicInfo.avatar}" alt="当前头像" style="max-width: 100px; max-height: 100px; margin-top: 10px; border-radius: 50%;">`;
            const avatarInput = document.getElementById('avatar');
            // 检查是否已存在预览
            const existingPreview = avatarInput.parentElement.querySelector('.avatar-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            avatarInput.parentElement.appendChild(avatarPreview);
            avatarPreview.className = 'avatar-preview';
        }
    }
    
    // 恢复教育经历
    const education = await loadDataFromAPI('education', []);
    if (education.length > 0) {
        const educationList = document.getElementById('education-list');
        educationList.innerHTML = '';
        
        education.forEach((item, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'education-item form-item';
            newItem.innerHTML = `
                <div class="form-group">
                    <label for="edu-degree-${index}">学位</label>
                    <input type="text" name="edu-degree" value="${item.degree}" placeholder="本科 - 计算机科学与技术">
                </div>
                <div class="form-group">
                    <label for="edu-school-${index}">学校</label>
                    <input type="text" name="edu-school" value="${item.school}" placeholder="北京大学">
                </div>
                <div class="form-group">
                    <label for="edu-time-${index}">时间</label>
                    <input type="text" name="edu-time" value="${item.time}" placeholder="2018.09 - 2022.06">
                </div>
                <div class="form-group">
                    <label for="edu-desc-${index}">描述</label>
                    <textarea name="edu-desc" rows="3" placeholder="主修课程：数据结构、算法设计...">${item.desc}</textarea>
                </div>
                <button class="remove-btn" onclick="removeItem(this)">删除</button>
            `;
            educationList.appendChild(newItem);
        });
    }
    
    // 恢复技能
    const skills = await loadDataFromAPI('skills', []);
    if (skills.length > 0) {
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        skills.forEach((item, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'skill-item form-item';
            newItem.innerHTML = `
                <div class="form-group">
                    <label for="skill-name-${index}">技能名称</label>
                    <input type="text" name="skill-name" value="${item.name}" placeholder="HTML/CSS">
                </div>
                <div class="form-group">
                    <label for="skill-level-${index}">熟练度（0-10）</label>
                    <input type="number" name="skill-level" min="0" max="10" step="0.5" value="${item.level}" placeholder="9">
                </div>
                <button class="remove-btn" onclick="removeItem(this)">删除</button>
            `;
            skillsList.appendChild(newItem);
        });
    }
    
    // 恢复工作经历
    const work = await loadDataFromAPI('work', []);
    if (work.length > 0) {
        const workList = document.getElementById('work-list');
        workList.innerHTML = '';
        
        work.forEach((item, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'work-item form-item';
            newItem.innerHTML = `
                <div class="form-group">
                    <label for="work-position-${index}">职位</label>
                    <input type="text" name="work-position" value="${item.position}" placeholder="前端开发工程师">
                </div>
                <div class="form-group">
                    <label for="work-company-${index}">公司</label>
                    <input type="text" name="work-company" value="${item.company}" placeholder="ABC科技有限公司">
                </div>
                <div class="form-group">
                    <label for="work-time-${index}">时间</label>
                    <input type="text" name="work-time" value="${item.time}" placeholder="2022.07 - 至今">
                </div>
                <div class="form-group">
                    <label for="work-desc-${index}">描述</label>
                    <textarea name="work-desc" rows="3" placeholder="负责公司官网的前端开发和维护...">${item.desc}</textarea>
                </div>
                <button class="remove-btn" onclick="removeItem(this)">删除</button>
            `;
            workList.appendChild(newItem);
        });
    }
    
    // 恢复项目经历
    const projects = await loadDataFromAPI('projects', []);
    if (projects.length > 0) {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        
        projects.forEach((item, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'project-item form-item';
            newItem.innerHTML = `
                <div class="form-group">
                    <label for="project-name-${index}">项目名称</label>
                    <input type="text" name="project-name" value="${item.name}" placeholder="电商平台前端重构">
                </div>
                <div class="form-group">
                    <label for="project-time-${index}">时间</label>
                    <input type="text" name="project-time" value="${item.time}" placeholder="2023.01 - 2023.06">
                </div>
                <div class="form-group">
                    <label for="project-desc-${index}">项目描述</label>
                    <textarea name="project-desc" rows="3" placeholder="使用React和Redux重构了公司电商平台的前端部分...">${item.desc}</textarea>
                </div>
                <div class="form-group">
                    <label for="project-tech-${index}">技术栈</label>
                    <input type="text" name="project-tech" value="${item.tech}" placeholder="React、Redux、React Router、Axios、Sass">
                </div>
                <button class="remove-btn" onclick="removeItem(this)">删除</button>
            `;
            projectsList.appendChild(newItem);
        });
    }
    
    // 恢复作品
    const works = await loadDataFromAPI('works', []);
    if (works.length > 0) {
        const worksList = document.getElementById('works-list');
        worksList.innerHTML = '';
        
        works.forEach((item, index) => {
            const newItem = document.createElement('div');
            newItem.className = 'works-item form-item';
            newItem.innerHTML = `
                <div class="form-group">
                    <label for="work-title-${index}">作品标题</label>
                    <input type="text" name="work-title" value="${item.title}" placeholder="作品1">
                </div>
                <div class="form-group">
                    <label for="work-desc-${index}">作品描述</label>
                    <textarea name="work-desc" rows="3" placeholder="请输入作品描述">${item.desc || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="work-img-${index}">作品图片</label>
                    <input type="file" name="work-img" accept="image/*">
                    ${item.img ? `<img src="${item.img}" alt="当前作品" style="max-width: 100px; max-height: 100px; margin-top: 10px; border-radius: 4px;">` : ''}
                </div>
                <button class="remove-btn" onclick="removeItem(this)">删除</button>
            `;
            worksList.appendChild(newItem);
        });
    }
});