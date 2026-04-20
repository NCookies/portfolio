/** 한 줄·문단을 여러 덩어리로 나눠 강조할 때 사용 */
export type RichKind = "metric" | "keyword" | "tech";

export type RichSegment = {
  text: string;
  /** 없으면 본문 톤 그대로 */
  kind?: RichKind;
};

export function joinPlain(segments: RichSegment[]): string {
  return segments.map((s) => s.text).join("");
}
