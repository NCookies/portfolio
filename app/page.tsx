import Image from "next/image";
import { RichText } from "@/components/RichText";
import { ZoomableImage } from "@/components/ZoomableImage";
import { joinPlain } from "@/lib/portfolio-types";
import { meta, projects, summarySegments, techStack } from "@/lib/portfolio";

/** 본문·설명문 공통: 한글 장문 가독성 */
const bodyText =
  "text-[0.9375rem] leading-[1.8] text-slate-600 sm:text-base sm:leading-[1.78] print:text-[10.75pt] print:leading-[1.58] print:text-slate-800";

/** 이력서형 섹션 제목 — 참고 레이아웃처럼 강조색 */
const sectionTitle =
  "mb-5 border-b border-red-200/90 pb-3 text-xl font-bold tracking-tight text-red-700 print:mb-4 print:border-red-200 print:text-[12.5pt]";

const activeLinks = meta.links.filter((l) => l.href?.trim());
const showContactBlock =
  Boolean(meta.email?.trim()) ||
  Boolean(meta.phone?.trim()) ||
  activeLinks.length > 0;

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

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-6 sm:px-6 print:max-w-none print:px-0 print:pb-0 print:pt-5">
        <header className="profile-header mb-12 border-b border-slate-200/90 pb-9 print:mb-8 print:pb-6">
          {/* 왼쪽: 사진만 · 오른쪽: 이름 ↓ 이메일 ↓ 링크 (화면·PDF 동일 구조) */}
          <div className="profile-header-photo relative mx-auto aspect-square w-full max-w-[200px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 md:mx-0 md:w-[200px] md:max-w-[200px] print:mx-0">
            {meta.photoSrc?.trim() ? (
              <Image
                src={meta.photoSrc.trim()}
                alt={
                  meta.name?.trim()
                    ? `${meta.name.trim()} 프로필`
                    : "프로필 사진"
                }
                width={400}
                height={400}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 70vw, 200px"
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
              <h1 className="text-[1.5rem] font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl print:text-[16pt]">
                {meta.name?.trim() ? meta.name : meta.title}
              </h1>
              <p className="mt-1.5 text-sm font-semibold text-slate-800 print:text-[10.5pt]">
                {meta.role}
              </p>
              {meta.activityPeriod?.trim() ? (
                <p className="mt-1 text-xs text-slate-500 print:text-[9pt]">
                  {meta.activityPeriod.trim()}
                </p>
              ) : null}
            </div>

            {showContactBlock ? (
              <div className="space-y-3 border-t border-slate-200 pt-4 text-sm print:space-y-2.5 print:border-slate-300 print:pt-3">
                {meta.email?.trim() ? (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 print:text-[9pt]">
                      Email
                    </p>
                    <a
                      href={`mailto:${meta.email.trim()}`}
                      className="mt-0.5 block break-all text-slate-900 underline decoration-slate-300 underline-offset-2 print:text-[10.5pt]"
                    >
                      {meta.email.trim()}
                    </a>
                  </div>
                ) : null}
                {meta.phone?.trim() ? (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 print:text-[9pt]">
                      Phone
                    </p>
                    <a
                      href={`tel:${meta.phone.trim().replace(/\s/g, "")}`}
                      className="mt-0.5 block underline decoration-slate-300 underline-offset-2 print:text-[10.5pt]"
                    >
                      {meta.phone.trim()}
                    </a>
                  </div>
                ) : null}
                {activeLinks.map((link) => {
                  const url = link.href.trim();
                  return (
                    <div key={url}>
                      <p className="text-[11px] font-medium text-slate-500 print:text-[9pt]">
                        {link.label}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block break-all font-mono text-[0.8125rem] leading-relaxed text-slate-800 underline decoration-slate-300 underline-offset-[3px] print:text-[9.5pt] print:decoration-slate-400"
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
            <p className="mb-4 text-sm font-medium leading-relaxed text-slate-800 print:text-[10.75pt]">
              {meta.tagline.trim()}
            </p>
          ) : null}
          <div className={`${bodyText} text-pretty max-w-none`}>
            <RichText segments={summarySegments} />
          </div>
        </section>

        <section className="mb-14 print:mb-12">
          <h2 className={sectionTitle}>기술 스택 및 역량</h2>
          <div className="space-y-10 print:space-y-8">
            {techStack.map((group) => (
              <div key={group.category} className="avoid-break">
                <h3 className="mb-3.5 text-[1.05rem] font-semibold text-slate-900 print:text-[11.5pt]">
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
          <h2 className={`${sectionTitle} mb-8 print:mb-6`}>경력 및 프로젝트</h2>
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
                      <h3 className="text-[1.35rem] font-bold leading-tight text-slate-900 print:text-[13pt]">
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
                    {project.highlights.map((h) => (
                      <div
                        key={joinPlain(h.title)}
                        className="avoid-break rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5 print:border-slate-200 print:bg-white"
                      >
                        <div className="mb-2 text-sm leading-snug text-slate-900 print:text-[10.75pt]">
                          <RichText segments={h.title} />
                        </div>
                        <p className={bodyText}>
                          <RichText segments={h.body} />
                        </p>
                      </div>
                    ))}
                  </div>

                  {project.architecture ? (
                    <section
                      className="print-break avoid-break mb-8 print:mb-7"
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
                              <p className="mb-2.5 text-sm font-semibold text-slate-900 print:text-[10.75pt]">
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
