// 全局变量
let currentPage = 'dashboard';
let agendas = [];

// 页面导航功能
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 关闭抽屉
    closeCreateMeetingDrawer();
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 更新当前页面
        currentPage = pageId;
        
        // 更新URL哈希
        window.location.hash = pageId;
    }
}

// 打开创建会议抽屉
function openCreateMeetingDrawer() {
    const drawer = document.getElementById('create-meeting-drawer');
    drawer.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭创建会议抽屉
function closeCreateMeetingDrawer() {
    const drawer = document.getElementById('create-meeting-drawer');
    drawer.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 打开议程模板选择模态框
function openAgendaTemplateModal() {
    const modal = document.getElementById('agenda-template-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭议程模板选择模态框
function closeAgendaTemplateModal() {
    const modal = document.getElementById('agenda-template-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 模拟议程模板数据
const agendaTemplates = [
    {
        name: "产品规划会议",
        items: [
            {
                title: "项目背景介绍",
                startTime: "",
                endTime: "",
                description: "介绍项目的背景和意义，让参会人员了解会议目的"
            },
            {
                title: "目标设定",
                startTime: "",
                endTime: "",
                description: "讨论并确定项目的短期和长期目标"
            },
            {
                title: "规划讨论",
                startTime: "",
                endTime: "",
                description: "详细讨论项目的实施计划和步骤"
            },
            {
                title: "风险评估",
                startTime: "",
                endTime: "",
                description: "识别可能的风险并制定应对措施"
            },
            {
                title: "下一步行动",
                startTime: "",
                endTime: "",
                description: "确定后续的具体行动和责任人"
            }
        ]
    },
    {
        name: "技术方案评审",
        items: [
            {
                title: "方案介绍",
                startTime: "",
                endTime: "",
                description: "技术负责人介绍方案的核心内容"
            },
            {
                title: "技术难点讨论",
                startTime: "",
                endTime: "",
                description: "针对方案中的技术难点进行深入讨论"
            },
            {
                title: "风险评估",
                startTime: "",
                endTime: "",
                description: "评估方案可能带来的风险和挑战"
            },
            {
                title: "优化建议",
                startTime: "",
                endTime: "",
                description: "参会人员提出优化建议"
            },
            {
                title: "决策与结论",
                startTime: "",
                endTime: "",
                description: "形成最终决策和结论"
            }
        ]
    },
    {
        name: "营销会议",
        items: [
            {
                title: "市场分析",
                startTime: "",
                endTime: "",
                description: "分析当前市场状况和竞争态势"
            },
            {
                title: "策略制定",
                startTime: "",
                endTime: "",
                description: "制定营销策略和推广计划"
            },
            {
                title: "预算讨论",
                startTime: "",
                endTime: "",
                description: "讨论营销预算的分配和使用"
            },
            {
                title: "执行计划",
                startTime: "",
                endTime: "",
                description: "确定具体的执行计划和时间表"
            },
            {
                title: "效果评估",
                startTime: "",
                endTime: "",
                description: "制定效果评估指标和方法"
            }
        ]
    }
];

// 选择议程模板
function selectAgendaTemplate(templateIndex) {
    const template = agendaTemplates[templateIndex];
    
    // 清空现有议程
    agendas = [];
    
    // 添加模板议程
    template.items.forEach(item => {
        agendas.push({
            title: item.title,
            startTime: item.startTime,
            endTime: item.endTime,
            description: item.description
        });
    });
    
    // 更新议程列表显示
    updateAgendaList();
    
    // 关闭模态框
    closeAgendaTemplateModal();
    
    // 显示成功提示
    alert(`已成功引入"${template.name}"模板的议程`);
}

// 打开编辑议程模态框
function editAgenda(index) {
    const agenda = agendas[index];
    
    // 填充表单数据
    document.getElementById('edit-agenda-index').value = index;
    document.getElementById('edit-agenda-title').value = agenda.title;
    document.getElementById('edit-agenda-start').value = agenda.startTime;
    document.getElementById('edit-agenda-end').value = agenda.endTime;
    document.getElementById('edit-agenda-desc').value = agenda.description || '';
    
    // 打开模态框
    const modal = document.getElementById('edit-agenda-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭编辑议程模态框
function closeEditAgendaModal() {
    const modal = document.getElementById('edit-agenda-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
}

// 保存编辑后的议程
function saveEditedAgenda() {
    const index = parseInt(document.getElementById('edit-agenda-index').value);
    const title = document.getElementById('edit-agenda-title').value;
    const startTime = document.getElementById('edit-agenda-start').value;
    const endTime = document.getElementById('edit-agenda-end').value;
    const description = document.getElementById('edit-agenda-desc').value;
    
    // 验证表单
    if (!title.trim()) {
        alert('请输入议程标题');
        return;
    }
    
    // 更新议程
    agendas[index] = {
        title: title.trim(),
        startTime: startTime,
        endTime: endTime,
        description: description.trim()
    };
    
    // 更新议程列表显示
    updateAgendaList();
    
    // 关闭模态框
    closeEditAgendaModal();
    
    // 显示成功提示
    alert('议程编辑成功！');
}

// 初始化页面
function init() {
    // 检查URL哈希，设置初始页面
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('dashboard');
    }
    
    // 绑定表单提交事件
    const meetingForm = document.getElementById('meeting-form');
    if (meetingForm) {
        meetingForm.addEventListener('submit', handleMeetingSubmit);
    }
    
    // 初始化模拟数据
    initMockData();
}

// 初始化模拟数据
function initMockData() {
    // 这里可以初始化一些模拟数据
    console.log('初始化模拟数据');
}

// 处理会议表单提交
function handleMeetingSubmit(e) {
    e.preventDefault();
    
    // 收集表单数据
    const formData = new FormData(e.target);
    const meetingData = {
        title: formData.get('title'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        organizer: formData.get('organizer'),
        负责人: formData.get('负责人'),
        location: formData.get('location'),
        attendees: ["参会人1", "参会人2"],
        agenda: [...agendas],
        attachments: []
    };
    
    // 模拟提交数据
    console.log('提交会议数据:', meetingData);
    
    // 重置表单和议程列表
    e.target.reset();
    agendas = [];
    updateAgendaList();
    
    // 显示成功消息
    alert('会议创建成功！');
    
    // 关闭抽屉
    closeCreateMeetingDrawer();
    
    // 刷新当前页面数据
    if (currentPage === 'meetings') {
        // 这里可以添加刷新会议列表的逻辑
        console.log('刷新会议列表');
    }
}

// 添加议程
function addAgenda() {
    const title = document.getElementById('agenda-title').value;
    const startTime = document.getElementById('agenda-start').value;
    const endTime = document.getElementById('agenda-end').value;
    const description = document.getElementById('agenda-desc').value;
    
    if (!title || !startTime || !endTime) {
        alert('请填写议程的标题和时间');
        return;
    }
    
    const agenda = {
        title,
        startTime,
        endTime,
        description
    };
    
    agendas.push(agenda);
    updateAgendaList();
    
    // 清空输入框
    document.getElementById('agenda-title').value = '';
    document.getElementById('agenda-start').value = '';
    document.getElementById('agenda-end').value = '';
    document.getElementById('agenda-desc').value = '';
}

// 更新议程列表显示
function updateAgendaList() {
    const agendaList = document.getElementById('agenda-list');
    if (!agendaList) return;
    
    if (agendas.length === 0) {
        agendaList.innerHTML = '<p style="color: #666; text-align: center; padding: 1rem;">暂无议程</p>';
        return;
    }
    
    let html = '<h4>已添加的议程</h4><div class="timeline">';
    agendas.forEach((agenda, index) => {
        html += `
            <div class="timeline-item">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h5>${agenda.title}</h5>
                        <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">
                            ${agenda.startTime ? new Date(agenda.startTime).toLocaleString() : ''} ${agenda.endTime ? `- ${new Date(agenda.endTime).toLocaleString()}` : ''}
                        </p>
                        ${agenda.description ? `<p style="color: #666; font-size: 0.9rem;">${agenda.description}</p>` : ''}
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button type="button" class="button secondary" onclick="editAgenda(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                            编辑
                        </button>
                        <button type="button" class="button secondary" onclick="removeAgenda(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                            删除
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    agendaList.innerHTML = html;
}

// 删除议程
function removeAgenda(index) {
    agendas.splice(index, 1);
    updateAgendaList();
}

// 筛选会议
function filterMeetings() {
    const searchTerm = document.getElementById('meeting-search').value.toLowerCase();
    const filterStatus = document.getElementById('meeting-filter').value;
    
    const meetingCards = document.querySelectorAll('.meetings-grid .card');
    
    meetingCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const status = card.querySelector('span').textContent;
        
        let matchesSearch = title.includes(searchTerm);
        let matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'notified' && status === '已通知') ||
                           (filterStatus === 'in_progress' && status === '进行中') ||
                           (filterStatus === 'decision_confirming' && status === '决议确认中');
        
        if (matchesSearch && matchesStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 筛选任务
function filterTasks() {
    const statusFilter = document.getElementById('task-status-filter').value;
    const priorityFilter = document.getElementById('task-priority-filter').value;
    
    const taskRows = document.querySelectorAll('#tasks tbody tr');
    
    taskRows.forEach(row => {
        const statusCell = row.cells[4];
        const status = statusCell.querySelector('span').textContent;
        
        const priorityCell = row.cells[5];
        const priority = priorityCell.querySelector('span').textContent;
        
        let matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'pending' && status === '待处理') ||
                           (statusFilter === 'in_progress' && status === '进行中') ||
                           (statusFilter === 'completed' && status === '已完成');
        
        let matchesPriority = priorityFilter === 'all' || 
                              (priorityFilter === 'low' && priority === '低') ||
                              (priorityFilter === 'medium' && priority === '中') ||
                              (priorityFilter === 'high' && priority === '高');
        
        if (matchesStatus && matchesPriority) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// 显示会议详情
function showMeetingDetail(meetingId) {
    // 模拟获取会议详情
    const mockMeeting = {
        _id: meetingId,
        title: meetingId === '1' ? '项目启动会议' : '需求评审会议',
        startTime: meetingId === '1' ? '2025-12-18T10:00:00' : '2025-12-19T14:30:00',
        endTime: meetingId === '1' ? '2025-12-18T11:30:00' : '2025-12-19T16:00:00',
        organizer: { name: meetingId === '1' ? '张三' : '李四', email: meetingId === '1' ? 'zhangsan@example.com' : 'lisi@example.com' },
        负责人: { name: meetingId === '1' ? '李四' : '张三', email: meetingId === '1' ? 'lisi@example.com' : 'zhangsan@example.com' },
        attendees: [
            { user: { _id: '3', name: '王五', email: 'wangwu@example.com' }, status: 'accepted', attended: false },
            { user: { _id: '4', name: '赵六', email: 'zhaoliu@example.com' }, status: 'pending', attended: false }
        ],
        agenda: [
            {
                title: '项目背景介绍',
                startTime: meetingId === '1' ? '2025-12-18T10:00:00' : '2025-12-19T14:30:00',
                endTime: meetingId === '1' ? '2025-12-18T10:30:00' : '2025-12-19T15:00:00',
                description: '介绍项目的背景和意义'
            },
            {
                title: '团队分工',
                startTime: meetingId === '1' ? '2025-12-18T10:30:00' : '2025-12-19T15:00:00',
                endTime: meetingId === '1' ? '2025-12-18T11:00:00' : '2025-12-19T15:30:00',
                description: '确定团队成员的分工和职责'
            },
            {
                title: '时间规划',
                startTime: meetingId === '1' ? '2025-12-18T11:00:00' : '2025-12-19T15:30:00',
                endTime: meetingId === '1' ? '2025-12-18T11:30:00' : '2025-12-19T16:00:00',
                description: '制定项目的时间规划和里程碑'
            }
        ],
        attachments: [
            { name: '项目计划书.pdf', url: '#', size: 2048000, uploadTime: '2025-12-17T10:00:00' },
            { name: '团队成员名单.xlsx', url: '#', size: 512000, uploadTime: '2025-12-17T11:00:00' }
        ],
        location: meetingId === '1' ? '会议室A' : '会议室B',
        status: meetingId === '1' ? 'notified' : 'in_progress',
        notes: '这是会议的实时记录...',
        recordingUrl: ''
    };
    
    // 生成会议详情HTML
    const detailContent = `
        <h2>${mockMeeting.title}</h2>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
                <span style="background-color: ${mockMeeting.status === 'notified' ? '#faad14' : '#1890ff'}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                    ${mockMeeting.status === 'notified' ? '已通知' : '进行中'}
                </span>
            </div>
            <div style="display: flex; gap: 1rem;">
                ${mockMeeting.status === 'notified' ? `<button class="button" onclick="startMeeting('${mockMeeting._id}')">启动会议</button>` : ''}
                ${mockMeeting.status === 'in_progress' ? `<button class="button" onclick="endMeeting('${mockMeeting._id}')">结束会议</button>` : ''}
                <button class="button" style="background-color: #52c41a;" onclick="checkIn('${mockMeeting._id}')">签到</button>
            </div>
        </div>
        
        <div class="card">
            <h3>会议基本信息</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
                <div>
                    <p style="color: #666; margin-bottom: 0.25rem;">开始时间</p>
                    <p>${new Date(mockMeeting.startTime).toLocaleString()}</p>
                </div>
                <div>
                    <p style="color: #666; margin-bottom: 0.25rem;">结束时间</p>
                    <p>${new Date(mockMeeting.endTime).toLocaleString()}</p>
                </div>
                <div>
                    <p style="color: #666; margin-bottom: 0.25rem;">地点</p>
                    <p>${mockMeeting.location}</p>
                </div>
                <div>
                    <p style="color: #666; margin-bottom: 0.25rem;">召集人</p>
                    <p>${mockMeeting.organizer.name}</p>
                </div>
                <div>
                    <p style="color: #666; margin-bottom: 0.25rem;">负责人</p>
                    <p>${mockMeeting.负责人.name}</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>参会人列表</h3>
            <table style="width: 100%; margin-top: 1rem; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #e8e8e8;">
                        <th style="text-align: left; padding: 0.5rem;">姓名</th>
                        <th style="text-align: left; padding: 0.5rem;">邮箱</th>
                        <th style="text-align: left; padding: 0.5rem;">状态</th>
                        <th style="text-align: left; padding: 0.5rem;">是否参会</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockMeeting.attendees.map(attendee => `
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 0.5rem;">${attendee.user.name}</td>
                            <td style="padding: 0.5rem;">${attendee.user.email}</td>
                            <td style="padding: 0.5rem;">
                                <span style="background-color: ${attendee.status === 'accepted' ? '#f6ffed' : '#fffbe6'}; color: ${attendee.status === 'accepted' ? '#52c41a' : '#faad14'}; padding: 0.125rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                                    ${attendee.status === 'accepted' ? '已接受' : '待确认'}
                                </span>
                            </td>
                            <td style="padding: 0.5rem;">
                                <span style="color: ${attendee.attended ? '#52c41a' : '#ff4d4f'}; font-size: 0.8rem;">
                                    ${attendee.attended ? '已参会' : '未参会'}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <h3>会议议程</h3>
            <div class="timeline" style="margin-top: 1rem;">
                ${mockMeeting.agenda.map((agenda, index) => `
                    <div class="timeline-item">
                        <h4>${agenda.title}</h4>
                        <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">
                            ${new Date(agenda.startTime).toLocaleString()} - ${new Date(agenda.endTime).toLocaleString()}
                        </p>
                        ${agenda.description ? `<p style="color: #666; font-size: 0.9rem;">${agenda.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h3>会议记录</h3>
            <div style="margin-top: 1rem;">
                <textarea style="width: 100%; min-height: 150px; padding: 0.5rem; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 1rem; resize: vertical;">
${mockMeeting.notes}
                </textarea>
                <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;">
                    <button class="button secondary">保存记录</button>
                    <button class="button">上传录音</button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>会议附件</h3>
            <div style="margin-top: 1rem;">
                ${mockMeeting.attachments.length > 0 ? `
                    <ul style="list-style: none; padding: 0;">
                        ${mockMeeting.attachments.map(attachment => `
                            <li style="padding: 0.5rem; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <a href="${attachment.url}" style="text-decoration: none; color: #1890ff;">${attachment.name}</a>
                                    <p style="color: #666; font-size: 0.8rem; margin: 0.25rem 0;">
                                        ${(attachment.size / 1024).toFixed(2)} KB · ${new Date(attachment.uploadTime).toLocaleString()}
                                    </p>
                                </div>
                                <button class="button secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">下载</button>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p style="color: #8c8c8c; text-align: center; padding: 1rem;">暂无附件</p>'}
            </div>
        </div>
    `;
    
    // 更新会议详情内容
    const detailContainer = document.getElementById('meeting-detail-content');
    if (detailContainer) {
        detailContainer.innerHTML = detailContent;
    }
    
    // 显示会议详情页面
    showPage('meeting-detail');
}

// 启动会议
function startMeeting(meetingId) {
    alert(`会议 ${meetingId} 已启动`);
    // 这里可以添加启动会议的逻辑
}

// 结束会议
function endMeeting(meetingId) {
    alert(`会议 ${meetingId} 已结束`);
    // 这里可以添加结束会议的逻辑
}

// 签到
function checkIn(meetingId) {
    alert(`会议 ${meetingId} 签到成功`);
    // 这里可以添加签到的逻辑
}

// 切换议程区域显示状态
function toggleAgenda() {
    const enableAgenda = document.getElementById('enable-agenda').checked;
    const agendaSection = document.getElementById('agenda-section');
    const noAgendaTip = document.getElementById('no-agenda-tip');
    
    if (enableAgenda) {
        agendaSection.style.display = 'block';
        noAgendaTip.style.display = 'none';
    } else {
        agendaSection.style.display = 'none';
        noAgendaTip.style.display = 'block';
        // 清空议程列表
        agendas = [];
        updateAgendaList();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
