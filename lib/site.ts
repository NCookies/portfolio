/** 배포 URL (메타 태그·OG 이미지용). 프로덕션에서는 환경 변수 권장. */
export function getSiteUrl(): URL {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) {
    return new URL(env.endsWith("/") ? env.slice(0, -1) : env);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}
