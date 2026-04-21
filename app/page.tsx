import Image from "next/image";
import { Fragment } from "react";
import { RichText } from "@/components/RichText";
import { ZoomableImage } from "@/components/ZoomableImage";
import { meta, projects, summaryParagraphs, techStack } from "@/lib/portfolio";

/** 본문·설명문 공통: 한글 장문 가독성 */
const bodyText =
  "text-[0.9375rem] leading-[1.8] text-slate-600 sm:text-base sm:leading-[1.78] print:text-slate-800";

/** About만 길게 읽히는 문단 — 한 단계 크게·줄간격 여유 */
const aboutText =
  "text-base leading-[1.85] text-slate-600 sm:leading-[1.82] print:text-slate-800";

/** 이력서형 섹션 제목 — 참고 레이아웃처럼 강조색 */
const sectionTitle =
  "mb-5 border-b border-red-200/90 pb-3 text-xl font-bold tracking-tight text-red-700 print:mb-4 print:border-red-200";

const activeLinks = meta.links.filter((l) => l.href?.trim());
const showContactBlock =
  Boolean(meta.email?.trim()) ||
  Boolean(meta.phone?.trim()) ||
  activeLinks.length > 0;

/** 트러블슈팅 4단계 pill (한글 2자 기준 너비 통일) */
const troubleshootPill = {
  problem:
    "bg-rose-900/95 text-rose-50 ring-1 ring-rose-800/60 print:bg-rose-900 print:text-rose-50",
  approach:
    "bg-amber-800/95 text-amber-50 ring-1 ring-amber-700/50 print:bg-amber-900 print:text-amber-50",
  solution:
    "bg-emerald-800/95 text-emerald-50 ring-1 ring-emerald-700/50 print:bg-emerald-900 print:text-emerald-50",
  result:
    "bg-indigo-900/95 text-indigo-100 ring-1 ring-indigo-800/50 print:bg-indigo-950 print:text-indigo-100",
} as const;

/** keywordParagraphs 태그 pill — 본문 인라인 강조와 맞춘 인디고 톤 */
const keywordPill =
  "bg-indigo-900/95 text-indigo-100 ring-1 ring-indigo-800/50 print:bg-indigo-950 print:text-indigo-100";

/** 태그는 본문 블록 상단(첫 줄)과 맞춤 — 영역 구분이 분명해짐 */
const troubleshootingGrid =
  "grid grid-cols-1 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-x-4 sm:gap-y-3.5";

const keywordGrid =
  "grid grid-cols-1 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-x-4 sm:gap-y-3.5";

/**
 * 본문 첫 줄 앞의 line-box 여백(반줄 간격)과 맞추기.
 * padding-top은 pill 배경이 셀 맨 위부터 그려져 효과가 안 보임 → margin-top으로 블록 전체를 내림.
 */
const pillAlignTop = "sm:mt-[7px] print:mt-[6px]";

const pillTagTrouble = `inline-flex w-fit max-w-full shrink-0 select-none items-center justify-center justify-self-start rounded-full px-2.5 py-1.5 text-center text-xs font-bold leading-tight tracking-tight sm:px-2 sm:py-1.5 sm:text-[13px] ${pillAlignTop}`;

const pillTagKeyword = `inline-flex w-fit max-w-full shrink-0 select-none items-center justify-center justify-self-start rounded-full px-3 py-1.5 text-center text-xs font-bold leading-snug sm:max-w-[11rem] sm:text-[13px] ${pillAlignTop}`;

/** 본문 상단 패딩 제거 — 줄간격(line-height)만 쓰고 태그 첫 줄과 높이 맞춤 */
const bodyTroubleP = `${bodyText} m-0 min-w-0 p-0 pt-0 whitespace-pre-line self-start`;

const bodyKeywordP = `${bodyText} m-0 min-w-0 p-0 pt-0 whitespace-pre-line self-start`;

export default function Home() {
  return (
    <div className="min-h-full bg-[#f1f5f9] text-slate-900 print:bg-white">
      <p className="no-print mx-auto max-w-2xl px-4 pt-5 text-center text-xs leading-relaxed text-slate-500">
        PDF 저장:{" "}
        <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans text-slate-700 shadow-sm">
          Ctrl
        </kbd>{" "}
        +{" "}
        <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-sans text-slate-700 shadow-sm">
          P
        </kbd>{" "}
        → 대상에서 &quot;PDF로 저장&quot; · 여백: 기본
      </p>

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-6 sm:px-6 print:pt-5">
        <header className="profile-header mb-12 print:mb-10">
          {/* 왼쪽: 사진만 · 오른쪽: 이름 ↓ 이메일 ↓ 링크 (화면·PDF 동일 구조) */}
          <div className="profile-header-photo relative mx-auto aspect-[3/4] w-full max-w-[152px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 md:mx-0 md:w-[152px] md:max-w-[152px] print:mx-0">
            {meta.photoSrc?.trim() ? (
              <Image
                src={meta.photoSrc.trim()}
                alt={
                  meta.name?.trim()
                    ? `${meta.name.trim()} 프로필`
                    : "프로필 사진"
                }
                width={228}
                height={304}
                className="h-full w-full object-contain object-top"
                sizes="(max-width: 768px) 45vw, 152px"
                priority
                quality={92}
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400"
                aria-hidden
              >
                <svg
                  className="h-14 w-14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
                  <path d="M20 21v-1a7 7 0 0 0-14 0v1" />
                </svg>
                <span className="text-xs">프로필 사진</span>
              </div>
            )}
          </div>

          <div className="min-w-0 space-y-4 text-left text-slate-800">
            <div>
              <h1 className="text-[1.5rem] font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                {meta.name?.trim() ? meta.name : meta.title}
              </h1>
              <p className="mt-1.5 text-sm font-semibold text-slate-800">
                {meta.role}
              </p>
              {meta.activityPeriod?.trim() ? (
                <p className="mt-1 text-xs text-slate-500">
                  {meta.activityPeriod.trim()}
                </p>
              ) : null}
            </div>

            {showContactBlock ? (
              <div className="space-y-3 border-t border-slate-200 pt-4 text-sm print:border-slate-300">
                {meta.email?.trim() ? (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500">
                      Email
                    </p>
                    <a
                      href={`mailto:${meta.email.trim()}`}
                      className="mt-0.5 block break-all text-slate-900 underline decoration-slate-300 underline-offset-2"
                    >
                      {meta.email.trim()}
                    </a>
                  </div>
                ) : null}
                {meta.phone?.trim() ? (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500">
                      Phone
                    </p>
                    <a
                      href={`tel:${meta.phone.trim().replace(/\s/g, "")}`}
                      className="mt-0.5 block underline decoration-slate-300 underline-offset-2"
                    >
                      {meta.phone.trim()}
                    </a>
                  </div>
                ) : null}
                {activeLinks.map((link) => {
                  const url = link.href.trim();
                  return (
                    <div key={url}>
                      <p className="text-[11px] font-medium text-slate-500">
                        {link.label}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block break-all font-mono text-[0.8125rem] leading-relaxed text-slate-800 underline decoration-slate-300 underline-offset-[3px]"
                      >
                        {url}
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </header>

        <section className="avoid-break mb-14 w-full print:mb-12">
          <h2 className={sectionTitle}>About</h2>
          {meta.tagline?.trim() ? (
            <p className="mb-4 text-sm font-medium leading-relaxed text-slate-800">
              {meta.tagline.trim()}
            </p>
          ) : null}
          <ul
            className={`m-0 list-none space-y-4 p-0 ${aboutText} text-pretty max-w-none`}
          >
            {summaryParagraphs.map((para, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="shrink-0 font-medium text-slate-400 print:text-slate-500"
                  aria-hidden
                >
                  *
                </span>
                <div className="min-w-0 flex-1">
                  <RichText segments={para} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14 print:mb-12">
          <h2 className={sectionTitle}>기술 스택 및 역량</h2>
          <div className="space-y-10 print:space-y-8">
            {techStack.map((group) => (
              <div key={group.category} className="avoid-break">
                <h3 className="mb-3.5 text-[1.05rem] font-semibold text-slate-900">
                  {group.category}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({group.categoryEn})
                  </span>
                </h3>
                <ul className="space-y-3.5 border-l-[3px] border-indigo-200/90 pl-5">
                  {group.items.map((item, itemIdx) => (
                    <li
                      key={`${group.category}-${itemIdx}`}
                      className={`${bodyText} pl-0.5`}
                    >
                      <RichText segments={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="print-break">
          <h2 className={`${sectionTitle} mb-8 print:mb-6`}>프로젝트</h2>
          <div className="space-y-14 print:space-y-10">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={
                  index > 0
                    ? "print-break avoid-break rounded-2xl print:rounded-none"
                    : "avoid-break rounded-2xl print:rounded-none"
                }
              >
                <div className="shadow-card rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:p-8 print:border print:p-6 print:shadow-none">
                  <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[1.35rem] font-bold leading-tight text-slate-900">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {project.subtitle}
                      </p>
                    </div>
                    <time className="shrink-0 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 print:bg-transparent print:px-0 print:py-0 print:text-sm">
                      {project.period}
                    </time>
                  </div>

                  <dl className="mb-7 space-y-5 print:mb-6">
                    <div>
                      <dt className="mb-1.5 text-xs font-bold tracking-wide text-slate-500">
                        개요
                      </dt>
                      <dd className={bodyText}>
                        <RichText segments={project.overview} />
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1.5 text-xs font-bold tracking-wide text-slate-500">
                        주요 역할
                      </dt>
                      <dd className={bodyText}>
                        <RichText segments={project.role} />
                      </dd>
                    </div>
                  </dl>

                  <h4 className="mb-4 text-xs font-bold tracking-wide text-slate-500">
                    핵심 성과
                  </h4>
                  <div className="mb-8 space-y-4 print:mb-7">
                    {project.highlights.map((h, hi) => (
                      <div
                        key={`${project.id}-highlight-${hi}`}
                        className="avoid-break rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5 print:border-slate-200 print:bg-white"
                      >
                        <div className="mb-2 text-sm leading-snug text-slate-900">
                          <RichText segments={h.title} />
                        </div>
                        {h.troubleshooting ? (
                          <div className={troubleshootingGrid}>
                            {(
                              [
                                {
                                  tag: "문제",
                                  pill: troubleshootPill.problem,
                                  segments: h.troubleshooting.problem,
                                },
                                {
                                  tag: "접근",
                                  pill: troubleshootPill.approach,
                                  segments: h.troubleshooting.thinking,
                                },
                                {
                                  tag: "해결",
                                  pill: troubleshootPill.solution,
                                  segments: h.troubleshooting.solution,
                                },
                                {
                                  tag: "결과",
                                  pill: troubleshootPill.result,
                                  segments: h.troubleshooting.result,
                                },
                              ] satisfies {
                                tag: string;
                                pill: string;
                                segments: (typeof h.troubleshooting)["problem"];
                              }[]
                            ).map((row) => (
                              <Fragment key={row.tag}>
                                <span
                                  className={`${pillTagTrouble} ${row.pill}`}
                                >
                                  {row.tag}
                                </span>
                                <p className={`${bodyTroubleP} print:text-slate-800`}>
                                  <RichText segments={row.segments} />
                                </p>
                              </Fragment>
                            ))}
                          </div>
                        ) : h.keywordParagraphs ? (
                          <div className={keywordGrid}>
                            {h.keywordParagraphs.map((kp, ki) => (
                              <Fragment key={kp.keyword}>
                                <span
                                  className={`${pillTagKeyword} ${keywordPill}`}
                                >
                                  {kp.keyword}
                                </span>
                                <p className={bodyKeywordP}>
                                  <RichText segments={kp.segments} />
                                </p>
                              </Fragment>
                            ))}
                          </div>
                        ) : (
                          <p className={bodyText}>
                            <RichText segments={h.body ?? []} />
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {project.architecture ? (
                    <section
                      className="avoid-break mb-8 print:mb-7"
                      aria-labelledby={`arch-heading-${project.id}`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] print:border print:shadow-none">
                        <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5 print:bg-white">
                          <h4
                            id={`arch-heading-${project.id}`}
                            className="text-xs font-bold tracking-wide text-slate-500"
                          >
                            {project.architecture.heading}
                          </h4>
                        </div>
                        <div className="bg-white px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3">
                          <div className="overflow-hidden rounded-lg bg-slate-50/90">
                            <ZoomableImage
                              src={project.architecture.imageSrc}
                              alt={project.architecture.imageAlt}
                              width={1600}
                              height={900}
                              className="h-auto w-full object-contain"
                              sizes="(max-width: 768px) 100vw, 1280px"
                            />
                          </div>
                        </div>
                        <div className="divide-y divide-slate-100 px-4 pb-5 pt-1 sm:px-6 sm:pb-6">
                          {project.architecture.blocks.map((block) => (
                            <div
                              key={block.title}
                              className="avoid-break py-4 first:pt-0 last:pb-0"
                            >
                              <p className="mb-2.5 text-sm font-semibold text-slate-900">
                                {block.title}
                              </p>
                              <ul className="list-disc space-y-2 pl-4 marker:text-indigo-400 sm:pl-5">
                                {block.bullets.map((line, lineIdx) => (
                                  <li
                                    key={lineIdx}
                                    className={`${bodyText} pl-0.5`}
                                  >
                                    <RichText segments={line} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {project.imageSrc ? (
                    <ZoomableImage
                      src={project.imageSrc}
                      alt={project.imageAlt ?? `${project.name} 관련 이미지`}
                      fill
                      wrapperClassName="avoid-break relative mb-7 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 1280px"
                      priority={index === 0}
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="no-print mt-20 border-t border-slate-200/90 pt-8 text-center text-xs text-slate-400">
          {meta.title} · Next.js · Vercel 배포 가능
        </footer>
      </main>
    </div>
  );
}
