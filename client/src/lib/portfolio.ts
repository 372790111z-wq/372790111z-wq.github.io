/**
 * 设计提醒：内容保持项目注释般的清晰密度；数据仅迁移自用户公开站点，页面通过编号和章节来组织，而非营销卡片。
 */
export type Metric = { value: string; label: string };
export type DetailBlock = { title: string; description: string };
export type DocumentLink = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  number: string;
  tag: string;
  title: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
  metrics: Metric[];
  overview: string;
  responsibilities: string[];
  modules: DetailBlock[];
  chapterLabel: string;
  chapters: DetailBlock[];
  documents: DocumentLink[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lingxi",
    number: "01",
    tag: "RTC / AI",
    title: "中国移动“灵犀”AI 助手项目",
    company: "天津神州数据科技有限公司",
    period: "2025.03 — 至今",
    summary: "端云协同的智能打断机制设计与 AIGC 自动化生产。",
    tags: ["RTC", "AI Agent", "AIGC", "VAD", "多模态交互", "Prompt 工程"],
    metrics: [
      { value: "< 800ms", label: "端到端响应延迟" },
      { value: "≥ 95%", label: "ASR 准确率" },
      { value: "> 90%", label: "意图识别率" },
      { value: "−15%", label: "Token 消耗优化" },
    ],
    overview: "灵犀是面向企业内部办公及政务咨询场景的 AI 智能助理生态系统。作为核心 AI 产品经理，主导 RTC、AIGC 自动化生产等模块的架构设计与落地，推动服务从人工响应走向 AI 驱动的智能协同。",
    responsibilities: [
      "设计 Agent 任务规划、记忆机制及多模态交互的核心逻辑框架。",
      "建立标准化提示词体系及复杂入参、出参逻辑，提升跨场景输出的一致性。",
      "协调算法、工程与业务团队，在技术边界、Token 成本与用户体感之间做关键取舍。",
      "沉淀性能 Benchmark 与交互范式，支持政务咨询、企业内训等场景快速配置。",
    ],
    modules: [
      { title: "AI 实时通话", description: "设计音视频通话场景的多模态感知、长短期记忆与任务规划逻辑。" },
      { title: "智能打断体系", description: "通过前端 VAD 与后端流式熔断，实现端云协同下更自然的用户抢话。" },
      { title: "标准化组件", description: "将通话能力封装为可配置组件，服务政务讲解与企业内训等场景。" },
      { title: "AIGC 自动化", description: "完成播客 Agent 核心配置，支持文本到播客的一键式生产。" },
    ],
    chapterLabel: "业务场景",
    chapters: [
      { title: "政务咨询", description: "提供 7×24 小时的政策讲解、办事指南与咨询支撑。" },
      { title: "企业内训", description: "构建 AI 培训讲解员，服务新员工入职培训与业务知识普及。" },
      { title: "自动化播客", description: "将文本或文档转化为单人、双人对话播客，并支持批量标准化生产。" },
    ],
    documents: [],
  },
  {
    slug: "podcast",
    number: "02",
    tag: "AIGC / AUDIO",
    title: "灵犀 AI 自动化播客生成模块",
    company: "天津神州数据科技有限公司",
    period: "2025.03 — 至今",
    summary: "基于大语言模型的智能内容生产系统。",
    tags: ["AIGC", "AI 播客", "大语言模型", "TTS", "RTC", "内容自动化"],
    metrics: [
      { value: "95%", label: "内容生成准确率" },
      { value: "80%", label: "生产效率提升" },
      { value: "90%", label: "用户满意度" },
      { value: "二等奖", label: "内部创新项目" },
    ],
    overview: "自动化播客是“灵犀”生态中的内容生产组件。项目通过大语言模型与 AIGC 能力，将策划、脚本、语音合成与后期制作连成一条可控、可复用的生产链路。",
    responsibilities: [
      "主导端云协同架构设计，串联从内容策划到成品输出的关键流程。",
      "评估并选型适合播客生成的大语言模型，优化参数以提升内容质量。",
      "定义内容策划、脚本生成、语音合成、后期制作等功能模块。",
      "与后端团队完成 RTC 系统对接，并持续优化生成速度与资源消耗。",
    ],
    modules: [
      { title: "内容策划", description: "由主题和关键词生成播客大纲与策划方案。" },
      { title: "脚本生成", description: "生成符合播客风格的多角色对话脚本。" },
      { title: "语音合成", description: "为不同角色提供自然流畅的音色与语音输出。" },
      { title: "后期制作", description: "自动处理背景音乐、音效、音量和节奏，生成可发布成品。" },
    ],
    chapterLabel: "交付能力",
    chapters: [
      { title: "多场景适配", description: "为企业培训、客户服务、政务咨询提供可定制的内容模板。" },
      { title: "实时协作", description: "结合 RTC 能力，支持多人共同编辑与审核播客内容。" },
      { title: "企业级运行", description: "前端承担交互和本地处理，后端完成推理与内容生成。" },
    ],
    documents: [
      { label: "AI 播客项目文档", href: "https://www.fuluoyide.top/AI播客项目文档.pdf" },
    ],
  },
  {
    slug: "industry-index",
    number: "03",
    tag: "DATA / BI",
    title: "贝壳二手房行业指数系统",
    company: "贝壳找房 · 技术中台",
    period: "2022.09 — 2024.09",
    summary: "覆盖 91 城的二手房交易数据分析平台。",
    tags: ["Data / BI", "数据治理", "指标体系", "中台架构", "数据可视化"],
    metrics: [
      { value: "91 城", label: "数据覆盖范围" },
      { value: "50+", label: "核心业务指标" },
      { value: "100 万+", label: "日处理数据量" },
      { value: "4 期", label: "产品迭代周期" },
    ],
    overview: "行业指数系统面向管理层、分析师和业务团队，提供二手房市场的数据支持。作为核心产品经理，主导从数据治理、BI 看板到核心指标与多期规划的完整建设，形成数据到业务洞察的闭环。",
    responsibilities: [
      "建立数据采集、处理、校验流程与质量监控机制，保障口径一致性与时效性。",
      "构建成交价格、挂牌量、带看量、成交周期等 50+ 核心指标的定义体系。",
      "设计城市总览、区县分析、板块对比、房源画像等多层级 BI 看板。",
      "协同算法、数据与开发团队，推动关键数据需求按期落地。",
    ],
    modules: [
      { title: "城市数据总览", description: "覆盖 91 城核心指标展示，支持城市切换与横向比较。" },
      { title: "行政区 / 板块分析", description: "支持区县、街道、板块层级的数据下钻。" },
      { title: "房源画像系统", description: "通过户型、装修、楼层等标签完成多维筛选与洞察。" },
      { title: "推送与预警", description: "对关键指标进行异常预警，并支持配置化通知。" },
    ],
    chapterLabel: "项目分期",
    chapters: [
      { title: "一期 · 基础框架", description: "完成南京试点数据接入，建立基础数据模型、指标体系与核心看板。" },
      { title: "二期 · 功能扩展", description: "新增打标配置化、整盘整栋属性管理与明细数据推送匹配。" },
      { title: "三期 · 数据深化", description: "补充交易侧数据需求，完成楼盘明细线上匹配等能力。" },
      { title: "四期 · 系统优化", description: "优化分子重复计算逻辑，上线月度补充数据与公示任务修改。" },
    ],
    documents: [
      { label: "一期 · 南京试点", href: "https://www.fuluoyide.top/贝壳/一期/二手行业指数管理一期-南京.pdf" },
      { label: "二期 · 整盘整栋属性管理", href: "https://www.fuluoyide.top/贝壳/二期/二手行业指数管理二期-整盘整栋属性管理.pdf" },
      { label: "三期 · 楼盘明细数据匹配", href: "https://www.fuluoyide.top/贝壳/三期/二手行指管理（三期）-楼盘明细类数据线上匹配及公示核对功能.pdf" },
      { label: "四期 · 月度数据修改", href: "https://www.fuluoyide.top/贝壳/四期/月度补充数据系统功能-月度数据修改.pdf" },
    ],
  },
  {
    slug: "people-ops",
    number: "04",
    tag: "G-PRODUCT / SAAS",
    title: "组干部管理信息系统",
    company: "首都信息发展股份有限公司",
    period: "2019.02 — 2023.04",
    summary: "政务数字化中台架构设计，省市县三级联动。",
    tags: ["G-Product", "SaaS", "中台架构", "政务系统", "工作流"],
    metrics: [
      { value: "95%+", label: "客户满意度" },
      { value: "30%↑", label: "交付效能提升" },
      { value: "千万级", label: "项目中标金额" },
      { value: "15+", label: "核心功能模块" },
    ],
    overview: "组干部管理信息系统面向政府组织部门，覆盖机构编制、年度统计、任免审批等核心业务，服务省、市、县三级组织架构。项目由产品经理端到端推进，从调研、需求分析到交付验收形成完整闭环。",
    responsibilities: [
      "负责从系统规划、迭代到交付验收的全生命周期管理。",
      "构建“组工人事 OA”产品化底层架构，提升项目群交付效能。",
      "统筹多个省级、市级项目并推动关键业务流程标准化。",
      "支持售前方案与项目落地，服务多地纪委及公安系统项目。",
    ],
    modules: [
      { title: "机构编制管理", description: "处理机构设置、编制核定与职数管理，支持三级联动。" },
      { title: "年度统计", description: "完成干部年报、数据统计与分析报表自动化。" },
      { title: "任免审批", description: "覆盖干部任免、职级晋升、考核评价的全流程。" },
      { title: "权限与工作流", description: "通过分级授权、审计日志和配置化流程保障业务协同。" },
    ],
    chapterLabel: "产品化成果",
    chapters: [
      { title: "标准化架构", description: "将项目经验沉淀为可复用的产品中台能力。" },
      { title: "项目群管理", description: "在多地、多层级组织协作中保持交付一致性。" },
      { title: "业务闭环", description: "用流程配置和审计机制，支撑从信息维护到审批决策的全过程。" },
    ],
    documents: [
      { label: "项目介绍文档", href: "https://www.fuluoyide.top/干部管理信息系统介绍.pdf" },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((caseStudy) => caseStudy.slug === slug);
