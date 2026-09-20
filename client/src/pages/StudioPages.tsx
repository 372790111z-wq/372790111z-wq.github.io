/**
 * 设计提醒：内容页面通过巨型章节编号、稀疏列表和细线分割保持与首页一致的编辑式叙事节奏。
 */
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import PortfolioFrame from "@/components/PortfolioFrame";

type PageHeaderProps = { index: string; kicker: string; title: ReactNode; deck: string };

function PageHeader({ index, kicker, title, deck }: PageHeaderProps) {
  return (
    <header className="studio-header">
      <p className="studio-ghost" aria-hidden="true">{index}</p>
      <p className="studio-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="studio-deck">{deck}</p>
    </header>
  );
}

const modelTimeline = [
  ["2023", "4K–32K tokens", "GPT-3.5, Claude 2, Llama 2"],
  ["2024 初", "32K–128K tokens", "GPT-4, Claude 3, Gemini 1.5"],
  ["2024 中", "128K–200K tokens", "Claude 3.5, GPT-4o, Qwen2"],
  ["2024 末", "200K–1M tokens", "Gemini 2.0, Claude 3.7, GLM-4"],
  ["2025", "1M–∞ tokens", "Gemini 2.5, GPT-4.5, DeepSeek-V3"],
];

export function ModelsPage() {
  return (
    <PortfolioFrame index="02">
      <section className="studio-page">
        <PageHeader index="02" kicker="LLM INTELLIGENCE INDEX" title={<>模型不是答案，<br />选择才是。</>} deck="记录主流大模型的能力演进，并将选型问题还原到真实产品约束中。" />
        <section className="models-brief">
          <p>选型维度</p>
          <div><span>上下文</span><span>推理</span><span>多模态</span><span>成本</span><span>部署</span></div>
        </section>
        <section className="timeline-section">
          <div className="section-index"><span>01</span><i /></div>
          <div className="case-section-content">
            <p className="section-label">上下文窗口演变历程</p>
            <div className="model-timeline">
              {modelTimeline.map(([year, range, names], index) => <article key={year}><span>0{index + 1}</span><strong>{year}</strong><h2>{range}</h2><p>{names}</p></article>)}
            </div>
          </div>
        </section>
        <p className="data-note">数据来源：OpenCompass 司南与 SuperCLUE 中文大模型测评基准。此页仅用于产品选型观察，不构成实时测评结论。</p>
      </section>
    </PortfolioFrame>
  );
}

export function AboutPage() {
  const sections = [
    ["产品方法论", "用户需求洞察 · 技术可行性评估 · 数据驱动迭代"],
    ["技术理解", "AIGC · RTC · Agent · RAG · 多模态交互"],
    ["核心能力", "产品架构 · 指标体系 · 团队协作 · 商业化落地"],
  ];
  return (
    <PortfolioFrame index="03">
      <section className="studio-page">
        <PageHeader index="03" kicker="ABOUT / ZZQ" title={<>把复杂能力，<br />交给清晰体验。</>} deck="10 年产品经验，专注于将 AIGC、RTC 与 Agent 的技术可能性转化为真实用户价值。" />
        <section className="about-statement"><span>10+</span><p>从 0 到 1 的产品工作，不止是构建功能，更是在技术可行性、用户理解与商业目标之间找到可持续的平衡。</p></section>
        <section className="about-list">
          {sections.map(([title, content], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{content}</p></article>)}
        </section>
      </section>
    </PortfolioFrame>
  );
}

export function WritingPage() {
  const entries = [
    ["小红书", "AI 产品经理的日常思考", "产品思考 · 2024", "https://www.xiaohongshu.com/user/profile/5936839d5e87e754cdabc496"],
    ["人人都是产品经理", "AI 产品的技术选型实践", "方法论 · 2024", "https://www.woshipm.com/u/1142895"],
    ["知乎", "关于 AI 产品落地的思考", "深度回答 · 2024", "https://www.zhihu.com/people/li-jia-tu-47-46"],
    ["简书", "产品与职场随笔", "随笔 · 2024", "https://www.jianshu.com/u/cac8fe6b5adc"],
  ];
  return (
    <PortfolioFrame index="04">
      <section className="studio-page">
        <PageHeader index="04" kicker="FIELD NOTES" title={<>写下正在形成的<br />产品判断。</>} deck="关于模型选型、产品落地与工作实践的公开记录。" />
        <section className="writing-index">
          {entries.map(([source, title, meta, href], index) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"><span>0{index + 1}</span><p>{source}</p><div><h2>{title}</h2><small>{meta}</small></div><ArrowUpRight size={20} strokeWidth={1.4} /></a>
          ))}
        </section>
      </section>
    </PortfolioFrame>
  );
}

export function ContactPage() {
  return (
    <PortfolioFrame index="05">
      <section className="studio-page contact-page">
        <PageHeader index="05" kicker="CONTACT / ELSEWHERE" title={<>把下一个问题，<br />一起做成答案。</>} deck="欢迎交流 AI 产品架构、实时交互、智能内容生产与复杂系统的产品化路径。" />
        <div className="contact-links">
          <a href="mailto:372790111@qq.com"><span>01</span><Mail size={20} strokeWidth={1.4} /><p><small>EMAIL</small>372790111@qq.com</p><ArrowUpRight size={20} strokeWidth={1.4} /></a>
          <a href="tel:13241294350"><span>02</span><Phone size={20} strokeWidth={1.4} /><p><small>PHONE</small>132 4129 4350</p><ArrowUpRight size={20} strokeWidth={1.4} /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><span>03</span><ArrowUpRight size={20} strokeWidth={1.4} /><p><small>GITHUB</small>github.com/zzq</p><ArrowUpRight size={20} strokeWidth={1.4} /></a>
        </div>
      </section>
    </PortfolioFrame>
  );
}
