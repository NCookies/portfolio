/** 한 줄·문단을 여러 덩어리로 나눠 강조할 때 사용 */
export type RichKind = "metric" | "keyword" | "tech";

export type RichSegment = {
  text: string;
  /** 없으면 본문 톤 그대로 */
  kind?: RichKind;
  /**
   * 있으면 인라인 링크(`<a>`)로 렌더 — 브라우저 PDF 저장 시에도 클릭 가능한 주소로 들어감.
   * `http(s)://` 등 브라우저가 이해하는 절대 URL 권장.
   */
  href?: string;
};

export function joinPlain(segments: RichSegment[]): string {
  return segments
    .map((s) => s.text + (s.href?.trim() ? ` ${s.href.trim()}` : ""))
    .join("");
}
