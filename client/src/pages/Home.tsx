/**
 * 设计提醒：以暖白网格、超高留白、左侧锚定大字与细密等宽标注，复刻“编辑设计式个人实验室”的节奏。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Github, Mail, MoveRight } from "lucide-react";
import CaseOverlay from "@/components/CaseOverlay";

const heroArt = "/manus-storage/zzq-hero-illustration_402fa124.png";
const rtcArt = "/manus-storage/zzq-project-rtc_531fb7ee.png";
const agentArt = "/manus-storage/zzq-project-agent_95688352.png";

type TabKey = "products" | "skills" | "portfolio" | "writing" | "about" | "contact";

const tabs: { key: TabKey; label: string }[] = [
  { key: "products", label: "案例" },
  { key: "skills", label: "Skills" },
  { key: "portfolio", label: "作品集" },
  { key: "writing", label: "写作" },
  { key: "about", label: "关于我" },
  { key: "contact", label: "交流" },
];

const cases = [
  {
    no: "01",
    tag: "RTC / AI",
    title: "灵犀 AI 实时通话",
    detail: "< 800ms 延迟 · 端云协同的智能打断机制设计",
    art: rtcArt,
    slug: "lingxi",
  },
  {
    no: "02",
    tag: "AIGC / AUDIO",
    title: "AI 自动化播客",
    detail: "从文本到播客 · 一条可被复用的内容生成链路",
    art: agentArt,
    slug: "podcast",
  },
  {
    no: "03",
    tag: "DATA / BI",
    title: "行业指数系统",
    detail: "91 城覆盖 · 把交易数据变成可行动的产品洞察",
    art: rtcArt,
    slug: "industry-index",
  },
  {
    no: "04",
    tag: "G-PRODUCT / SAAS",
    title: "组工人事系统",
    detail: "95%+ 满意度 · 政务数字化中台架构设计",
    art: agentArt,
    slug: "people-ops",
  },
];

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-marker" aria-hidden="true">
      <span>{number}</span>
      <i />
      <em>{label}</em>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("products");
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [isClosingCase, setIsClosingCase] = useState(false);
  const skipNextPop = useRef(false);
  const activeLabel = useMemo(
    () => tabs.find((tab) => tab.key === activeTab)?.label ?? "案例",
    [activeTab],
  );

  const openCase = useCallback((slug: string) => {
    window.history.pushState({ caseOverlay: slug }, "", `#case-${slug}`);
    setIsClosingCase(false);
    setActiveCase(slug);
  }, []);

  const closeCase = useCallback(() => {
    if (!activeCase || isClosingCase) return;
    setIsClosingCase(true);
    window.setTimeout(() => {
      setActiveCase(null);
      setIsClosingCase(false);
      if (window.history.state?.caseOverlay) {
        skipNextPop.current = true;
        window.history.back();
      } else if (window.location.hash.startsWith("#case-")) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    }, 290);
  }, [activeCase, isClosingCase]);

  const selectOverlayCase = useCallback((slug: string) => {
    window.history.replaceState({ caseOverlay: slug }, "", `#case-${slug}`);
    setActiveCase(slug);
  }, []);

  useEffect(() => {
    const matchedCase = window.location.hash.match(/^#case-([a-z-]+)$/);
    if (matchedCase) setActiveCase(matchedCase[1]);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (skipNextPop.current) {
        skipNextPop.current = false;
        return;
      }
      if (activeCase) {
        setIsClosingCase(true);
        window.setTimeout(() => {
          setActiveCase(null);
          setIsClosingCase(false);
        }, 240);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [activeCase]);

  useEffect(() => {
    document.body.style.overflow = activeCase ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCase]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="identity" href="#top" aria-label="回到页首">
          <span className="brand-dot" />
          <span>ZZQ</span>
          <sup>®</sup>
        </a>
        <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer">
          <Github size={12} strokeWidth={1.8} />
          <span>github.com/zzq</span>
        </a>
      </header>

      <section id="top" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-index" aria-hidden="true">
          <span>00</span>
          <i />
        </div>
        <div className="hero-composition">
          <h1 id="hero-title" className="hero-title">
            <span>ZZQ<sup>®</sup></span>
            <span>builds</span>
            <span>with AI.</span>
          </h1>
          <img className="hero-illustration" src={heroArt} alt="人物与一只柯基的线稿插画" />
          <p className="hero-kicker">
            <strong>张 梓 琪</strong>
            <span>AI PRODUCT MANAGER / SYSTEMS THINKER</span>
          </p>
        </div>
        <a className="scroll-cue" href="#work">
          <ArrowDown size={16} strokeWidth={1.4} />
          <span>往下滑</span>
        </a>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-heading">
        <div className="ghost-number" aria-hidden="true">01</div>
        <SectionMarker number="01" label="SELECTED WORK" />
        <div className="work-layout">
          <div className="work-heading-wrap">
            <p className="eyebrow">SELECTED / {activeLabel.toUpperCase()}</p>
            <h2 id="work-heading">复杂的技术，<br />做成清晰的体验。</h2>
          </div>
          <div className="tab-list" role="tablist" aria-label="个人内容栏目">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                type="button"
                aria-controls={`panel-${tab.key}`}
                tabIndex={activeTab === tab.key ? 0 : -1}
                onKeyDown={(event) => {
                  const index = tabs.findIndex((item) => item.key === tab.key);
                  const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
                    : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length
                    : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  setActiveTab(tabs[next].key);
                  document.getElementById(`tab-${tabs[next].key}`)?.focus({ preventScroll: true });
                  document.getElementById(`tab-${tabs[next].key}`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
                }}
                className={activeTab === tab.key ? "is-active" : ""}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={activeTab === tab.key}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "products" && (
          <div className="case-list" id="panel-products" role="tabpanel" aria-labelledby="tab-products">
            {cases.map((item, index) => (
              <button className="case-row" key={item.no} type="button" onClick={() => openCase(item.slug)}>
                <span className="case-no">{item.no}</span>
                <div className="case-copy">
                  <p>{item.tag}</p>
                  <h3>{item.title}</h3>
                  <span>{item.detail}</span>
                </div>
                <img src={item.art} alt="" className={`case-art art-${index}`} />
                <span className="case-arrow"><ArrowUpRight size={20} strokeWidth={1.5} /></span>
              </button>
            ))}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="case-list" id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio">
            <a className="case-row portfolio-row" data-annotation-id="portfolio-zijian-link"
              href="https://zijian.fuluoyide.top/" target="_blank" rel="noopener noreferrer"
              aria-label="打开纸间 · 视觉创作工具库（新标签页）">
              <span className="case-no">01</span>
              <div className="case-copy">
                <p>PERSONAL PROJECT / WEBSITE</p>
                <h3>纸间<span className="title-separator"> · </span><span className="title-detail">视觉创作工具库</span></h3>
                <span>我搭建的视觉 Skill 样张库。<br />按风格浏览作者示例，找到合适的创作工具。</span>
                <span className="visit">打开纸间 ↗</span>
              </div>
              <div className="paper-mark" aria-hidden="true"><small>ZIJIAN / VOL. 01</small><strong>纸间</strong><span>视觉创作 · 风格收藏</span></div>
              <span className="case-arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} /></span>
            </a>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="detail-panel skills-panel" id="panel-skills" role="tabpanel" aria-labelledby="tab-skills">
            <p className="panel-no">01—04</p>
            <div>
              <h3>把“能做”组织成<br />“值得用”的系统。</h3>
              <ul>
                <li><span>01</span> AIGC 产品架构与工作流设计</li>
                <li><span>02</span> 实时对话与多模态交互体验</li>
                <li><span>03</span> Agent、RAG 与数据产品策略</li>
                <li><span>04</span> 从指标到商业化的闭环推进</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "writing" && (
          <div className="detail-panel writing-panel" id="panel-writing" role="tabpanel" aria-labelledby="tab-writing">
            <p className="panel-no">FIELD NOTES</p>
            <div className="writing-links">
              <a href="https://www.xiaohongshu.com/user/profile/5936839d5e87e754cdabc496" target="_blank" rel="noreferrer"><span>01</span> 小红书：AI 产品经理的日常思考 <MoveRight size={18} /></a>
              <a href="https://www.woshipm.com/u/1142895" target="_blank" rel="noreferrer"><span>02</span> 人人都是产品经理：技术选型实践 <MoveRight size={18} /></a>
              <a href="https://www.zhihu.com/people/li-jia-tu-47-46" target="_blank" rel="noreferrer"><span>03</span> 知乎：关于 AI 产品落地的思考 <MoveRight size={18} /></a>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="detail-panel about-panel" id="panel-about" role="tabpanel" aria-labelledby="tab-about">
            <p className="panel-no">ABOUT / ZZQ</p>
            <div>
              <h3>张梓琪<br />AI 产品与个人实践。</h3>
              <p>从产品经历到个人项目，了解我正在做的事情。</p>
              <a className="about-visit" data-annotation-id="about-personal-site-link"
                href="https://portfolio.fuluoyide.top/" target="_blank" rel="noopener noreferrer">查看完整个人网站 ↗</a>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="detail-panel contact-panel" id="panel-contact" role="tabpanel" aria-labelledby="tab-contact">
            <p className="panel-no">LET’S TALK</p>
            <div>
              <h3>一起把想法<br />做成下一步。</h3>
              <a href="mailto:372790111@qq.com"><Mail size={18} />372790111@qq.com <ArrowUpRight size={18} /></a>
              <a href="tel:13241294350">132 4129 4350 <ArrowUpRight size={18} /></a>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        <span>© 2026 张梓琪</span>
        <span>BUILT WITH FOCUS ON AI PRODUCT EXPERIENCE</span>
        <a href="#top"><ArrowUp size={15} /> BACK TO TOP</a>
      </footer>
      {activeCase && <CaseOverlay slug={activeCase} closing={isClosingCase} onClose={closeCase} onSelectCase={selectOverlayCase} />}
    </main>
  );
}
