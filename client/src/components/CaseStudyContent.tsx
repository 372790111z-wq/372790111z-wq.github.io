/**
 * 设计提醒：案例内容以纵向编号、细线分段和成果指标呈现；同一组件可用于独立页面和同页叠层放大视图。
 */
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Link } from "wouter";
import type { CaseStudy } from "@/lib/portfolio";
import { caseStudies } from "@/lib/portfolio";

type CaseStudyContentProps = {
  caseStudy: CaseStudy;
  onSelectCase?: (slug: string) => void;
};

export default function CaseStudyContent({ caseStudy, onSelectCase }: CaseStudyContentProps) {
  const activeIndex = caseStudies.findIndex((item) => item.slug === caseStudy.slug);
  const previous = caseStudies[(activeIndex - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(activeIndex + 1) % caseStudies.length];

  const pager = (target: CaseStudy, direction: "previous" | "next") => {
    const content = <><small>{direction === "previous" ? "PREVIOUS" : "NEXT"}</small>{target.title}</>;
    if (onSelectCase) {
      return (
        <button type="button" onClick={() => onSelectCase(target.slug)}>
          {direction === "previous" && <ArrowLeft size={18} />}
          <span>{content}</span>
          {direction === "next" && <ArrowRight size={18} />}
        </button>
      );
    }
    return (
      <Link href={`/work/${target.slug}`}>
        {direction === "previous" && <ArrowLeft size={18} />}
        <span>{content}</span>
        {direction === "next" && <ArrowRight size={18} />}
      </Link>
    );
  };

  return (
    <article className="case-page">
      <header className="case-hero">
        <p className="case-meta"><span>{caseStudy.tag}</span><span>{caseStudy.company}</span><span>{caseStudy.period}</span></p>
        <div className="case-title-row">
          <p className="case-number">{caseStudy.number}</p>
          <h1>{caseStudy.title}</h1>
        </div>
        <p className="case-deck">{caseStudy.summary}</p>
        <div className="tag-cloud">
          {caseStudy.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <section className="case-section intro-section">
        <div className="section-index"><span>01</span><i /></div>
        <div className="case-section-content"><p className="section-label">项目概述</p><p className="overview-copy">{caseStudy.overview}</p></div>
      </section>

      <section className="metrics-strip" aria-label="核心成果">
        {caseStudy.metrics.map((metric, index) => <div key={metric.label} className="metric-block"><span>0{index + 1}</span><strong>{metric.value}</strong><p>{metric.label}</p></div>)}
      </section>

      <section className="case-section responsibility-section">
        <div className="section-index"><span>02</span><i /></div>
        <div className="case-section-content"><p className="section-label">核心职责</p><ol className="responsibility-list">{caseStudy.responsibilities.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></div>
      </section>

      <section className="case-section module-section">
        <div className="section-index"><span>03</span><i /></div>
        <div className="case-section-content"><p className="section-label">系统模块</p><div className="detail-grid">{caseStudy.modules.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.description}</p></article>)}</div></div>
      </section>

      <section className="case-section chapter-section">
        <div className="section-index"><span>04</span><i /></div>
        <div className="case-section-content"><p className="section-label">{caseStudy.chapterLabel}</p><div className="chapter-list">{caseStudy.chapters.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</div></div>
      </section>

      {caseStudy.documents.length > 0 && (
        <section className="case-section document-section">
          <div className="section-index"><span>05</span><i /></div>
          <div className="case-section-content"><p className="section-label">项目文档</p><div className="document-list">{caseStudy.documents.map((document, index) => <a key={document.href} href={document.href} target="_blank" rel="noreferrer"><span>0{index + 1}</span><FileText size={18} strokeWidth={1.4} /><strong>{document.label}</strong><ArrowUpRight size={18} strokeWidth={1.4} /></a>)}</div></div>
        </section>
      )}

      <nav className="case-pager" aria-label="相邻案例">{pager(previous, "previous")}{pager(next, "next")}</nav>
    </article>
  );
}
