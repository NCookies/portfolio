import type { RichSegment } from "@/lib/portfolio-types";

/** 본문 인라인 강조 — 종류와 관계없이 동일 톤(인디고) */
const highlightClass = "font-bold text-indigo-800 print:text-indigo-900";

const linkClass =
  "pdf-append-href-in-print break-all font-medium text-indigo-800 underline decoration-indigo-300 decoration-1 underline-offset-[3px] hover:text-indigo-950 print:text-indigo-900 print:decoration-indigo-400";

const kindClass: Record<NonNullable<RichSegment["kind"]>, string> = {
  metric: highlightClass,
  keyword: highlightClass,
  tech: highlightClass,
};

type RichTextProps = {
  segments: RichSegment[];
  className?: string;
  /** `metric` 구간만 다른 색(예: 결과 행에서 수치 강조) */
  metricClassName?: string;
};

/**
 * 본문(`className`)은 바깥에서 주고, 강조 구간만 색·볼드 적용.
 * 인쇄 시에도 동일 클래스가 적용되도록 Tailwind 사용.
 */
export function RichText({
  segments,
  className,
  metricClassName,
}: RichTextProps) {
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        const href = seg.href?.trim();
        const k = seg.kind;
        const cls =
          k && (k === "metric" && metricClassName ? metricClassName : kindClass[k]);

        const inner =
          !k ? (
            seg.text
          ) : (
            <span className={cls}>{seg.text}</span>
          );

        if (href) {
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {inner}
            </a>
          );
        }

        if (!k) {
          return <span key={i}>{seg.text}</span>;
        }
        return (
          <span key={i} className={cls}>
            {seg.text}
          </span>
        );
      })}
    </span>
  );
}
