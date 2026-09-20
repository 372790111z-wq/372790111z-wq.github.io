/**
 * 设计提醒：用极简的边缘导航、章节编号与暖白网格维持“编辑设计式个人实验室”的全站连续性。
 */
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUp, Github } from "lucide-react";
import { Link } from "wouter";

const links = [
  ["案例", "/#work"],
  ["模型", "/models"],
  ["关于", "/about"],
  ["写作", "/writing"],
  ["联系", "/contact"],
];

type PortfolioFrameProps = {
  index: string;
  children: ReactNode;
  returnLabel?: string;
};

export default function PortfolioFrame({ index, children, returnLabel = "返回首页" }: PortfolioFrameProps) {
  return (
    <main className="page-shell">
      <header className="page-topbar">
        <Link className="page-return" href="/">
          <ArrowLeft size={14} strokeWidth={1.5} />
          <span>{returnLabel}</span>
        </Link>
        <a className="page-github" href="https://github.com" target="_blank" rel="noreferrer">
          <Github size={12} strokeWidth={1.5} />
          <span>github.com/zzq</span>
        </a>
      </header>
      <div className="page-edge-index" aria-hidden="true"><span>{index}</span><i /></div>
      {children}
      <footer className="page-footer">
        <nav aria-label="站点栏目">
          {links.map(([label, href], itemIndex) => (
            <Link key={href} href={href}><span>0{itemIndex + 1}</span>{label}</Link>
          ))}
        </nav>
        <Link href="/"><ArrowUp size={14} /> 返回首屏</Link>
      </footer>
    </main>
  );
}
