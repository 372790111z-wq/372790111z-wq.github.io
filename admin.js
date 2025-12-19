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
            <input type="text" name="edu-degree" placeholder="本科 - 计算机科学与技术">
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

// 保存基本信息
const basicForm = document.getElementById('basic-form');
if (basicForm) {
    basicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(basicForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email')
        };
        
        // 处理头像文件
        const avatarFile = formData.get('avatar');
        if (avatarFile instanceof File) {
            const reader = new FileReader();
            reader.onload = (event) => {
                data.avatar = event.target.result;
                localStorage.setItem('basicInfo', JSON.stringify(data));
                alert('基本信息保存成功！');
            };
            reader.readAsDataURL(avatarFile);
        } else {
            // 如果没有选择新头像，保留原有头像
            const existingInfo = localStorage.getItem('basicInfo');
            if (existingInfo) {
                const existingData = JSON.parse(existingInfo);
                data.avatar = existingData.avatar;
            }
            localStorage.setItem('basicInfo', JSON.stringify(data));
            alert('基本信息保存成功！');
        }
    });
}

// 保存教育经历
function saveEducation() {
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
    
    localStorage.setItem('education', JSON.stringify(educationData));
    alert('教育经历保存成功！');
}

// 保存技能
function saveSkills() {
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
    
    localStorage.setItem('skills', JSON.stringify(skillsData));
    alert('技能保存成功！');
}

// 保存工作经历
function saveWork() {
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
    
    localStorage.setItem('work', JSON.stringify(workData));
    alert('工作经历保存成功！');
}

// 保存项目经历
function saveProjects() {
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
    
    localStorage.setItem('projects', JSON.stringify(projectsData));
    alert('项目经历保存成功！');
}

// 保存作品
function saveWorks() {
    const workItems = document.querySelectorAll('#works-list .works-item');
    const worksData = [];
    let itemsProcessed = 0;
    
    // 如果没有作品项，直接保存
    if (workItems.length === 0) {
        localStorage.setItem('works', JSON.stringify(worksData));
        alert('作品保存成功！');
        return;
    }
    
    workItems.forEach((item, index) => {
        const title = item.querySelector('input[name="work-title"]').value;
        const desc = item.querySelector('textarea[name="work-desc"]').value;
        const imgFile = item.querySelector('input[name="work-img"]').files[0];
        
        if (title) {
            const workData = {
                title,
                desc
            };
            
            if (imgFile instanceof File) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    workData.img = event.target.result;
                    worksData[index] = workData;
                    itemsProcessed++;
                    
                    if (itemsProcessed === workItems.length) {
                        // 过滤掉空项
                        const validWorks = worksData.filter(item => item);
                        localStorage.setItem('works', JSON.stringify(validWorks));
                        alert('作品保存成功！');
                    }
                };
                reader.readAsDataURL(imgFile);
            } else {
                // 如果没有选择新图片，检查是否有原有图片
                workData.img = '';
                worksData[index] = workData;
                itemsProcessed++;
                
                if (itemsProcessed === workItems.length) {
                    const validWorks = worksData.filter(item => item);
                    localStorage.setItem('works', JSON.stringify(validWorks));
                    alert('作品保存成功！');
                }
            }
        } else {
            itemsProcessed++;
            
            if (itemsProcessed === workItems.length) {
                const validWorks = worksData.filter(item => item);
                localStorage.setItem('works', JSON.stringify(validWorks));
                alert('作品保存成功！');
            }
        }
    });
}

// 页面加载时恢复数据
window.addEventListener('DOMContentLoaded', () => {
    // 恢复基本信息
    const basicInfo = localStorage.getItem('basicInfo');
    if (basicInfo) {
        const data = JSON.parse(basicInfo);
        document.getElementById('name').value = data.name || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('email').value = data.email || '';
        // 恢复头像（显示在页面上，实际项目中可能需要预览功能）
        if (data.avatar) {
            // 创建一个预览元素
            const avatarPreview = document.createElement('div');
            avatarPreview.innerHTML = `<img src="${data.avatar}" alt="当前头像" style="max-width: 100px; max-height: 100px; margin-top: 10px; border-radius: 50%;">`;
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
    const education = localStorage.getItem('education');
    if (education) {
        const data = JSON.parse(education);
        const educationList = document.getElementById('education-list');
        // 清空现有项（保留一个空项）
        educationList.innerHTML = '';
        
        if (data.length === 0) {
            // 添加一个空项
            addEducationItem();
        } else {
            data.forEach((item, index) => {
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
    }
    
    // 恢复技能
    const skills = localStorage.getItem('skills');
    if (skills) {
        const data = JSON.parse(skills);
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        if (data.length === 0) {
            addSkillItem();
        } else {
            data.forEach((item, index) => {
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
    }
    
    // 恢复工作经历
    const work = localStorage.getItem('work');
    if (work) {
        const data = JSON.parse(work);
        const workList = document.getElementById('work-list');
        workList.innerHTML = '';
        
        if (data.length === 0) {
            addWorkItem();
        } else {
            data.forEach((item, index) => {
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
    }
    
    // 恢复项目经历
    const projects = localStorage.getItem('projects');
    if (projects) {
        const data = JSON.parse(projects);
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        
        if (data.length === 0) {
            addProjectItem();
        } else {
            data.forEach((item, index) => {
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
    }
    
    // 恢复作品
    const works = localStorage.getItem('works');
    if (works) {
        const data = JSON.parse(works);
        const worksList = document.getElementById('works-list');
        worksList.innerHTML = '';
        
        if (data.length === 0) {
            addWorksItem();
        } else {
            data.forEach((item, index) => {
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
    }
});
