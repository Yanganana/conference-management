// 全局变量
let currentPage = 'dashboard';
let agendas = [];
let templateAgendas = [];

// 演示会议数据 - 包含六个状态
let meetings = [
    {
        id: 1,
        title: '产品需求评审会议',
        time: '2024-07-20 14:00-15:00',
        location: '会议室A',
        organizer: '张三',
        attendees: ['李四', '王五', '赵六'],
        status: 'not_started',
        agenda: [
            { id: 1, title: '需求背景介绍', duration: 10, presenter: '张三' },
            { id: 2, title: '功能模块讨论', duration: 20, presenter: '李四' },
            { id: 3, title: '时间规划确认', duration: 15, presenter: '王五' },
            { id: 4, title: '风险评估', duration: 15, presenter: '赵六' }
        ],
        tasks: [
            { id: 1, title: '完善需求文档', assignee: '李四', deadline: '2024-07-22', status: 'pending' },
            { id: 2, title: '制定开发计划', assignee: '王五', deadline: '2024-07-23', status: 'pending' }
        ],
        minutes: '会议讨论了产品需求，确定了功能模块和时间规划。',
        checkInStatus: 'not_started'
    },
    {
        id: 2,
        title: '项目进度同步会议',
        time: '2024-07-18 10:00-11:00',
        location: '会议室B',
        organizer: '李四',
        attendees: ['张三', '王五', '赵六'],
        status: 'in_progress',
        agenda: [
            { id: 1, title: '上周工作回顾', duration: 20, presenter: '张三' },
            { id: 2, title: '本周计划安排', duration: 20, presenter: '李四' },
            { id: 3, title: '问题讨论', duration: 20, presenter: '王五' }
        ],
        tasks: [
            { id: 3, title: '修复登录 bug', assignee: '赵六', deadline: '2024-07-19', status: 'in_progress' },
            { id: 4, title: '优化数据库查询', assignee: '张三', deadline: '2024-07-20', status: 'pending' }
        ],
        minutes: '',
        checkInStatus: 'checking_in'
    },
    {
        id: 3,
        title: '技术架构设计会议',
        time: '2024-07-15 16:00-17:30',
        location: '线上会议',
        organizer: '王五',
        attendees: ['张三', '李四', '赵六', '孙七'],
        status: 'ended',
        agenda: [
            { id: 1, title: '架构方案介绍', duration: 30, presenter: '王五' },
            { id: 2, title: '技术选型讨论', duration: 30, presenter: '赵六' },
            { id: 3, title: '性能优化建议', duration: 30, presenter: '孙七' }
        ],
        tasks: [
            { id: 5, title: '设计API文档', assignee: '孙七', deadline: '2024-07-18', status: 'completed' },
            { id: 6, title: '搭建开发环境', assignee: '张三', deadline: '2024-07-17', status: 'completed' }
        ],
        minutes: '确定了微服务架构方案，技术栈选用 Node.js + Express + MongoDB。',
        checkInStatus: 'completed'
    },
    {
        id: 4,
        title: '市场推广会议',
        time: '2024-07-19 13:30-14:30',
        location: '会议室C',
        organizer: '赵六',
        attendees: ['张三', '李四', '王五'],
        status: 'cancelled',
        agenda: [
            { id: 1, title: '推广计划介绍', duration: 20, presenter: '赵六' },
            { id: 2, title: '预算讨论', duration: 20, presenter: '李四' },
            { id: 3, title: '执行方案确认', duration: 20, presenter: '张三' }
        ],
        tasks: [],
        minutes: '',
        checkInStatus: 'not_started'
    },
    {
        id: 5,
        title: '2024年第一季度总结会议',
        time: '2024-04-05 09:00-11:00',
        location: '大会议室',
        organizer: '张三',
        attendees: ['李四', '王五', '赵六', '孙七', '周八'],
        status: 'archived',
        agenda: [
            { id: 1, title: '季度业绩回顾', duration: 40, presenter: '张三' },
            { id: 2, title: '团队表现分析', duration: 30, presenter: '李四' },
            { id: 3, title: '存在问题讨论', duration: 30, presenter: '王五' },
            { id: 4, title: '改进措施制定', duration: 20, presenter: '赵六' }
        ],
        tasks: [
            { id: 7, title: '更新绩效考核制度', assignee: '孙七', deadline: '2024-04-15', status: 'completed' },
            { id: 8, title: '制定第二季度目标', assignee: '周八', deadline: '2024-04-10', status: 'completed' }
        ],
        minutes: '第一季度业绩达到预期，团队表现良好，制定了第二季度改进措施。',
        checkInStatus: 'completed'
    },
    {
        id: 6,
        title: '新员工入职培训会议',
        time: '2024-07-25 09:30-11:30',
        location: '培训室',
        organizer: '孙七',
        attendees: ['张三', '李四', '王五', '赵六', '周八'],
        status: 'pending_confirmation',
        agenda: [
            { id: 1, title: '公司介绍', duration: 20, presenter: '孙七' },
            { id: 2, title: '部门职责说明', duration: 30, presenter: '张三' },
            { id: 3, title: '工作流程讲解', duration: 30, presenter: '李四' },
            { id: 4, title: '企业文化分享', duration: 10, presenter: '王五' },
            { id: 5, title: 'Q&A', duration: 20, presenter: '赵六' }
        ],
        tasks: [
            { id: 9, title: '准备培训材料', assignee: '孙七', deadline: '2024-07-24', status: 'pending' },
            { id: 10, title: '安排培训座位', assignee: '周八', deadline: '2024-07-24', status: 'pending' }
        ],
        minutes: '',
        checkInStatus: 'not_started'
    }
];

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
        
        // 更新导航菜单的选中状态
        updateNavActiveState(pageId);
        
        // 保存当前选中状态到localStorage
        localStorage.setItem('activePage', pageId);
    }
}

// 更新导航菜单的选中状态
function updateNavActiveState(pageId) {
    // 移除所有菜单项的active类
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前页面的菜单项添加active类
    const activeLink = document.querySelector(`.sidebar a[href="#${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
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

// 渲染会议列表
function renderMeetings() {
    const meetingsGrid = document.querySelector('.meetings-grid');
    if (!meetingsGrid) return;
    
    // 清空现有内容
    meetingsGrid.innerHTML = '';
    
    // 遍历会议数据，生成会议卡片
    meetings.forEach(meeting => {
        // 获取状态文本和样式类
        const statusInfo = getMeetingStatusInfo(meeting.status);
        
        // 创建会议卡片元素
        const meetingCard = document.createElement('div');
        meetingCard.className = 'card';
        meetingCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3>${meeting.title}</h3>
                    <p style="color: #666; margin: 0.5rem 0;">${meeting.time}</p>
                    <p style="color: #666; margin: 0.5rem 0;">召集人: ${meeting.organizer}</p>
                    <p style="color: #666; margin: 0.5rem 0;">参会人数: ${meeting.attendees.length}</p>
                </div>
                <span class="status-tag ${meeting.status}">${statusInfo.text}</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="button secondary" style="flex: 1;" onclick="showMeetingDetail(${meeting.id})">查看详情</button>
            </div>
        `;
        
        // 添加到会议列表
        meetingsGrid.appendChild(meetingCard);
    });
}

// 获取会议状态信息
function getMeetingStatusInfo(status) {
    const statusMap = {
        'not_started': { text: '未开始', class: 'not_started' },
        'in_progress': { text: '进行中', class: 'in_progress' },
        'ended': { text: '已结束', class: 'ended' },
        'cancelled': { text: '已取消', class: 'cancelled' },
        'archived': { text: '已归档', class: 'archived' },
        'pending_confirmation': { text: '待确认', class: 'pending_confirmation' }
    };
    return statusMap[status] || { text: '未知', class: '' };
}

// 初始化模拟数据
function initMockData() {
    // 渲染会议列表
    renderMeetings();
    
    // 初始化议程模板数据
    templateAgendas = [
        {
            id: 1,
            name: '常规会议',
            items: [
                { title: '开场介绍', duration: 5, presenter: '主持人' },
                { title: '主题讨论', duration: 20, presenter: '主讲人' },
                { title: '问题答疑', duration: 10, presenter: '全体' },
                { title: '总结安排', duration: 5, presenter: '主持人' }
            ]
        },
        {
            id: 2,
            name: '项目启动会议',
            items: [
                { title: '项目背景', duration: 15, presenter: '项目经理' },
                { title: '目标设定', duration: 15, presenter: '项目经理' },
                { title: '分工安排', duration: 20, presenter: '项目经理' },
                { title: '时间规划', duration: 15, presenter: '项目经理' },
                { title: '风险评估', duration: 15, presenter: '全体' }
            ]
        },
        {
            id: 3,
            name: '需求评审会议',
            items: [
                { title: '需求背景', duration: 10, presenter: '产品经理' },
                { title: '功能模块', duration: 20, presenter: '产品经理' },
                { title: '技术可行性', duration: 15, presenter: '技术负责人' },
                { title: '时间评估', duration: 15, presenter: '技术负责人' },
                { title: '风险点讨论', duration: 15, presenter: '全体' }
            ]
        }
    ];
    
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

// 打开新建议程模板模态框
function openCreateAgendaTemplateModal() {
    // 初始化模板议程列表
    templateAgendas = [];
    
    // 打开模态框
    const modal = document.getElementById('create-agenda-template-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
    
    // 更新议程列表显示
    updateTemplateAgendaList();
}

// 关闭新建议程模板模态框
function closeCreateAgendaTemplateModal() {
    const modal = document.getElementById('create-agenda-template-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
    
    // 重置表单
    document.getElementById('create-agenda-template-form').reset();
    
    // 清空模板议程列表
    templateAgendas = [];
}

// 添加议程项到模板
function addAgendaItem() {
    // 生成唯一ID
    const id = Date.now();
    
    // 添加新议程项
    templateAgendas.push({
        id: id,
        title: '新议程项',
        description: ''
    });
    
    // 更新议程列表显示
    updateTemplateAgendaList();
}

// 更新模板议程列表显示
function updateTemplateAgendaList() {
    // 检查当前是在创建模板还是编辑模板
    let agendaList, noAgendaItems, isEditMode = false;
    
    // 检查当前哪个模态框是可见的
    const createModal = document.getElementById('create-agenda-template-modal');
    const editModal = document.getElementById('edit-agenda-template-modal');
    
    if (createModal && createModal.style.display === 'flex') {
        // 创建模板模式
        agendaList = document.getElementById('template-agenda-list');
        noAgendaItems = document.getElementById('no-agenda-items');
    } else if (editModal && editModal.style.display === 'flex') {
        // 编辑模板模式
        isEditMode = true;
        agendaList = document.getElementById('edit-template-agenda-list');
        noAgendaItems = document.getElementById('edit-no-agenda-items');
    } else {
        console.error('无法确定当前模态框状态');
        return;
    }
    
    if (!agendaList || !noAgendaItems) {
        console.error('无法找到议程列表元素');
        return;
    }
    
    if (templateAgendas.length === 0) {
        noAgendaItems.style.display = 'block';
        agendaList.innerHTML = '';
        agendaList.appendChild(noAgendaItems);
        return;
    }
    
    noAgendaItems.style.display = 'none';
    
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
    templateAgendas.forEach((item, index) => {
        html += `
            <div style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; background-color: #fafafa; border: 1px solid #e5e6eb; border-radius: 8px;">
                <div style="flex: 1;">
                    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                        <input type="text" placeholder="议程标题" value="${item.title}" oninput="templateAgendas[${index}].title = this.value" style="flex: 1; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px;">
                    </div>
                    <textarea placeholder="议程描述" oninput="templateAgendas[${index}].description = this.value" style="width: 100%; padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 14px; resize: vertical; min-height: 60px;">${item.description}</textarea>
                </div>
                <button type="button" onclick="removeTemplateAgendaItem(${index})" style="background-color: #ff4d4f; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; height: 32px; align-self: center;">删除</button>
            </div>
        `;
    });
    html += '</div>';
    
    agendaList.innerHTML = html;
    // 重新添加noAgendaItems元素，以便下次更新时可以找到它
    agendaList.appendChild(noAgendaItems);
}

// 删除模板中的议程项
function removeTemplateAgendaItem(index) {
    templateAgendas.splice(index, 1);
    updateTemplateAgendaList();
}

// 保存新建议程模板
function saveNewAgendaTemplate() {
    const form = document.getElementById('create-agenda-template-form');
    const name = document.getElementById('template-name').value;
    const description = document.getElementById('template-desc').value;
    
    // 验证表单
    if (!name.trim()) {
        alert('请输入模板名称');
        return;
    }
    
    // 模拟保存数据
    console.log('保存新议程模板:', {
        name: name.trim(),
        description: description.trim(),
        items: [...templateAgendas]
    });
    
    // 关闭模态框
    closeCreateAgendaTemplateModal();
    
    // 显示成功提示
    alert('议程模板创建成功！');
}

// 打开编辑议程模板模态框
function openEditAgendaTemplateModal(templateId) {
    // 模拟获取模板数据
    const template = {
        id: templateId,
        name: '产品规划会议',
        description: '标准的产品规划会议议程模板，包含项目背景、目标设定、规划讨论等环节',
        items: [
            {
                id: 1,
                title: '项目背景介绍',
                description: '介绍项目的背景和意义，让参会人员了解会议目的'
            },
            {
                id: 2,
                title: '目标设定',
                description: '讨论并确定项目的短期和长期目标'
            },
            {
                id: 3,
                title: '规划讨论',
                description: '详细讨论项目的实施计划和步骤'
            }
        ]
    };
    
    // 填充表单数据
    document.getElementById('edit-template-id').value = template.id;
    document.getElementById('edit-template-name').value = template.name;
    document.getElementById('edit-template-desc').value = template.description;
    
    // 设置议程项
    templateAgendas = [...template.items];
    
    // 更新议程列表显示
    setTimeout(() => {
        updateTemplateAgendaList();
    }, 100);
    
    // 打开模态框
    const modal = document.getElementById('edit-agenda-template-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭编辑议程模板模态框
function closeEditAgendaTemplateModal() {
    const modal = document.getElementById('edit-agenda-template-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
    
    // 清空模板议程列表
    templateAgendas = [];
}

// 保存编辑后的议程模板
function saveEditedAgendaTemplate() {
    const form = document.getElementById('edit-agenda-template-form');
    const templateId = document.getElementById('edit-template-id').value;
    const name = document.getElementById('edit-template-name').value;
    const description = document.getElementById('edit-template-desc').value;
    
    // 验证表单
    if (!name.trim()) {
        alert('请输入模板名称');
        return;
    }
    
    // 模拟保存数据
    console.log('保存编辑后的议程模板:', {
        id: templateId,
        name: name.trim(),
        description: description.trim(),
        items: [...templateAgendas]
    });
    
    // 关闭模态框
    closeEditAgendaTemplateModal();
    
    // 显示成功提示
    alert('议程模板编辑成功！');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    // 绑定议程模板页面的事件
    const newTemplateButton = document.querySelector('#agenda-templates .button');
    if (newTemplateButton) {
        newTemplateButton.onclick = openCreateAgendaTemplateModal;
    }
    
    // 绑定编辑按钮事件
    const editButtons = document.querySelectorAll('#agenda-templates .button.secondary');
    editButtons.forEach((button, index) => {
        button.onclick = function() {
            openEditAgendaTemplateModal(index + 1);
        };
    });
});
