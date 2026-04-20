import type { RichSegment } from "./portfolio-types";
import { joinPlain } from "./portfolio-types";

/** 외부 링크 한 줄 (비운 `href`는 화면에 안 나옵니다) */
export type ProfileLink = {
  label: string;
  href: string;
};

/** 포트폴리오 문구 — 이름·연락처·이미지 경로만 여기서 수정하면 됩니다. */
export const meta = {
  title: "PORTFOLIO",
  /** 비워두면 헤더 제목은 `title`을 씁니다. */
  name: "유승우",
  role: "백엔드 개발",
  /** 프로필 사진 — `public` 기준 경로. 증명사진은 3:4 프레임에 `contain`으로 전체 표시(잘림 없음) */
  photoSrc: "/images/projects/profile.jpg" as string,
  /** 이름 아래 한 줄(예: 활동·프로젝트 기간). 비우면 미표시 */
  activityPeriod: "",
  /**
   * About 영역 상단에만 쓰는 짧은 한 줄(선택).
   * 본문 소개는 `summaryParagraphs`(문단 배열)에 작성하면 됩니다.
   */
  tagline: "",
  /** 이메일 (비우면 미표시) */
  email: "swstar21c@gmail.com",
  /** 휴대폰 등 (비우면 미표시) */
  phone: "",
  /**
   * 블로그·깃허브 등 — `href`를 채운 항목만 표시.
   * 화면·인쇄/PDF 모두 **전체 URL**이 그대로 나옵니다.
   */
  links: [
    { label: "GitHub", href: "https://github.com/NCookies" },
    { label: "Blog", href: "https://velog.io/@ncookie" },
  ] satisfies ProfileLink[],
};

/** About 본문 — 문단마다 줄바꿈(빈 줄 느낌) */
export const summaryParagraphs: RichSegment[][] = [
  [
    { text: "실서비스와 " },
    { text: "AWS", kind: "tech" },
    { text: " 인프라를 함께 다루며, 병목은 기능 추가보다 " },
    { text: "수치·로그로 먼저", kind: "keyword" },
    { text: " 확인하고 줄이는 편입니다." },
  ],
  [
    { text: "개인 프로젝트", kind: "keyword" },
    { text: "(" },
    { text: "별볼일", kind: "keyword" },
    { text: ")에서는 외부 날씨 API 한도와 지연을 기준으로 " },
    { text: "Caffeine·Redis", kind: "tech" },
    { text: " 이중 캐시를 두어, 동일 조건 " },
    { text: "100회", kind: "metric" },
    { text: " 호출 시 응답을 " },
    { text: "약 19초 → 4초", kind: "metric" },
    { text: "(" },
    { text: "약 78%", kind: "metric" },
    { text: " 단축)까지 줄였습니다." },
  ],
  [
    { text: "팀 프로젝트", kind: "keyword" },
    { text: "(" },
    { text: "EZCODE", kind: "keyword" },
    { text: ")에서는 " },
    { text: "QueryDSL", kind: "tech" },
    { text: "로 토론 목록 조회를 " },
    { text: "314ms → 134ms", kind: "metric" },
    { text: "(" },
    { text: "57%", kind: "metric" },
    { text: " 개선)하고, " },
    { text: "ActiveMQ", kind: "tech" },
    { text: "·서킷 브레이커로 알림 경로의 안정성을 맞췄습니다." },
  ],
  [
    { text: "Terraform", kind: "tech" },
    { text: "으로 " },
    { text: "EC2·RDS·ElastiCache", kind: "tech" },
    { text: "를 " },
    { text: "IaC", kind: "keyword" },
    {
      text: "하고, 퍼블릭과 DB·캐시 접근을 나누는 구조까지 설계했습니다.",
    },
  ],
  [
    { text: "코드 리뷰", kind: "keyword" },
    { text: "와 " },
    { text: "장애·이슈 원인 분석", kind: "keyword" },
    {
      text: " 회의를 자주 이끌며, 재현 가능한 근거를 남기는 협업을 선호합니다.",
    },
  ],
];

/** 메타 설명·검색용 등 순수 텍스트 */
export const summaryPlain = summaryParagraphs
  .map((p) => joinPlain(p))
  .join(" ");

/** About과 겹치는 수치·서술은 넣지 않고, 스택 이름·역할만 요약 */
export const techStack: {
  category: string;
  categoryEn: string;
  items: RichSegment[][];
}[] = [
  {
    category: "백엔드",
    categoryEn: "Backend",
    items: [
      [
        { text: "Java", kind: "tech" },
        { text: ", " },
        { text: "Spring Boot", kind: "tech" },
        {
          text: " — REST API, 계층형 구조·도메인 분리, 이벤트·비동기 처리",
        },
      ],
    ],
  },
  {
    category: "데이터베이스 및 캐시",
    categoryEn: "DB / Cache",
    items: [
      [
        { text: "MySQL", kind: "tech" },
        { text: ", " },
        { text: "QueryDSL", kind: "tech" },
        { text: " — 복잡 조회·" },
        { text: "Spatial", kind: "tech" },
        { text: ", 실행 계획 기반 튜닝" },
      ],
      [
        { text: "Redis", kind: "tech" },
        { text: ", " },
        { text: "Caffeine", kind: "tech" },
        { text: " — L1–L2 캐시, 인스턴스 간 정합성" },
      ],
      [
        { text: "MongoDB", kind: "tech" },
        { text: " — 알림 등 실시간 데이터, " },
        { text: "멱등", kind: "keyword" },
        { text: " 처리" },
      ],
    ],
  },
  {
    category: "인프라 및 데브옵스",
    categoryEn: "Infra & DevOps",
    items: [
      [
        { text: "AWS", kind: "tech" },
        { text: ": " },
        { text: "EC2", kind: "tech" },
        { text: ", " },
        { text: "RDS", kind: "tech" },
        { text: ", " },
        { text: "ElastiCache", kind: "tech" },
        { text: " / " },
        { text: "Terraform", kind: "tech" },
        { text: "(" },
        { text: "IaC", kind: "keyword" },
        { text: ") — 망 분리·보안 그룹" },
      ],
      [
        { text: "ActiveMQ", kind: "tech" },
        { text: " — 메시징, " },
        { text: "서킷 브레이커", kind: "keyword" },
      ],
    ],
  },
];

export type ProjectHighlight = {
  title: RichSegment[];
  body: RichSegment[];
};

/** 시스템 아키텍처 다이어그램 + 요약 불릿 */
export type ProjectArchitectureBlock = {
  title: string;
  bullets: RichSegment[][];
};

export type ProjectArchitecture = {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  blocks: ProjectArchitectureBlock[];
};

export type Project = {
  id: string;
  name: string;
  /** 카드 상단에 표시하는 한 줄 설명 */
  subtitle: string;
  period: string;
  overview: RichSegment[];
  role: RichSegment[];
  highlights: ProjectHighlight[];
  /** `public` 기준 경로, 예: `/images/bolbolil.png`. 없으면 이미지 블록 생략 */
  imageSrc?: string;
  imageAlt?: string;
  /** 아키텍처 이미지 + 상세 설명 (선택) */
  architecture?: ProjectArchitecture;
};

export const projects: Project[] = [
  {
    id: "bolbolil",
    name: "별볼일",
    subtitle:
      "위치 기반 별 관측 적합도 분석 및 북마크 추천 백엔드 서비스",
    period: "2025.12 – 2026.01 (2개월)",
    overview: [
      { text: "위치 기반 별 관측 적합도 분석 및 추천", kind: "keyword" },
      {
        text: "을 제공하는 백엔드 시스템 및 인프라 구축 (개인 프로젝트)",
      },
    ],
    role: [
      { text: "외부 날씨 API", kind: "tech" },
      {
        text: " 연동 과정에서 발생하는 ",
      },
      { text: "병목 지점", kind: "keyword" },
      {
        text: "을 직접 분석하고, ",
      },
      { text: "이중 캐시", kind: "keyword" },
      { text: "와 " },
      { text: "병렬 처리", kind: "keyword" },
      {
        text: "를 통한 성능 최적화를 주도적으로 이끌어냄 / ",
      },
      { text: "Terraform", kind: "tech" },
      {
        text: " 기반 ",
      },
      { text: "AWS", kind: "tech" },
      {
        text: " 인프라 자동화 및 보안 망 분리 설계",
      },
    ],
    highlights: [
      {
        title: [
          { text: "[" },
          { text: "인프라 자동화", kind: "keyword" },
          { text: " 및 " },
          { text: "보안 격리", kind: "keyword" },
          { text: " 주도]" },
        ],
        body: [
          { text: "Terraform", kind: "tech" },
          {
            text: "을 활용해 ",
          },
          { text: "AWS", kind: "tech" },
          { text: "(" },
          { text: "EC2", kind: "tech" },
          { text: ", " },
          { text: "RDS", kind: "tech" },
          { text: ", " },
          { text: "ElastiCache", kind: "tech" },
          {
            text: ") 인프라를 코드화(",
          },
          { text: "IaC", kind: "keyword" },
          {
            text: ")하여 선언적으로 구축했습니다. 특히 ",
          },
          { text: "RDS", kind: "tech" },
          { text: "와 " },
          { text: "Redis", kind: "tech" },
          {
            text: "의 보안 그룹을 ",
          },
          { text: "EC2", kind: "tech" },
          {
            text: "에서만 접근 가능하도록 제한해, 공개망으로부터 ",
          },
          { text: "DB", kind: "keyword" },
          { text: "와 " },
          { text: "캐시", kind: "keyword" },
          {
            text: "를 안전하게 격리하는 아키텍처를 직접 설계했습니다.",
          },
        ],
      },
      {
        title: [
          { text: "[" },
          { text: "성능 최적화", kind: "keyword" },
          { text: " 및 " },
          { text: "이중 캐시", kind: "keyword" },
          { text: " 구축]" },
        ],
        body: [
          { text: "외부 API", kind: "tech" },
          {
            text: " 호출 지연 문제를 해결하기 위해 ",
          },
          { text: "L1(Caffeine)", kind: "tech" },
          { text: "와 " },
          { text: "L2(Redis)", kind: "tech" },
          {
            text: " 이중 캐시 환경을 직접 설계하고 도입했습니다. 동일 위치 재요청 시 인스턴스 간 캐시를 공유하여 외부 API 호출을 최소화했으며, 그 결과 API ",
          },
          { text: "100회", kind: "metric" },
          {
            text: " 호출 기준 응답 시간을 약 ",
          },
          { text: "19초", kind: "metric" },
          {
            text: "에서 약 ",
          },
          { text: "4초", kind: "metric" },
          { text: "로 " },
          { text: "78%", kind: "metric" },
          {
            text: " 단축하는 성과를 냈습니다.",
          },
        ],
      },
      {
        title: [
          { text: "[" },
          { text: "트래픽 제어", kind: "keyword" },
          { text: " 및 " },
          { text: "병렬 처리", kind: "keyword" },
          { text: " 도입]" },
        ],
        body: [
          { text: "OpenWeatherMap API", kind: "tech" },
          {
            text: "의 분당 ",
          },
          { text: "60회", kind: "metric" },
          {
            text: " 한도 제약을 분석한 뒤, ",
          },
          { text: "Bucket4j", kind: "tech" },
          {
            text: "를 활용해 토큰 소비를 제어하는 로직을 선제적으로 구현했습니다. 한도 내에서 ",
          },
          { text: "CompletableFuture", kind: "tech" },
          {
            text: "와 전용 스레드 풀을 도입해 점수 계산을 병렬로 처리함으로써 시스템 처리 효율을 극대화했습니다.",
          },
        ],
      },
    ],
  },
  {
    id: "ezcode",
    name: "EZCODE",
    subtitle:
      "AI 코드 리뷰와 캐릭터 성장 시스템을 포함한 코딩 테스트 서비스",
    period: "2025.06 – 2025.07 (2개월)",
    overview: [
      { text: "코딩 테스트", kind: "keyword" },
      {
        text: " 문제별 커뮤니티와 ",
      },
      { text: "실시간 알림", kind: "keyword" },
      {
        text: " 시스템을 포함한 웹 서비스 개발 (",
      },
      { text: "6인", kind: "metric" },
      { text: " 팀 프로젝트)" },
    ],
    role: [
      { text: "커뮤니티", kind: "keyword" },
      { text: " 및 " },
      { text: "알림", kind: "keyword" },
      {
        text: " 도메인의 백엔드를 전담하여, ",
      },
      { text: "쿼리 튜닝", kind: "keyword" },
      {
        text: "을 통한 조회 성능 개선 및 ",
      },
      { text: "MQ", kind: "tech" },
      {
        text: " 기반 실시간 알림 시스템 구축을 주도함.",
      },
    ],
    architecture: {
      heading: "시스템 아키텍처",
      imageSrc: "/images/projects/ezcode-architecture.png",
      imageAlt:
        "EZCODE AWS 기반 시스템 아키텍처 — Cloudflare, ELB, Private Subnet, RDS, ActiveMQ, Lightsail 채점 서버 등",
      blocks: [
        {
          title: "스케일 아웃 기반 인프라",
          bullets: [
            [
              { text: "Amazon ELB", kind: "tech" },
              { text: " + " },
              { text: "Auto Scaling Group", kind: "tech" },
              { text: " 구성" },
            ],
            [
              { text: "트래픽 급증 시 " },
              { text: "EC2", kind: "tech" },
              { text: " 인스턴스를 자동으로 증설" },
            ],
          ],
        },
        {
          title: "채점 서버 분리 (AWS Lightsail 배치)",
          bullets: [
            [
              { text: "메인 백엔드", kind: "keyword" },
              {
                text: "와 네트워크·자원 면에서 완전히 분리하여, ",
              },
              { text: "채점 부하", kind: "keyword" },
              {
                text: "나 장애가 전체 서비스에 영향을 주지 않도록 설계",
              },
            ],
          ],
        },
        {
          title: "네트워크 분리를 통한 보안 강화",
          bullets: [
            [
              { text: "외부 사용자", kind: "keyword" },
              { text: "의 직접적인 접근이 필요한 " },
              { text: "Frontend", kind: "tech" },
              { text: " 서버는 " },
              { text: "Public Subnet", kind: "tech" },
              { text: "에 배치" },
            ],
            [
              { text: "Backend", kind: "tech" },
              { text: " 서버와 " },
              { text: "데이터베이스", kind: "keyword" },
              { text: "는 " },
              { text: "Private Subnet", kind: "tech" },
              { text: "에 배치" },
            ],
          ],
        },
      ],
    },
    highlights: [
      {
        title: [
          { text: "[" },
          { text: "조회 쿼리 튜닝", kind: "keyword" },
          { text: " 및 성능 개선]" },
        ],
        body: [
          {
            text: "토론글 목록 조회 시 발생하는 다중 서브쿼리의 실행 계획 비효율을 직접 파악하고, ",
          },
          { text: "QueryDSL", kind: "tech" },
          {
            text: "을 활용해 ",
          },
          { text: "JOIN", kind: "tech" },
          { text: "과 " },
          { text: "GROUP BY", kind: "tech" },
          {
            text: "로 쿼리를 분리하는 튜닝을 진행했습니다. 이를 통해 API 응답 속도를 ",
          },
          { text: "314ms", kind: "metric" },
          {
            text: "에서 ",
          },
          { text: "134ms", kind: "metric" },
          { text: "로 " },
          { text: "57%", kind: "metric" },
          {
            text: " 향상시켰습니다.",
          },
        ],
      },
      {
        title: [
          { text: "[" },
          { text: "비동기 파이프라인", kind: "keyword" },
          { text: " 설계 및 안정성 확보]" },
        ],
        body: [
          { text: "Spring Event", kind: "tech" },
          {
            text: " 방식의 ",
          },
          { text: "메시지 유실", kind: "keyword" },
          {
            text: " 위험을 파악한 후, 이를 ",
          },
          { text: "ActiveMQ", kind: "tech" },
          {
            text: " 기반의 비동기 처리로 전환하여 ",
          },
          { text: "데이터 내구성", kind: "keyword" },
          {
            text: "을 직접 확보했습니다. 또한 ",
          },
          { text: "서킷 브레이커", kind: "keyword" },
          {
            text: " 패턴과 스케줄러 기반 재처리 로직을 주도적으로 도입하여 ",
          },
          { text: "DB", kind: "tech" },
          {
            text: " 장애가 서비스 전체로 전파되는 것을 방지했습니다.",
          },
        ],
      },
      {
        title: [
          { text: "[" },
          { text: "문제 해결", kind: "keyword" },
          { text: " 주도 및 협업]" },
        ],
        body: [
          { text: "프론트엔드", kind: "tech" },
          {
            text: " 연동 중 발생한 예외 상황(",
          },
          { text: "JSON 파싱 에러", kind: "keyword" },
          { text: " 등)과 " },
          { text: "Git", kind: "tech" },
          {
            text: " 머지 충돌 과정에서 팀 내 코드 리뷰와 원인 분석 회의를 주도했습니다. 이슈를 신속히 공유하고 해결 방안을 도출하여 서비스 통합 과정을 매끄럽게 이끌었습니다.",
          },
        ],
      },
    ],
  },
];

export type { RichSegment } from "./portfolio-types";
