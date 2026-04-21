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

/** About 본문 — 항목마다 한 줄(화면에서는 앞에 * 마커) */
export const summaryParagraphs: RichSegment[][] = [
  [
    { text: "수치 기반의 병목 개선", kind: "keyword" },
    { text: ": 실서비스와 " },
    { text: "AWS", kind: "tech" },
    { text: " 인프라를 함께 다루며, 병목은 기능 추가보다 " },
    { text: "수치·로그로 먼저", kind: "keyword" },
    { text: " 확인하고 개선합니다." },
  ],
  [
    { text: "성능 및 아키텍처 최적화", kind: "keyword" },
    { text: ": '" },
    { text: "별볼일", kind: "keyword" },
    { text: "' 프로젝트에서 " },
    { text: "Caffeine·Redis", kind: "tech" },
    { text: " 이중 캐시를 도입해 외부 API 응답을 " },
    { text: "19초", kind: "metric" },
    { text: "에서 " },
    { text: "4초", kind: "metric" },
    { text: "(" },
    { text: "78%", kind: "metric" },
    { text: " 단축)로 줄였으며, '" },
    { text: "EZCODE", kind: "keyword" },
    { text: "'에서는 " },
    { text: "QueryDSL", kind: "tech" },
    { text: " 최적화(" },
    { text: "314ms → 134ms", kind: "metric" },
    { text: ") 및 " },
    { text: "ActiveMQ", kind: "tech" },
    { text: "·" },
    { text: "서킷 브레이커", kind: "keyword" },
    { text: "로 알림 파이프라인의 고가용성을 확보했습니다." },
  ],
  [
    { text: "안전한 인프라와 협업", kind: "keyword" },
    { text: ": " },
    { text: "Terraform", kind: "tech" },
    { text: "으로 " },
    { text: "AWS", kind: "tech" },
    { text: " 인프라를 코드화(" },
    { text: "IaC", kind: "keyword" },
    { text: ")하고 DB망 분리 구조를 설계했습니다. 또한, " },
    { text: "코드 리뷰", kind: "keyword" },
    { text: "와 " },
    { text: "장애 원인 분석", kind: "keyword" },
    { text: " 회의를 주도하며 재현 가능한 근거를 남기는 협업을 지향합니다." },
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

/** 트러블슈팅 4단계(문제 → 판단 → 해결 → 결과) */
export type ProjectTroubleshooting = {
  problem: RichSegment[];
  thinking: RichSegment[];
  solution: RichSegment[];
  result: RichSegment[];
};

/** 한 카드 안에서 키워드별 단락 구분 (예: EZCODE 조회 vs MQ) */
export type ProjectKeywordParagraph = {
  keyword: string;
  segments: RichSegment[];
};

export type ProjectHighlight = {
  title: RichSegment[];
  /** 기본 단일 문단 — `troubleshooting`·`keywordParagraphs`가 없을 때 사용 */
  body?: RichSegment[];
  troubleshooting?: ProjectTroubleshooting;
  keywordParagraphs?: ProjectKeywordParagraph[];
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
    period: "2025.12 – 2026.01 (6주)",
    overview: [
      { text: "위치 기반 별 관측 적합도 분석 및 추천", kind: "keyword" },
      { text: "을 제공하는 백엔드 (" },
      { text: "개인 프로젝트", kind: "keyword" },
      { text: ", " },
      { text: "기여도 100%", kind: "metric" },
      { text: ") 및 인프라 구축" },
    ],
    role: [
      {
        text: "실제 트래픽 규모를 가정해 ",
      },
      { text: "외부 API 한도", kind: "keyword" },
      { text: "·" },
      { text: "수평 확장", kind: "keyword" },
      {
        text: " 관점에서 ",
      },
      { text: "병목을 먼저 정의", kind: "keyword" },
      {
        text: "하고, 이중 캐시·트래픽 제어·병렬 처리로 해결. ",
      },
      { text: "Terraform", kind: "tech" },
      { text: " 기반 " },
      { text: "AWS", kind: "tech" },
      {
        text: " 인프라 자동화 및 보안 망 분리 설계",
      },
    ],
    highlights: [
      {
        title: [
          { text: "[" },
          { text: "트러블슈팅 1", kind: "keyword" },
          {
            text: "] 외부 날씨 API 한도 제한 및 응답 지연 극복",
          },
        ],
        troubleshooting: {
          problem: [
            {
              text: "관측지 점수 계산 시 외부 날씨 API(",
            },
            { text: "OpenWeatherMap", kind: "tech" },
            { text: ")의 분당 " },
            { text: "60회", kind: "metric" },
            {
              text: " 호출 제한으로 인해, 북마크가 많아질수록 API 병목 및 한도 초과 오류(",
            },
            { text: "Rate Limit", kind: "keyword" },
            { text: ") 발생 위험." },
          ],
          thinking: [
            {
              text: "불필요한 API 호출을 원천 차단하는 ",
            },
            { text: "캐싱", kind: "keyword" },
            {
              text: "과, 불가피한 호출을 안전하게 제어하는 ",
            },
            { text: "병렬 처리", kind: "keyword" },
            {
              text: " 전략을 동시 적용.",
            },
          ],
          solution: [
            { text: "이중 캐시", kind: "keyword" },
            { text: "(Dual Cache) " },
            {
              text: "아키텍처: ",
            },
            { text: "L1(Caffeine, 5분)", kind: "tech" },
            { text: " + " },
            { text: "L2(Redis, 1시간)", kind: "tech" },
            {
              text: " 조합으로 구성해, 동일 위치 조회 시 API 호출을 막고 인스턴스 간 데이터 정합성 유지.\n\n",
            },
            { text: "트래픽 제어 및 병렬 처리", kind: "keyword" },
            { text: ": " },
            { text: "Bucket4j", kind: "tech" },
            {
              text: "로 분당 토큰 소비를 제어하고, ",
            },
            { text: "CompletableFuture", kind: "tech" },
            {
              text: "와 스레드 풀을 활용해 허용된 한도 내에서 점수 계산 로직을 병렬로 수행.",
            },
          ],
          result: [
            { text: "추천 API", kind: "keyword" },
            { text: " " },
            { text: "100회", kind: "metric" },
            { text: " 호출 기준 응답 시간 " },
            { text: "19초 → 4초", kind: "metric" },
            { text: " (" },
            { text: "78% 단축", kind: "metric" },
            {
              text: "). API 한도 초과 상황에서도 메인 서비스가 중단되지 않는 견고한 아키텍처 확보.",
            },
          ],
        },
      },
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
            text: "으로 ",
          },
          { text: "AWS", kind: "tech" },
          { text: "(" },
          { text: "EC2", kind: "tech" },
          { text: ", " },
          { text: "RDS", kind: "tech" },
          { text: ", " },
          { text: "ElastiCache", kind: "tech" },
          {
            text: ") ",
          },
          { text: "IaC", kind: "keyword" },
          {
            text: " 구축. ",
          },
          { text: "RDS", kind: "tech" },
          { text: "·" },
          { text: "Redis", kind: "tech" },
          {
            text: "는 ",
          },
          { text: "EC2", kind: "tech" },
          {
            text: "에서만 접근 가능하도록 보안 그룹을 제한해 공개망으로부터 ",
          },
          { text: "DB", kind: "keyword" },
          { text: "·" },
          { text: "캐시", kind: "keyword" },
          {
            text: " 격리.",
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
    period: "2025.06 – 2025.07 (6주)",
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
      heading: "EZCODE 시스템 아키텍처",
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
          { text: "트러블슈팅 1", kind: "keyword" },
          {
            text: "] 다중 집계 쿼리 최적화 및 N+1 문제 원천 차단",
          },
        ],
        troubleshooting: {
          problem: [
            {
              text: "토론글 목록 페이징 조회 시 다수의 집계/조인이 발생해 실행 계획이 비효율적이었음. 특히 ",
            },
            { text: "IN", kind: "tech" },
            {
              text: " 절 조회 시 기존 정렬(베스트/추천순)이 깨지고 ",
            },
            { text: "N+1", kind: "keyword" },
            { text: " 문제가 동반됨." },
          ],
          thinking: [
            {
              text: "페이징을 위한 식별자(",
            },
            { text: "ID", kind: "tech" },
            {
              text: ") 조회와 상세 데이터 조회의 책임을 ",
            },
            { text: "2단계", kind: "keyword" },
            {
              text: "로 분리하고, 애플리케이션 메모리 단에서 정렬 재배치 수행.",
            },
          ],
          solution: [
            { text: "QueryDSL", kind: "tech" },
            {
              text: " 쿼리 분리: 정렬 및 페이징 조건이 적용된 ‘ID 목록’을 선행 조회한 후, 해당 ID로 ‘상세 집계 데이터’를 ",
            },
            { text: "JOIN", kind: "tech" },
            { text: "과 " },
            { text: "GROUP BY", kind: "tech" },
            {
              text: "로 한 번에 조회.\n\n",
            },
            { text: "메모리 재정렬", kind: "keyword" },
            {
              text: ": 조회된 데이터(",
            },
            { text: "Map", kind: "tech" },
            {
              text: " 구조)를 처음 추출했던 ID 순서에 맞춰 애플리케이션 단에서 안전하게 매핑 및 재배치.",
            },
          ],
          result: [
            {
              text: "복잡한 쿼리 실행 계획을 단순화하여 ",
            },
            { text: "N+1", kind: "keyword" },
            {
              text: " 문제 해결. API 응답 속도 ",
            },
            { text: "314ms → 134ms", kind: "metric" },
            { text: " (" },
            { text: "57% 향상", kind: "metric" },
            { text: ") 달성." },
          ],
        },
      },
      {
        title: [
          { text: "[" },
          { text: "트러블슈팅 2", kind: "keyword" },
          {
            text: "] 알림 파이프라인 연쇄 장애 방지 및 내구성 확보",
          },
        ],
        troubleshooting: {
          problem: [
            { text: "Spring Event", kind: "tech" },
            {
              text: " 기반 알림은 서버 다운 시 메시지 유실 위험이 있고, 알림 DB(",
            },
            { text: "MongoDB", kind: "tech" },
            {
              text: ") 장애 시 메인 비즈니스(게시글 작성 등)까지 롤백되는 ",
            },
            { text: "연쇄 장애", kind: "keyword" },
            { text: " 가능성 존재." },
          ],
          thinking: [
            {
              text: "메인 비즈니스와 알림 처리 간 ",
            },
            { text: "결합도", kind: "keyword" },
            {
              text: "를 낮추고, ",
            },
            { text: "서킷 브레이커", kind: "keyword" },
            {
              text: "를 통한 장애 물리적 ",
            },
            { text: "격리(Isolation)", kind: "keyword" },
            { text: " 적용." },
          ],
          solution: [
            { text: "MQ", kind: "keyword" },
            { text: " 전환 및 트랜잭션 분리: " },
            { text: "ActiveMQ", kind: "tech" },
            {
              text: "로 이벤트 비동기 발행. 알림 트랜잭션을 ",
            },
            { text: "REQUIRES_NEW", kind: "tech" },
            {
              text: "로 분리해 실패 시에도 메인 로직은 커밋되도록 결합도 차단.\n\n",
            },
            { text: "서킷 브레이커", kind: "keyword" },
            { text: " 및 재처리: " },
            { text: "Resilience4j", kind: "tech" },
            {
              text: "로 DB 장애 시 ",
            },
            { text: "Fast-Fail", kind: "keyword" },
            {
              text: " 유도. 실패 내역은 별도 로그로 남기고 스케줄러로 큐에 재발행하는 ",
            },
            { text: "멱등", kind: "keyword" },
            { text: " 보장 로직 구현." },
          ],
          result: [
            {
              text: "알림 DB 장애나 트래픽 폭주 시에도 메인 서비스 로직이 영향을 받지 않는 고가용성 ",
            },
            { text: "메시징", kind: "keyword" },
            { text: " 파이프라인 완성." },
          ],
        },
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
            text: " 연동 예외(",
          },
          { text: "JSON 파싱", kind: "keyword" },
          { text: " 등)·" },
          { text: "Git", kind: "tech" },
          {
            text: " 머지 충돌 시 코드 리뷰·원인 분석 회의를 주도해 통합 일정을 맞춤.",
          },
        ],
      },
    ],
  },
];

export type { RichSegment } from "./portfolio-types";
