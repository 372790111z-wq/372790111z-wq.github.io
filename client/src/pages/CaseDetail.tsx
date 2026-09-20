/**
 * 设计提醒：案例以连续的项目注释和编号章节呈现，让指标与工作过程替代装饰性卡片。
 */
import { useParams } from "wouter";
import PortfolioFrame from "@/components/PortfolioFrame";
import CaseStudyContent from "@/components/CaseStudyContent";
import { getCaseStudy } from "@/lib/portfolio";
import NotFound from "./NotFound";

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) return <NotFound />;

  return (
    <PortfolioFrame index={caseStudy.number} returnLabel="所有案例">
      <CaseStudyContent caseStudy={caseStudy} />
    </PortfolioFrame>
  );
}
