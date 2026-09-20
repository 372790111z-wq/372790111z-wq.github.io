/**
 * 设计提醒：案例在首页上方以纸张般的放大叠层展开；进入与返回均用低幅缩放和淡化，避免页面刷新感。
 */
import { useEffect, useRef } from "react";
import { ArrowLeft, X } from "lucide-react";
import CaseStudyContent from "@/components/CaseStudyContent";
import { getCaseStudy } from "@/lib/portfolio";

type CaseOverlayProps = {
  slug: string;
  closing: boolean;
  onClose: () => void;
  onSelectCase: (slug: string) => void;
};

export default function CaseOverlay({ slug, closing, onClose, onSelectCase }: CaseOverlayProps) {
  const panelRef = useRef<HTMLElement>(null);
  const caseStudy = getCaseStudy(slug);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!caseStudy) return null;

  return (
    <div className={`case-overlay ${closing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`${caseStudy.title}案例详情`}>
      <button className="case-overlay-backdrop" type="button" aria-label="关闭案例详情" onClick={onClose} />
      <section className="case-overlay-panel" ref={panelRef}>
        <header className="case-overlay-toolbar">
          <button type="button" onClick={onClose}><ArrowLeft size={16} strokeWidth={1.5} /><span>返回案例</span></button>
          <button type="button" aria-label="关闭案例详情" onClick={onClose}><span>关闭</span><X size={17} strokeWidth={1.5} /></button>
        </header>
        <div className="case-overlay-index" aria-hidden="true"><span>{caseStudy.number}</span><i /></div>
        <CaseStudyContent caseStudy={caseStudy} onSelectCase={onSelectCase} />
      </section>
    </div>
  );
}
