import type { RichSegment } from "@/lib/portfolio-types";

const kindClass: Record<NonNullable<RichSegment["kind"]>, string> = {
  metric: "font-bold text-indigo-700",
  keyword: "font-bold text-emerald-800",
  tech: "font-bold text-sky-800",
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
        const k = seg.kind;
        if (!k) {
          return <span key={i}>{seg.text}</span>;
        }
        const cls =
          k === "metric" && metricClassName
            ? metricClassName
            : kindClass[k];
        return (
          <span key={i} className={cls}>
            {seg.text}
          </span>
        );
      })}
    </span>
  );
}
