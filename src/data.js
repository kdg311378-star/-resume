export const PROFILE = {
  name: '김동규',
  github: 'https://github.com/kdg311378-star',
  email: 'kdg311378@gmail.com',
  headline: '데이터와 AI를 연결해, 실제 문제를 풉니다.',
  introduction: '백엔드 API와 데이터 파이프라인, AI 추론 기능을 제품 안에서 연결하는 개발자입니다. 무엇을 구현했는지뿐 아니라 왜 그렇게 설계했고, 실제로 어떻게 확인할 수 있는지까지 설명하는 것을 중요하게 생각합니다.',
};

// Start-date order. TomorrowMarket's exact project start date is not confirmed;
// 2026-08-14 is the earliest contribution record found in the reviewed PR history.
export const PROJECTS = [
  {
    id: 'ziphyeonjeon', order: '01', name: '집현전', english: 'ZIPHYEONJEON',
    dateSort: '2025-12-29', dateLabel: '2025.12.29 – 2026.05.27',
    eyebrow: 'BACKEND · AI · WEB SERVICE',
    subtitle: '지능형 부동산 안전 거래 및 시세 예측 AI 플랫폼',
    description: '공공 부동산 데이터와 분석 기능을 연결해 실거래·공시지가·상권 정보를 살펴보고, 전세 위험 관련 정보와 대화형 부동산 상담을 이용하도록 설계한 웹 서비스입니다.',
    role: '프론트엔드 리드 · 백엔드 개발 · 챗봇 AI 연동',
    contribution: 'React 화면과 API 통합, Spring Security·JWT 기반 인증, Redis Refresh Token 관리, JPA·MySQL 연동, 공통 예외 응답 표준화와 챗봇 API 통신을 담당했습니다.',
    challenge: '도메인별 화면과 서버 API가 늘어나면서 인증 상태와 오류 응답이 각 화면에 흩어질 수 있었습니다. 공통 통신 계층을 만들고 인증·예외 처리 규칙을 한곳에서 다루도록 정리하는 데 집중했습니다.',
    details: [
      ['프론트엔드 구조와 API 통신', 'React 컴포넌트 기반으로 주요 화면을 정리하고 도메인별 API 모듈과 Axios Interceptor를 통해 공통 요청·인증 처리를 구성했습니다.'],
      ['인증과 세션 관리', 'Spring Security·JWT 기반 로그인/회원가입을 구현하고 Redis를 이용해 Refresh Token을 관리했습니다.'],
      ['데이터 영속성', 'JPA와 MySQL을 연동하고 부동산 조회 및 분석 서비스에서 사용하는 데이터 접근 흐름을 연결했습니다.'],
      ['공통 예외 처리', '@RestControllerAdvice 기반 GlobalExceptionHandler와 클라이언트 인터셉터를 활용해 API 오류 응답 규칙을 통합했습니다.'],
      ['AI 서비스 통합', 'FastAPI 기반 법률 문서 RAG(FAISS/BM25)와 챗봇 API, 별도 예측 기능을 서비스 화면 및 백엔드 흐름에 연결하는 작업에 참여했습니다.'],
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Redis', 'JPA', 'MySQL', 'React', 'Axios', 'FastAPI', 'FAISS', 'BM25'],
    flow: ['공공 부동산 데이터', '백엔드 API · 인증', '분석 화면', 'AI 상담'],
    repo: 'https://github.com/kdg311378-star/ZIPHYEONJEON',
    caveat: '시세 예측 및 RAG 기능은 서비스 통합 범위로 소개합니다. 재현 가능한 평가 데이터와 절차가 확인되지 않은 모델 정확도나 검색 품질 수치는 기재하지 않았습니다.',
    thumbnail: '/media/ziphyeonjeon-thumbnail.webp', screenshot: '/media/ziphyeonjeon-screenshot.webp', architecture: '/media/ziphyeonjeon-architecture.png',
  },
  {
    id: 'tomorrowmarket', order: '02', name: '내일장', english: 'TomorrowMarket',
    dateSort: '2026-08-14', dateLabel: '2026.08 – 10 · 확인 가능한 기여 기록',
    eyebrow: 'DATA · BACKEND · AI INTEGRATION',
    subtitle: '주식 정보 · 뉴스 · 예측 대시보드',
    description: '종목·섹터·뉴스·감성 정보를 모아 예측 API와 시각화 화면으로 연결한 시장 정보 플랫폼입니다. 사용자가 관련 시장 정보를 하나의 흐름에서 탐색하도록 하는 데 초점을 두었습니다.',
    role: '백엔드 · 데이터/AI 서비스 연동',
    contribution: '인증 및 API 구조, 종목·섹터 조회, 뉴스 수집 스케줄러, Python 예측 클라이언트, 감성 차트 화면의 연결을 포함한 백엔드 및 데이터·AI 통합 작업에 참여했습니다.',
    challenge: '뉴스와 가격 정보, 분석 결과가 분리된 구성요소에 있어 사용자가 한 화면에서 이해하기 어려울 수 있었습니다. 데이터 수집·추론 API·시각화 화면을 잇는 통합 흐름을 만드는 데 집중했습니다.',
    details: [
      ['서비스 API', 'Spring 기반 API를 통해 종목, 섹터, 관심 목록과 분석 결과를 화면에 제공하는 요청 흐름을 구성했습니다.'],
      ['뉴스 수집 흐름', '뉴스 크롤링 스케줄러와 비동기 조회 API를 연결해 시장 정보를 정기적으로 수집하고 노출하도록 작업했습니다.'],
      ['예측 서비스 연동', 'Java 기반 클라이언트와 Python 데이터·예측 서비스를 연결해 요청과 결과 전달 흐름을 구현했습니다.'],
      ['대시보드 통합', '종목·섹터 페이지, 뉴스 감성 차트와 실시간 데이터 표시를 사용자 화면에 연결했습니다.'],
      ['모델 실행 조건 확인', '모델 레지스트리와 입력 특성 전달 흐름을 검토하고 저장소에 포함되지 않은 가중치 등 실행 전제 조건을 구분했습니다.'],
    ],
    stack: ['Java', 'Spring Boot', 'Python', 'LightGBM', 'React', 'REST API', 'Scheduler', 'MySQL', 'GitHub Actions'],
    flow: ['뉴스 · 가격 데이터', '수집 및 전처리', '예측 API', '종목·섹터 대시보드'],
    repo: 'https://github.com/kdg311378-star/tomorrowMarket',
    caveat: '실제 프로젝트 시작일은 별도 확인이 필요합니다. 날짜는 GitHub에서 확인 가능한 첫 기여 기록 기준으로 표시했습니다. 모델 가중치가 모두 저장소에 포함되어 있지 않고 일부 TFT 추론 경로도 완전한 재현 여부를 확인하기 어려워, 정확도나 투자 수익률은 주장하지 않습니다.',
    thumbnail: '/media/tomorrowmarket-thumbnail.webp', screenshot: '/media/tomorrowmarket-screenshot.webp', architecture: '/media/tomorrowmarket-architecture.png',
  },
  {
    id: 'goldenstep', order: '03', name: '골든스텝', english: 'GoldenStep AI',
    dateSort: '2026-09-21', dateLabel: '2026.09.21 – 2026.10.05',
    eyebrow: 'AI · GEOSPATIAL · ALGORITHM',
    subtitle: '초기 실종자 탐색 의사결정 지원 알고리즘',
    description: '마지막 확인 위치와 경과시간, 실제 보행 도로망을 바탕으로 도달 가능 영역과 우선 확인 후보 거점을 계산하는 알고리즘/API 프로젝트입니다. 전문 수색을 대체하기보다 초기 탐색 의사결정을 보조하는 것을 목표로 합니다.',
    role: 'AI · 데이터 엔지니어링 · 코어 연구',
    contribution: '공간 네트워크 인프라, 도달 권역 계산 엔진, 가상 에이전트 시뮬레이터, POI 랭킹·공간 분산 엔진, 추론 서빙과 검증 데이터 구성에 참여했습니다.',
    challenge: '요청 시마다 대용량 도로망 파일 파싱과 기하 연산을 반복하면 응답 지연이 발생할 수 있었습니다. 정적 데이터의 사전 계산·메모리 적재와 공간 색인을 활용해 반복 연산 부담을 줄이는 방향으로 접근했습니다.',
    details: [
      ['공간 네트워크 구성', 'OpenStreetMap 기반 보행 도로망을 읽어 노드·엣지와 이동 비용을 구성하고 공간 분석을 위한 입력을 준비했습니다.'],
      ['도달 권역 계산', '직선거리 기반 영역과 도로망 기반 영역을 분리해 비교하고, 보행 가능 경로를 고려한 후보 공간을 산출했습니다.'],
      ['가상 에이전트 시뮬레이션', '이동 거리와 경로 선택을 반복 실행해 후보 거점 점수화에 사용할 이동 샘플을 생성하는 구조를 구현했습니다.'],
      ['후보 거점 랭킹', '도로망 후보 위치를 평가하고, 결과가 한곳에 과도하게 몰리지 않도록 공간 분산 단계를 구성했습니다.'],
      ['서빙과 데이터 검증', 'FastAPI 추론 엔드포인트와 배포 흐름을 연결하고, 실사례 체크포인트를 데이터 유형별로 나눠 결과 비교 체계를 구성했습니다.'],
    ],
    stack: ['Python 3.11', 'FastAPI', 'OSMnx', 'NetworkX', 'GeoPandas', 'Shapely', 'STRtree', 'SciPy', 'NumPy', 'Docker', 'AWS S3', 'GitHub Actions'],
    flow: ['보행 도로망', '도달 권역', '이동 시뮬레이션', '후보 거점 랭킹'],
    repo: 'https://github.com/Hop-Radar/goldenstep-algorithm',
    caveat: '현재 체크포인트의 일부 지표는 지원서에 기재된 수치와 일치하지 않습니다. Hit-Rate·공간 압축률·K-S 검정·응답시간은 데이터셋과 지표 정의를 맞춘 재현 검증이 끝나기 전 확정 성과로 제시하지 않습니다.',
    thumbnail: '/media/goldenstep-thumbnail.webp', screenshot: '/media/goldenstep-screenshot.webp', architecture: '/media/goldenstep-architecture.png',
  },
].sort((a, b) => a.dateSort.localeCompare(b.dateSort));

export const TECH_GROUPS = [
  { id: 'backend', title: 'Backend & API', korean: '백엔드', description: '서비스 로직, 인증·인가, 데이터 영속성, API 설계와 서비스 간 통신', tools: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Redis', 'JPA / Hibernate', 'MySQL', 'Python', 'FastAPI', 'Django', 'REST API'] },
  { id: 'frontend', title: 'Frontend', korean: '프론트엔드', description: '사용자 흐름과 화면 컴포넌트를 구성하고 API와 연결', tools: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Axios', 'Context API', 'Vite', 'Responsive UI', 'NAVER Maps API', 'TMAP API'] },
  { id: 'data', title: 'Data & Applied AI', korean: '데이터 · AI', description: '데이터 수집·가공·공간 분석·검색과 추론 서비스 통합', tools: ['NumPy', 'SciPy', 'Pandas', 'NetworkX', 'OSMnx', 'GeoPandas', 'Shapely', 'LightGBM', 'FAISS', 'BM25', 'Ollama', 'ChromaDB'] },
  { id: 'cloud', title: 'Cloud & Delivery', korean: '클라우드 · 배포', description: '컨테이너 실행 환경, 클라우드 리소스, 빌드·배포 자동화', tools: ['Docker', 'Docker Compose', 'AWS EC2', 'AWS S3', 'Amazon ECR', 'AWS Secrets Manager', 'AWS Lambda', 'Step Functions', 'AWS SAM', 'GitHub Actions'] },
];


// About 카드 데이터. todo:true 항목은 화면에 흐린 안내 문구로 보입니다. 실제 정보로 교체하세요.
// 전화번호·주소·생년월일 같은 개인정보는 누구나 볼 수 있는 링크에는 넣지 않는 것을 권장합니다.
export const ABOUT = {
  info: [['이름', '김동규'], ['지향', 'Backend · Data · Applied AI'], ['GitHub', 'kdg311378-star'], ['거주 지역', '']],
  education: [{ period: '0000.00 – 0000.00', title: '학교명 · 전공', desc: '졸업 / 재학 / 수료 여부', todo: true }],
  certs: [{ period: '취득일', title: '자격증명', desc: '발급 기관', todo: true }],
  values: [
    ['근거 중심', '성과를 말할 때 코드, 테스트, 입력 데이터와 산출 기준을 함께 살핍니다. 재현하지 못한 수치를 성과로 단정하지 않습니다.'],
    ['시스템 관점', '화면·API·데이터·모델·인프라가 연결되는 전체 흐름과 각 구성요소의 책임 경계를 함께 고려합니다.'],
    ['끝까지 통합', '분리된 구성요소가 실제 요청과 응답에서 동작하도록 연결하고, 부족한 부분을 확인하며 개선합니다.'],
  ],
};
