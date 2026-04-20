import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** `quality` prop에 사용할 값 (기본 75 외 고화질 옵션) */
    qualities: [75, 85, 92, 100],
    /** 큰 화면·레티나에서도 충분한 폭으로 요청되도록 상한 확장 */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
