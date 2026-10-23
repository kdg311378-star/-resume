import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const PROFILE = {
  name: '김동규',
  github: 'https://github.com/kdg311378-star',
  email: 'kdg311378@gmail.com',
  headline: '데이터와 AI를 연결해, 실제 문제를 풉니다.',
  introduction: '백엔드 API와 데이터 파이프라인, AI 추론 기능을 제품 안에서 연결하는 개발자입니다. 무엇을 구현했는지뿐 아니라 왜 그렇게 설계했고, 실제로 어떻게 확인할 수 있는지까지 설명하는 것을 중요하게 생각합니다.',
};

// Start-date order. TomorrowMarket's exact project start date is not confirmed;
// 2026-08-14 is the earliest contribution record found in the reviewed PR history.
const PROJECTS = [
  {
    "id": "ziphyeonjeon",
    "order": "01",
    "name": "집현전",
    "english": "ZIPHYEONJEON",
    "dateSort": "2025-12-29",
    "dateLabel": "2025.12.29 – 2026.05.27",
    "eyebrow": "BACKEND · AI · WEB SERVICE",
    "subtitle": "지능형 부동산 안전 거래 및 시세 예측 AI 플랫폼",
    "description": "공공 부동산 데이터, 분석 화면, 인증이 적용된 백엔드, AI 상담 기능을 연결해 부동산 정보를 탐색하도록 지원하는 웹 서비스입니다.",
    "background": "전·월세 및 매매 계약에서 거래 경험이 적은 사용자는 주변 시세, 실거래, 공시지가, 상권 및 전세 위험 관련 정보를 여러 출처에서 따로 확인해야 합니다. 정보가 분산되어 있으면 수치를 비교하고 관련 법률·제도 정보를 찾는 과정도 복잡해질 수 있습니다.",
    "goal": "공공 부동산 데이터와 사용자용 분석 화면을 한 서비스 안에서 연결하고, 인증·데이터 접근·AI 상담 API가 일관된 흐름으로 동작하도록 구성하는 것이 목표였습니다. 서비스는 거래 안전을 보증하는 도구가 아니라, 사용자의 정보 탐색과 비교를 돕는 보조 서비스로 정의합니다.",
    "team": "총 3명: PO 및 백엔드/AI, PM 및 백엔드/AI, 프런트엔드 리드 및 챗봇 AI 백엔드 역할",
    "role": "프런트엔드 리드 · 백엔드 개발 · 챗봇 AI 연동",
    "contribution": "React 화면과 API 통합, Spring Security·JWT 기반 인증, Redis Refresh Token 관리, JPA·MySQL 연동, 공통 예외 응답 표준화와 챗봇 API 통신을 맡았습니다. 팀 전체 AI 모델 개발과 개인의 서비스 연동 기여는 구분해 설명합니다.",
    "challenge": "도메인별 화면과 서버 API가 늘어나면서 인증 상태와 오류 응답이 화면마다 다르게 처리될 수 있었습니다. 컨트롤러의 개별 예외 처리와 클라이언트의 중복 분기를 줄이고, 양쪽에서 공유할 수 있는 API 규칙을 만드는 데 집중했습니다.",
    "problemSolution": {
      "problem": "서버 오류 응답이 상황마다 달라 프런트엔드에서 화면별 예외 처리와 안내 문구를 반복 구현해야 했습니다.",
      "cause": "개별 컨트롤러의 try-catch 및 런타임 예외 처리 방식이 섞여 있어 공통 오류 응답 규칙이 충분히 통일되지 않았습니다.",
      "approach": "백엔드에 @RestControllerAdvice 기반 GlobalExceptionHandler를 구성하고, 프런트엔드는 Axios Interceptor에서 응답을 공통 처리하도록 정리했습니다.",
      "result": "오류 변환 책임을 서버 공통 계층으로 모으고, 클라이언트는 공통 인터셉터를 통해 처리하게 하여 중복 코드와 API 통신 규칙의 분산을 줄였습니다."
    },
    "features": [
      {
        "title": "부동산 데이터 탐색",
        "text": "실거래·공시지가 등 공공 데이터 조회와 지역·상권 분석 화면을 연결해 사용자가 필요한 정보를 웹에서 탐색하도록 구성했습니다."
      },
      {
        "title": "계정 및 인증",
        "text": "Spring Security·JWT 기반 로그인/회원가입을 구현하고 Redis를 이용해 Refresh Token을 관리했습니다."
      },
      {
        "title": "전세 위험 관련 정보",
        "text": "전세 위험 관련 페이지와 서비스 API를 연결해 거래 전에 살펴볼 정보를 한 서비스에서 확인하도록 구성했습니다. 실제 위험을 보증하거나 판정하는 서비스로 표현하지 않습니다."
      },
      {
        "title": "AI 상담 및 예측 API",
        "text": "FastAPI 기반 법률 문서 검색형 RAG와 챗봇 UI를 연결했습니다. 별도 예측 API와의 통합 작업도 서비스 연결 범위에서 다뤘습니다."
      },
      {
        "title": "공통 통신·오류 처리",
        "text": "도메인별 API 모듈과 Axios Interceptor, GlobalExceptionHandler를 통해 인증·응답·오류 처리 규칙을 공통화했습니다."
      }
    ],
    "flow": [
      "사용자·지역 검색",
      "React 화면",
      "Spring Boot API · 인증",
      "MySQL / Redis",
      "공공 데이터·AI 서비스"
    ],
    "details": [
      {
        "title": "프런트엔드 구조와 API 통신",
        "text": "React 컴포넌트 기반으로 주요 화면을 정리하고 도메인별 API 모듈을 구성했습니다. Axios Interceptor에서 공통 요청·인증·오류 처리를 수행해 각 화면이 개별적으로 같은 로직을 반복하지 않도록 했습니다.",
        "evidence": "React · Axios · Context API"
      },
      {
        "title": "인증과 Refresh Token 관리",
        "text": "Spring Security·JWT 기반 로그인/회원가입 흐름을 구현하고 Redis를 이용해 Refresh Token을 관리했습니다. 사용자 화면과 보호된 API 사이의 인증 상태 전달을 서비스 요청 흐름에 연결했습니다.",
        "evidence": "Spring Security · JWT · Redis"
      },
      {
        "title": "JPA·MySQL 데이터 연동",
        "text": "JPA와 MySQL을 연동해 사용자 및 서비스 기능에서 필요한 데이터 접근 계층을 구성했습니다. API가 데이터베이스 계층을 직접 노출하지 않고 Controller–Service–Repository 구조를 통해 접근하도록 연결했습니다.",
        "evidence": "Java · Spring Boot · JPA · MySQL"
      },
      {
        "title": "공통 예외 응답 표준화",
        "text": "@RestControllerAdvice 기반 GlobalExceptionHandler를 도입해 서버 예외를 공통 응답 형식으로 변환했습니다. 프런트엔드에서는 Axios Interceptor가 표준 응답을 받아 일관된 오류 처리 흐름을 만들도록 구성했습니다.",
        "evidence": "GlobalExceptionHandler · Axios Interceptor"
      },
      {
        "title": "공공 API 및 부동산 화면 통합",
        "text": "공시지가 조회를 위한 VWorld 계열 API 연동, 실거래·상권 분석·전세 위험 관련 화면과 백엔드 서비스 연결 작업에 참여했습니다. 각 화면의 조회 요청과 응답 결과가 사용자 흐름으로 이어지도록 구성했습니다.",
        "evidence": "Public API · REST API"
      },
      {
        "title": "AI 서비스와 챗봇 연동",
        "text": "FastAPI 기반 법률 문서 검색형 RAG API와 챗봇 UI 사이의 통신을 연결했습니다. 검토된 AI 서비스 코드에는 FAISS·BM25 검색 구성과 Ollama 연동이 포함되어 있습니다. 모델 성능 개발 및 검증과 서비스 연동은 별개의 범위로 설명합니다.",
        "evidence": "FastAPI · FAISS · BM25 · Ollama"
      }
    ],
    "outcomes": [
      "React 화면, Spring Boot REST API, 공공 데이터와 AI 서비스 사이의 요청·응답 흐름을 통합했습니다.",
      "JWT 인증과 Redis Refresh Token 관리 기능을 구현했습니다.",
      "JPA·MySQL 데이터 접근과 API 기능을 연결했습니다.",
      "GlobalExceptionHandler와 Axios Interceptor를 통한 공통 오류 처리 구조를 만들었습니다.",
      "부동산 정보 조회·분석 UI와 AI 챗봇 API를 하나의 웹 서비스 흐름으로 연결하는 경험을 쌓았습니다."
    ],
    "learnings": [
      "서비스 통합은 API가 호출되는 것만으로 끝나지 않습니다. 인증, 정상 응답, 오류 응답, 외부 서비스 실패까지 공통 규칙으로 다뤄야 전체 흐름이 일관되게 유지됩니다.",
      "초기 단계에서 API 계약과 오류 응답 규칙을 설계하면 각 화면과 서버 기능이 늘어날 때 유지보수 비용을 줄이는 데 도움이 됩니다."
    ],
    "nextSteps": [
      "API 요청·응답 및 오류 코드 계약을 Swagger/OpenAPI와 테스트로 더 촘촘히 고정합니다.",
      "인증·인가 규칙을 엔드포인트별로 점검하고 외부 API 실패·시간 초과 상황을 통합 테스트합니다.",
      "RAG의 데이터 준비·색인 생성 절차를 문서화하고 검색 품질을 평가할 데이터셋을 마련합니다."
    ],
    "stack": [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Context API",
      "Axios",
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Redis",
      "JPA / Hibernate",
      "MySQL",
      "FastAPI",
      "FAISS",
      "BM25",
      "Ollama"
    ],
    "repo": "https://github.com/kdg311378-star/ZIPHYEONJEON",
    "caveat": "시세 예측 및 RAG 기능은 서비스 통합 범위로 소개합니다. 재현 가능한 평가 데이터와 절차가 확인되지 않은 모델 정확도, 검색 품질, 실제 계약 위험 감소율은 숫자 성과로 주장하지 않습니다.",
    "thumbnail": "/media/ziphyeonjeon-thumbnail.webp",
    "screenshot": "/media/ziphyeonjeon-screenshot.webp",
    "architecture": "/media/ziphyeonjeon-architecture.png",
    "demoUrl": ""
  },
  {
    "id": "tomorrowmarket",
    "order": "02",
    "name": "내일장",
    "english": "TomorrowMarket",
    "dateSort": "2026-08-14",
    "dateLabel": "2026.08.14 – 2026.09.18",
    "eyebrow": "DATA · BACKEND · AI INTEGRATION",
    "subtitle": "주식 정보 · 뉴스 · 예측 대시보드",
    "description": "종목·섹터·뉴스·시장 감성 정보를 모아 예측 API와 시각화 화면으로 연결한 시장 정보 플랫폼입니다. 핵심 기여는 Spring 기반 서비스와 Python 데이터·AI 서비스를 통합하고, 뉴스 수집부터 결과 조회까지 이어지는 흐름을 구성한 것입니다.",
    "background": "종목 가격과 과거 이력, 관련 뉴스, 시장 감성, 예측 결과가 분리되어 있으면 사용자가 한 종목의 맥락을 파악하기 어렵습니다. 서비스 내 서로 다른 데이터와 AI 처리 결과가 API·DB·화면에서 일관되게 이어질 필요가 있었습니다.",
    "goal": "종목·섹터·관심 목록·뉴스를 제공하는 API를 구성하고, 정기 뉴스 수집과 Python 예측 서비스 연동 결과를 저장·조회해 대시보드에서 탐색하도록 연결하는 것이 목표였습니다.",
    "team": "총 3명: 백엔드 및 데이터/AI 서비스 연동 주도 (전체 커밋의 55.1% 기여)",
    "role": "백엔드 · 데이터/AI 서비스 연동",
    "contribution": "인증 및 공통 API 구조, 종목·섹터 조회, 뉴스 수집 스케줄러, Java 예측 클라이언트와 Python 서비스 연동, 기간별 결과 저장, 뉴스 감성 차트와 실데이터 표시 개선에 참여했습니다.",
    "challenge": "뉴스·가격 데이터 수집, 예측 계산, 결과 저장 및 사용자 화면은 서로 다른 구성요소로 나뉘어 있었습니다. 섹터 식별자와 예측 기간 규칙이 서비스마다 달라지거나 비동기 수집 상태가 명확하지 않으면 결과 누락과 화면 불일치가 발생할 수 있어 서비스 간 데이터 계약을 연결하는 데 집중했습니다.",
    "problemSolution": {
      "problem": "뉴스 수집과 예측 서비스가 백엔드·AI 서버·화면으로 나뉘어 있어 정기 작업의 호출, 결과 저장 및 시각화가 하나의 흐름으로 이어져야 했습니다.",
      "cause": "예약 작업, 비동기 AI API, 예측 기간과 섹터 키 매핑, DB 저장 규칙이 여러 구성요소에 분산되어 있었습니다.",
      "approach": "Spring Boot 스케줄러와 Python FastAPI 비동기 수집 API를 연결하고, Java 예측 클라이언트·기간별 결과 저장·화면 탭을 연동했습니다.",
      "result": "뉴스 수집 트리거부터 AI 서비스 호출, 결과 적재, 종목·뉴스 화면 조회까지 통합 흐름을 구성했습니다. 이 결과는 기능 통합의 결과이며, 예측 정확도나 투자 성과를 입증하는 수치와는 구분합니다."
    },
    "features": [
      {
        "title": "종목·섹터 탐색",
        "text": "주식 목록 검색·필터링, 종목 상세 및 과거 시계열, 관심 섹터 및 관심 종목(watchlist) 기능을 백엔드 API와 연결했습니다."
      },
      {
        "title": "뉴스 조회와 감성 통계",
        "text": "뉴스 목록·시장/지표 필터·종목/섹터별 기사 조회 및 최근 기간의 감성 통계와 트렌드를 차트로 보여주는 흐름을 구성했습니다."
      },
      {
        "title": "정기 뉴스 수집",
        "text": "Spring Boot NewsCrawlerScheduler가 하루 두 차례(06:00, 17:00) AI 서비스의 수집 API를 호출하도록 구성하고, FastAPI BackgroundTasks 기반 비동기 처리와 완료 웹훅을 연결했습니다."
      },
      {
        "title": "AI 예측 결과 연동",
        "text": "Java AiPredictionClient와 Python 데이터·예측 서비스의 통신을 연결했습니다. 섹터명 매핑, 기간별 결과 분리 저장, 기준 가격 및 예측 수익률 계산 흐름을 통합했습니다."
      },
      {
        "title": "대시보드 및 라우팅 개선",
        "text": "뉴스 감성 차트의 표현 방식 전환, 일부 홈 화면 목업 데이터의 DB 연동, SPA 새로고침 404 및 CORS preflight 문제를 보완했습니다."
      }
    ],
    "flow": [
      "뉴스·가격 데이터",
      "Spring API / Scheduler",
      "Python 수집·예측 서비스",
      "MySQL 결과 저장",
      "종목·뉴스 대시보드"
    ],
    "details": [
      {
        "title": "인증 및 공통 API 규칙",
        "text": "인증·사용자 기능과 공통 ApiResponse/ErrorCode 기반 응답·예외 처리 구조에 참여했습니다. 검토된 PR에는 JWT 인증, 이메일 인증·비밀번호 재설정, OpenAPI 문서화와 인증 API 테스트 구성 내용이 포함되어 있습니다.",
        "evidence": "Spring Security · JWT · ApiResponse · Swagger/OpenAPI"
      },
      {
        "title": "뉴스·종목·관심 목록 API",
        "text": "뉴스 목록·필터·감성 통계, 종목 검색·상세·과거 시계열, 관심 섹터 등록/해제, 관심 종목 등록/해제 등 도메인 API를 화면과 연결했습니다. 동적 검색과 페이징, DTO 기반 계층 분리를 활용했습니다.",
        "evidence": "Spring Boot · JPA · REST API"
      },
      {
        "title": "접근 로그와 검색 이력",
        "text": "AccessLogInterceptor 및 WebMvcConfig 기반으로 API 접근 정보를 적재하는 흐름, 종목 상세 조회 시 검색 이력을 기록해 이후 조회·재분석 이력에 사용할 수 있는 API를 연결했습니다.",
        "evidence": "Interceptor · AccessLog · Search History"
      },
      {
        "title": "정기 뉴스 크롤링과 비동기 처리",
        "text": "Spring Boot NewsCrawlerScheduler가 정해진 시간에 Python 서비스의 POST /crawl/news를 호출하게 하고, FastAPI BackgroundTasks를 이용한 비동기 크롤링 및 완료 웹훅 연결을 구현했습니다.",
        "evidence": "Spring Scheduler · FastAPI BackgroundTasks · Webhook"
      },
      {
        "title": "예측 API와 결과 적재",
        "text": "Java AiPredictionClient와 Python data_fetcher/예측 서비스 사이의 통신을 보완했습니다. 섹터 한글명을 모델 디렉터리 명칭으로 매핑하고, 단기·중장기 결과를 분리 적재하며 최근 종가 기반 기준 가격 및 예측 수익률 계산 흐름을 연동했습니다.",
        "evidence": "Java Client · Python · Prediction Period Mapping"
      },
      {
        "title": "뉴스 감성 차트와 실데이터 표시",
        "text": "최근 30일 시장 감성 추이를 선/영역 차트 또는 막대 차트로 전환할 수 있도록 UI를 보완했습니다. 홈 화면의 시장 감성 통계·최신 뉴스·인기 검색 정보가 DB 데이터와 연결되도록 수정하고 날짜 포맷과 시세 폴백 흐름을 보완했습니다.",
        "evidence": "React · Charts · DB Integration"
      },
      {
        "title": "SPA 배포 통신 문제 보완",
        "text": "Vercel에서 /login 등 하위 경로를 새로고침할 때 발생하는 404에 대응해 SPA rewrite 설정을 추가하고, Spring Security의 OPTIONS preflight 및 CORS 처리를 보완했습니다.",
        "evidence": "Vercel Rewrite · CORS · Spring Security"
      }
    ],
    "outcomes": [
      "종목·섹터·뉴스·관심 목록 API와 프런트엔드 화면을 연결했습니다.",
      "공통 API 응답·예외 처리와 접근/검색 로그 수집 흐름을 구성했습니다.",
      "예약형 뉴스 수집, 비동기 크롤링 API와 완료 웹훅을 연결했습니다.",
      "Java 예측 클라이언트와 Python 서비스, 기간별 결과 저장 및 종목 상세 탭을 연동했습니다.",
      "뉴스 감성 차트와 홈 화면의 실제 데이터 연결, Vercel SPA 라우팅·CORS 문제를 개선했습니다."
    ],
    "learnings": [
      "API 응답 하나가 성공하는 것만으로 통합이 끝나지 않습니다. 식별자 매핑, 기간 규칙, 저장 행의 수, 차트가 조회하는 API까지 동일한 데이터 계약을 공유해야 합니다.",
      "비동기 작업은 시작 요청, 실제 실행, 완료 알림, 결과 저장의 상태를 구분해야 운영 과정에서 데이터 누락을 파악할 수 있습니다."
    ],
    "nextSteps": [
      "BatchService의 모델명·예상 결과 수 메타데이터가 실제 모델 실행 및 기간별 저장 결과와 일치하도록 정리합니다.",
      "저장소에 포함되지 않은 모델 가중치와 TFT 추론 경로의 placeholder를 해소하고 실행 방법을 문서화합니다.",
      "시계열을 고려한 학습/평가 분리와 재현 가능한 테스트를 추가한 뒤에만 모델 정확도 지표를 공개합니다."
    ],
    "stack": [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "Spring Security",
      "JWT",
      "Python",
      "FastAPI",
      "LightGBM 연동",
      "React",
      "REST API",
      "Scheduler",
      "BackgroundTasks",
      "Vercel"
    ],
    "repo": "https://github.com/kdg311378-star/tomorrowMarket",
    "caveat": "내일장의 실제 프로젝트 착수일은 확인되지 않았고, 여기 표시한 날짜는 검토된 개인 기여 이력에서 확인 가능한 첫 날짜 기준입니다. 저장소에 일부 모델 가중치가 포함되어 있지 않으며 inference_pipeline.py에서 TFT 특성이 0 placeholder로 채워지는 경로가 확인되어, TFT-LightGBM 앙상블 성능·예측 정확도·투자 수익률은 주장하지 않습니다.",
    "thumbnail": "/media/tomorrowmarket-thumbnail.webp",
    "screenshot": "/media/tomorrowmarket-screenshot.webp",
    "architecture": "/media/tomorrowmarket-architecture.png",
    "demoUrl": "https://youtu.be/Q0OXEtNAHGE"
  },
  {
    "id": "goldenstep",
    "order": "03",
    "name": "골든스텝",
    "english": "GoldenStep AI",
    "dateSort": "2026-09-21",
    "dateLabel": "2026.09.21 – 2026.10.05",
    "eyebrow": "AI · GEOSPATIAL · ALGORITHM",
    "subtitle": "초기 실종자 탐색 의사결정 지원 알고리즘",
    "description": "마지막 확인 위치와 경과시간, 실제 보행 도로망을 바탕으로 도달 가능 영역을 계산하고 우선 확인 후보 거점을 제안하는 알고리즘/API 프로젝트입니다. 전문 수색을 대체하기보다 초기 탐색 의사결정을 보조하는 것이 목적입니다.",
    "background": "실종 초기에는 보호자가 주변을 직접 탐색하더라도 어디까지 이동했을지, 실제 보행 가능한 길이 어디로 이어지는지, 무엇을 먼저 확인해야 하는지를 체계적으로 좁히기 어렵습니다. 출발점을 중심으로 단순 원을 그리는 방식만으로는 도로 연결 구조와 보행 제약을 충분히 반영하기 어렵습니다.",
    "goal": "OpenStreetMap 기반 보행 도로망과 마지막 확인 위치·경과시간을 활용해 도달 가능 영역을 여러 단계로 계산하고, 이동 시뮬레이션과 POI 랭킹을 통해 후보 확인 거점을 제안하는 구조를 구현하는 것이 목표였습니다.",
    "team": "총 3명: AI/데이터 엔지니어링 및 코어 연구 1명, 백엔드 1명, 프런트엔드 1명",
    "role": "AI · 데이터 엔지니어링 · 코어 연구",
    "contribution": "공간 네트워크 인프라, 도달 권역 계산 엔진, 가상 에이전트 시뮬레이터, POI 랭킹·공간 분산 엔진, 추론 서빙과 실사례 기반 검증 데이터 구성에 참여했습니다.",
    "challenge": "요청 시마다 대용량 도로망 파일을 파싱하고 정적 도로 속성을 계산하거나, 많은 POI를 선형 탐색하면 응답 지연이 커질 수 있었습니다. 정적 데이터 사전 계산, 서버 시작 시 메모리 적재, 공간 색인을 활용해 반복 연산을 줄이는 방향으로 접근했습니다.",
    "problemSolution": {
      "problem": "2,000개 가상 에이전트의 이동 시뮬레이션을 요청할 때마다 대용량 GraphML 파싱, 방위각 계산, 다수 공간 객체의 반복 탐색이 실행되면 I/O와 CPU 부하가 커집니다.",
      "cause": "도로망의 일부 속성은 정적으로 유지되지만 요청마다 다시 계산될 수 있었고, POI 후보 조회도 전체 목록 선형 탐색에 의존하면 객체 수가 커질수록 연산량이 증가합니다.",
      "approach": "도로망 속성의 사전 계산, 서버 시작 시 그래프 메모리 적재, 건축물 중심점 등 공간 객체에 대한 STRtree 색인을 적용해 요청별 반복 로딩·탐색 부담을 줄였습니다.",
      "result": "정적 데이터 처리와 공간 조회를 최적화하는 구현 구조를 만들었습니다. 단, 고정 응답시간이나 SLA를 주장하려면 동일 데이터와 조건의 최적화 전·후 benchmark가 필요합니다."
    },
    "features": [
      {
        "title": "보행 도로망 구성",
        "text": "OpenStreetMap 기반 보행 도로망을 그래프로 구성하고 노드·엣지 및 이동 관련 속성을 공간 연산의 입력으로 준비합니다."
      },
      {
        "title": "다단계 도달 권역",
        "text": "직선거리 기반 영역과 도로망 접근성을 고려하는 영역을 구분해 계산·비교하고, A1/A2/A3의 결과를 분석에 활용합니다."
      },
      {
        "title": "가상 에이전트 시뮬레이션",
        "text": "다수 에이전트의 이동 샘플을 생성하고 경로·거리·도로 토폴로지에 따른 결과를 후보 거점 평가에 활용합니다. 이 샘플은 실제 개인의 위치 확률로 직접 해석되지 않습니다."
      },
      {
        "title": "후보 POI 랭킹과 분산",
        "text": "도로망 접근성과 시뮬레이션 신호를 기반으로 후보 위치를 점수화하고, 후보가 가까운 곳에 과도하게 집중되지 않도록 공간 분산 단계를 구성합니다."
      },
      {
        "title": "FastAPI 서빙 및 검증",
        "text": "FastAPI 엔드포인트와 배포 자산 흐름을 연결하고, 실사례 체크포인트를 데이터 그룹별로 나눠 결과를 비교하는 검증 틀을 구성했습니다."
      }
    ],
    "flow": [
      "마지막 확인 위치·경과시간",
      "보행 도로망 그래프",
      "A1 / A2 / A3 도달 영역",
      "2,000 에이전트 시뮬레이션",
      "POI 점수화·공간 분산",
      "FastAPI 응답"
    ],
    "details": [
      {
        "title": "공간 네트워크 구성",
        "text": "OSMnx와 NetworkX를 활용해 OpenStreetMap 기반 보행 도로망을 그래프 형태로 구성했습니다. 노드·엣지와 이동 관련 속성을 공간 계산 엔진과 시뮬레이터가 활용할 수 있도록 정리했습니다.",
        "evidence": "OSMnx · NetworkX · Python"
      },
      {
        "title": "도달 권역 계산 엔진",
        "text": "직선거리 기반 영역과 도로망을 고려하는 영역을 구분해 계산·비교하는 코어 로직을 구성했습니다. A1/A2/A3는 서로 다른 공간 계산 및 평가 관점을 비교하는 단계로 설명하며, 반환 geometry의 정확도는 별도 검증 대상으로 둡니다.",
        "evidence": "Shapely · GeoPandas · Spatial Geometry"
      },
      {
        "title": "Monte Carlo 이동 시뮬레이터",
        "text": "가상 에이전트의 이동 과정을 반복 실행해 거리·경로 샘플을 생성하고 후보 위치 평가에 활용하는 구조를 구현했습니다. 검토된 실행 로그에서는 2,000개 에이전트 설정이 확인됩니다.",
        "evidence": "Simulation · NumPy · SciPy"
      },
      {
        "title": "POI 랭킹과 공간 분산",
        "text": "도로망 후보와 시뮬레이션에서 얻은 신호를 바탕으로 후보 거점을 평가하고, 결과가 근접한 몇 곳에만 몰리지 않도록 공간 분산 단계를 연결했습니다. 산출 점수는 모의 표본 기반 평가값이며 실제 존재 확률로 보정되었다고 단정하지 않습니다.",
        "evidence": "POI Ranking · Spatial Diversification"
      },
      {
        "title": "정적 데이터 사전 계산",
        "text": "요청마다 반복될 수 있는 도로망 속성을 전처리하고 그래프에 저장하는 방향으로 구성했습니다. 이를 통해 요청 경로에서 반복되는 파일 파싱과 정적 계산을 줄이는 구조를 만들었습니다.",
        "evidence": "Graph Attributes · Precomputation"
      },
      {
        "title": "공간 색인으로 후보 조회 가속",
        "text": "건축물 중심점 등 공간 객체를 매 요청마다 전수 선형 탐색하기보다 STRtree 기반 공간 색인을 통해 조회할 수 있도록 적용했습니다.",
        "evidence": "STRtree · GeoPandas · Shapely"
      },
      {
        "title": "API 서빙과 배포 연계",
        "text": "FastAPI 추론 엔드포인트를 구성하고 Docker 기반 실행 환경, AWS S3 자산 동기화와 GitHub Actions 배포 흐름을 연결했습니다. 운영 SLA는 별도의 재현 가능한 benchmark로 검증해야 합니다.",
        "evidence": "FastAPI · Docker · AWS S3 · GitHub Actions"
      }
    ],
    "outcomes": [
      "서울권 실행 환경에서 약 165,487개 노드·474,174개 엣지 규모의 보행 도로망을 로드해 공간 분석을 실행했습니다.",
      "2,000개 가상 에이전트 시뮬레이션, 다단계 도달 권역 계산, POI 랭킹·공간 분산을 하나의 API 흐름으로 연결했습니다.",
      "정적 데이터 사전 계산, 메모리 적재, STRtree 공간 인덱스를 이용해 반복 연산 부담을 줄이는 구조를 적용했습니다.",
      "V2/V3 체크포인트를 구분해 결과를 비교하는 검증 틀을 구성하고, 지표·표본 독립성·재현성에 관한 한계를 확인했습니다."
    ],
    "learnings": [
      "지리공간 알고리즘은 면적 집계, 거리 기준, 반환 geometry가 같은 좌표계와 정의를 사용할 때에만 수치와 시각화가 일치합니다.",
      "시뮬레이션 표본 수와 독립 사건 수는 다릅니다. 같은 사건의 후보 좌표 조합을 여러 행으로 만들었다면 모든 행을 독립 사건으로 해석하면 안 됩니다.",
      "알고리즘 자체를 구현하는 것과 실제 사건으로 유효성을 검증하는 것은 별개의 작업이므로, 데이터 생성 과정·지표 정의·평가 스크립트가 함께 재현되어야 합니다."
    ],
    "nextSteps": [
      "거리·버퍼·면적 계산을 적절한 투영 좌표계 기준으로 일원화하고, API 응답 geometry와 산출 면적의 정의를 일치시킵니다.",
      "독립 사건 기준의 validation/test를 확보하고 case_id 단위의 데이터 분리를 적용합니다.",
      "체크포인트 생성 스크립트와 원자료 처리 절차를 포함해 재현 가능한 검증 패키지를 만듭니다.",
      "Hit-Rate·공간 압축률·K-S 통계·응답시간의 정의와 계산 조건을 문서화하고 자동 회귀 테스트를 추가합니다."
    ],
    "validationRows": [
      {
        "group": "V2",
        "records": "191",
        "rate": "145 / 191 · 75.92%",
        "note": "hit_a3_100m 기준"
      },
      {
        "group": "V3 · ARTICLE_SUPPORTED",
        "records": "44",
        "rate": "32 / 44 · 72.73%",
        "note": "기사 근거 기반 그룹"
      },
      {
        "group": "V3 · CANDIDATE_AUGMENTATION",
        "records": "176",
        "rate": "117 / 176 · 66.48%",
        "note": "후보 보강 그룹"
      },
      {
        "group": "V3 전체",
        "records": "220",
        "rate": "149 / 220 · 67.73%",
        "note": "hit_a3_100m 기준"
      }
    ],
    "validationNote": "V2 191행·V3 220행은 독립 사건 수가 아닙니다. 각 그룹에서 고유 case_id는 11개이며, 한 사건의 후보 조합이 여러 행으로 포함되어 있습니다. 검증 데이터 생성 스크립트가 공개 저장소에 모두 포함되어 있지 않아 독립 재현에도 제한이 있습니다. 따라서 기존 자료의 ‘V3 Hit-Rate 75% 이상’ 주장은 현재 체크포인트의 hit_a3_100m 집계(67.73%)와 일치하지 않으며, 확정 성과로 사용하지 않습니다.",
    "stack": [
      "Python 3.11",
      "FastAPI",
      "OSMnx",
      "NetworkX",
      "GeoPandas",
      "Shapely",
      "STRtree",
      "SciPy",
      "NumPy",
      "PyArrow",
      "Fastparquet",
      "Docker",
      "Docker Compose",
      "AWS EC2",
      "AWS S3",
      "AWS Secrets Manager",
      "Amazon ECR",
      "GitHub Actions"
    ],
    "repo": "https://github.com/Hop-Radar/goldenstep-algorithm",
    "caveat": "현재 체크포인트의 일부 지표는 기존 지원서에 기재된 수치와 일치하지 않습니다. 특히 V3 hit_a3_100m은 67.73%입니다. 후보 조합 행을 독립 사건으로 해석하지 않고, 좌표계·반환 geometry·평가 지표와 데이터 생성 절차를 재현 검증한 뒤에만 성능 수치를 대표 성과로 공개합니다.",
    "thumbnail": "/media/goldenstep-thumbnail.webp",
    "screenshot": "/media/goldenstep-screenshot.webp",
    "architecture": "/media/goldenstep-architecture.png",
    "demoUrl": "/media/goldenstep_video.mp4"
  }
].sort((a, b) => a.dateSort.localeCompare(b.dateSort));

const TECH_GROUPS = [
  { id: 'backend', title: 'Backend & API', korean: '백엔드', description: '서비스 로직, 인증·인가, 데이터 영속성, API 설계와 서비스 간 통신', tools: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Redis', 'JPA / Hibernate', 'MySQL', 'Python', 'FastAPI', 'Django', 'REST API'] },
  { id: 'frontend', title: 'Frontend', korean: '프론트엔드', description: '사용자 흐름과 화면 컴포넌트를 구성하고 API와 연결', tools: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Axios', 'Context API', 'Vite', 'Responsive UI', 'NAVER Maps API', 'TMAP API'] },
  { id: 'data', title: 'Data & Applied AI', korean: '데이터 · AI', description: '데이터 수집·가공·공간 분석·검색과 추론 서비스 통합', tools: ['NumPy', 'SciPy', 'Pandas', 'NetworkX', 'OSMnx', 'GeoPandas', 'Shapely', 'LightGBM', 'FAISS', 'BM25', 'Ollama', 'ChromaDB'] },
  { id: 'cloud', title: 'Cloud & Delivery', korean: '클라우드 · 배포', description: '컨테이너 실행 환경, 클라우드 리소스, 빌드·배포 자동화', tools: ['Docker', 'Docker Compose', 'AWS EC2', 'AWS S3', 'Amazon ECR', 'AWS Secrets Manager', 'AWS Lambda', 'Step Functions', 'AWS SAM', 'GitHub Actions'] },
];

const SECTIONS = [
  { id: 'home', label: '처음', small: 'INTRO' },
  { id: 'about', label: '소개', small: 'ABOUT' },
  { id: 'portfolio', label: '포트폴리오', small: 'SELECTED WORK' },
  { id: 'stack', label: '기술 스택', small: 'TOOLKIT' },
  { id: 'contact', label: '연락', small: 'CONTACT' },
];

function Arrow({ dir = 'right' }) {
  return <span aria-hidden="true" className="arrow">{dir === 'left' ? '←' : '→'}</span>;
}

function MediaFrame({ src, title, className = '' }) {
  const [failed, setFailed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isZoomed]);

  if (!src || failed) {
    return (
      <div className={`media-placeholder ${className}`}>
        <span className="placeholder-glyph">＋</span>
        <strong>{title}</strong>
        <small>자료 업로드 예정</small>
        <code>{src || 'public/media/파일명'}</code>
      </div>
    );
  }

  return (
    <>
      <div
        className={`media-frame-clickable ${className}`}
        onClick={() => setIsZoomed(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsZoomed(true); }}
        title="클릭하여 원본 크기로 크게 보기"
      >
        <img className="media-image" src={src} alt={title} onError={() => setFailed(true)} />
        <div className="zoom-hint-badge">
          <span>🔍 크게 보기</span>
        </div>
      </div>

      {isZoomed && (
        <div className="lightbox-backdrop" onClick={() => setIsZoomed(false)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <strong>{title}</strong>
              <div className="lightbox-actions">
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="lightbox-external-btn"
                  title="새 탭에서 원본 해상도로 보기"
                >
                  새 탭에서 열기 ↗
                </a>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setIsZoomed(false)}
                  aria-label="닫기 (Esc)"
                >
                  ✕ 닫기
                </button>
              </div>
            </div>
            <div className="lightbox-body">
              <img className="lightbox-image" src={src} alt={title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MediaUpload({ title, path, accept = 'image/*' }) {
  const [preview, setPreview] = useState('');
  const [kind, setKind] = useState('');
  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);
  const changeFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setKind(file.type);
  };
  return (
    <div className="upload-frame">
      {preview ? (
        kind.startsWith('video/') ? (
          <video src={preview} controls className="upload-preview" />
        ) : kind === 'application/pdf' ? (
          <iframe src={preview} title={title} className="upload-preview" />
        ) : (
          <img src={preview} alt={title} className="upload-preview" />
        )
      ) : (
        <MediaFrame src={path} title={title} />
      )}
      <label className="upload-button">
        {preview ? '파일 변경' : '미리보기 파일 선택'}
        <input type="file" accept={accept} onChange={changeFile} />
      </label>
    </div>
  );
}

function ProjectThumbnail({ project, onOpen }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <button type="button" className="thumbnail-button" onClick={() => onOpen(project)} aria-label={`${project.name} 상세 내용 열기`}>
        <div className={`thumbnail-art art-${project.id}`}>
          <img className="thumbnail-image" src={project.thumbnail} alt={`${project.name} 프로젝트 썸네일`} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
          <span className="thumb-number">{project.order} / 03</span>
          <span className="thumb-motif" aria-hidden="true">{project.id === 'ziphyeonjeon' ? '▥' : project.id === 'tomorrowmarket' ? '↗' : '⌖'}</span>
        </div>
        <div className="project-card-copy">
          <div className="project-card-meta"><span>{project.eyebrow}</span><span>{project.dateLabel}</span></div>
          <h3>{project.name}<span> ↗</span></h3>
          <p className="project-card-subtitle">{project.subtitle}</p>
          <p className="project-card-description">{project.description}</p>
          <div className="card-stack-preview">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </button>
      <div className="project-card-bottom"><span>자세한 내용 보기</span><button type="button" onClick={() => onOpen(project)}>프로젝트 열기 <Arrow /></button></div>
    </article>
  );
}

function ProjectDetail({ project, onBack }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [savedVideoUrl, setSavedVideoUrl] = useState(project.demoUrl || '');
  const [videoError, setVideoError] = useState('');
  useEffect(() => { setVideoUrl(project.demoUrl || ''); setSavedVideoUrl(project.demoUrl || ''); setVideoError(''); }, [project.id, project.demoUrl]);
  const youtubeId = useMemo(() => {
    if (!savedVideoUrl) return '';
    try {
      const url = new URL(savedVideoUrl, window.location.href);
      if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0];
      if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') || url.pathname.match(/\/embed\/([^/]+)/)?.[1] || '';
    } catch { return ''; }
    return '';
  }, [savedVideoUrl]);
  const submitVideo = (event) => {
    event.preventDefault();
    try {
      new URL(videoUrl, window.location.href);
      setSavedVideoUrl(videoUrl);
      setVideoError('');
    } catch { setVideoError('유효한 URL 또는 상대 경로(/media/...)를 입력해 주세요.'); }
  };
  return (
    <div className="project-detail-view">
      <div className="detail-toolbar">
        <button type="button" className="back-button" onClick={onBack}><Arrow dir="left" /> 프로젝트 목록</button>
        <span>PROJECT CASE STUDY / {project.order}</span>
      </div>
      <div className="detail-heading">
        <div>
          <p className="eyebrow">{project.eyebrow} · {project.dateLabel}</p>
          <h2>{project.name}<span className="period">.</span></h2>
          <p className="detail-subtitle">{project.subtitle}</p>
        </div>
        <a className="repo-button" href={project.repo} target="_blank" rel="noreferrer">GitHub 저장소 <Arrow /></a>
      </div>
      <div className="detail-top-grid">
        <div className="detail-story">
          <div className="small-label">PROJECT OVERVIEW</div>
          <p>{project.description}</p>
          <div className="detail-context-grid">
            <article><span className="small-label">BACKGROUND / 문제 배경</span><p>{project.background}</p></article>
            <article><span className="small-label">GOAL / 목표</span><p>{project.goal}</p></article>
          </div>
          <div className="role-block"><div className="small-label">MY ROLE · TEAM</div><p><strong>{project.role}</strong><br />{project.contribution}<br /><span className="team-detail">{project.team}</span></p></div>
          <div className="challenge-block"><div className="small-label">CHALLENGE / 해결해야 했던 문제</div><p>{project.challenge}</p></div>
          <div className="flow-block"><div className="small-label">SYSTEM FLOW / 요청부터 결과까지</div><div className="flow-line">{project.flow.map((step, i) => <div key={step} className="flow-node"><span>{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong>{i < project.flow.length - 1 && <i>→</i>}</div>)}</div></div>
        </div>
        <div className="detail-media-stack">
          <div className="detail-media-large"><MediaFrame src={project.screenshot} title={`${project.name} 서비스 화면`} /></div>
          <div className="detail-media-caption">PRODUCT SCREEN & SYSTEM DESIGN</div>
          <div className="detail-architecture"><div className="small-label">SYSTEM ARCHITECTURE & ERD</div><MediaFrame src={project.architecture} title={`${project.name} 시스템 아키텍처`} /></div>
        </div>
      </div>

      <div className="detail-section-heading"><div><div className="small-label">KEY FEATURES</div><h3>무엇을 할 수 있는가</h3></div><span>PRODUCT FLOW</span></div>
      <div className="feature-detail-grid">{project.features.map((feature, index) => <article className="feature-detail-card" key={feature.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{feature.title}</h4><p>{feature.text}</p></div></article>)}</div>

      <div className="detail-section-heading"><div><div className="small-label">IMPLEMENTATION</div><h3>핵심 구현과 기술적 선택</h3></div><span>WHAT I BUILT</span></div>
      <div className="implementation-cards">{project.details.map((detail, index) => <article className="implementation-card" key={detail.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{detail.title}</h4><p>{detail.text}</p>{detail.evidence && <small className="implementation-evidence">{detail.evidence}</small>}</div></article>)}</div>

      <div className="detail-section-heading"><div><div className="small-label">PROBLEM → APPROACH → RESULT</div><h3>문제 해결 과정</h3></div></div>
      <div className="problem-solution-grid">
        <article><span>01 / PROBLEM</span><h4>문제</h4><p>{project.problemSolution.problem}</p></article>
        <article><span>02 / ROOT CAUSE</span><h4>원인</h4><p>{project.problemSolution.cause}</p></article>
        <article><span>03 / APPROACH</span><h4>해결 방법</h4><p>{project.problemSolution.approach}</p></article>
        <article><span>04 / RESULT</span><h4>결과</h4><p>{project.problemSolution.result}</p></article>
      </div>

      <div className="detail-section-heading"><div><div className="small-label">OUTCOMES & LEARNINGS</div><h3>결과와 배운 점</h3></div></div>
      <div className="outcome-learning-grid">
        <article className="detail-list-panel"><h4>구현 결과</h4><ul>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="detail-list-panel learning-panel"><h4>회고</h4><ul>{project.learnings.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>

      <div className="detail-section-heading"><div><div className="small-label">NEXT ITERATION</div><h3>다음 개선 과제</h3></div></div>
      <div className="next-step-list">{project.nextSteps.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>

      {project.validationRows && (
        <>
          <div className="detail-section-heading"><div><div className="small-label">VALIDATION SNAPSHOT</div><h3>현재 검증 체크포인트</h3></div><span>METRIC DEFINITIONS MATTER</span></div>
          <div className="validation-table-wrap">
            <table className="validation-table">
              <thead><tr><th>그룹</th><th>레코드</th><th>hit_a3_100m</th><th>비고</th></tr></thead>
              <tbody>{project.validationRows.map((row) => <tr key={row.group}><td>{row.group}</td><td>{row.records}</td><td>{row.rate}</td><td>{row.note}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="validation-note">{project.validationNote}</p>
        </>
      )}

      <div className="detail-section-heading stack-detail-heading"><div><div className="small-label">TECH STACK</div><h3>사용 기술과 프레임워크</h3></div></div>
      <div className="detail-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-disclosure"><strong>성과 및 검증 범위</strong><p>{project.caveat}</p></div>
      <div className="demo-section">
        <div className="demo-header">
          <div className="small-label">DEMO / WALKTHROUGH</div>
          <h3>시연 영상</h3>
          <p>프로젝트의 실제 동작 화면과 검증된 시연 흐름입니다.</p>
        </div>
        <div className="demo-content">
          {youtubeId ? (
            <div className="video-embed">
              <iframe
                title={`${project.name} 시연 영상`}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : project.demoUrl ? (
            <div className="video-embed">
              <video
                src={project.demoUrl}
                controls
                playsInline
                className="video-player"
              />
            </div>
          ) : (
            <div className="media-placeholder">
              <span className="placeholder-glyph">▶</span>
              <strong>시연 영상 등록 예정</strong>
              <small>영상 촬영 및 업로드 후 추가될 예정입니다.</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeSection({ navigate }) {
  return (
    <div className="home-layout">
      <div className="home-copy">
        <div className="eyebrow"><span className="status-dot" /> BACKEND · DATA ENGINEERING · APPLIED AI</div>
        <p className="hello">안녕하세요, 김동규입니다.</p>
        <h1>데이터와 AI를 연결해,<br /><em>실제 문제를 풉니다.</em></h1>
        <p className="home-description">백엔드 API, 데이터 흐름과 AI 기능을 하나의 제품으로 연결합니다. 구현부터 검증까지 설명할 수 있는 시스템을 지향합니다.</p>
        <div className="home-actions">
          <button className="primary-button" onClick={() => navigate('portfolio')}>포트폴리오 보기 <Arrow /></button>
          <button className="plain-button" onClick={() => navigate('about')}>저에 대해 <Arrow /></button>
        </div>
        <div className="home-stats">
          <div><strong>03</strong><span>SELECTED PROJECTS</span></div>
          <div><strong>API</strong><span>SERVICE INTEGRATION</span></div>
          <div><strong>AI</strong><span>DATA & ALGORITHMS</span></div>
        </div>
      </div>
      <div className="home-art" aria-hidden="true">
        <div className="home-orbit orbit-a" />
        <div className="home-orbit orbit-b" />
        <div className="home-orbit orbit-c" />
        <div className="home-orbit-core">✳</div>
        <span className="orbit-caption top">INPUT → PROCESS</span>
        <span className="orbit-caption bottom">PROCESS → VALUE</span>
      </div>
      <div className="home-footline">
        <span>PERSONAL PORTFOLIO / 2026</span>
        <span>USE ARROW KEYS TO NAVIGATE</span>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="section-content about-content">
      <div className="section-heading">
        <div>
          <div className="eyebrow">01 / ABOUT ME</div>
          <h2>만드는 것만큼<br /><em>이유와 근거를 중요하게 생각합니다.</em></h2>
        </div>
        <p className="section-lead">자기소개와 가치관, 백엔드와 데이터 엔지니어링 역량을 바탕으로 실제 문제를 해결한 경험을 공유합니다.</p>
      </div>
      <div className="about-main">
        <div className="about-story">
          <p className="about-statement">“좋은 시스템은 기술을 붙이는 데서 끝나지 않고, 각 구성요소가 실제 흐름 안에서 함께 동작할 때 완성됩니다.”</p>
          <p>{PROFILE.introduction}</p>
          
          <div className="value-cards">
            <article>
              <span>01 / VALUE</span>
              <h3>근거 중심</h3>
              <p>성과를 말할 때 코드, 테스트, 입력 데이터와 산출 기준을 함께 살핍니다. 재현하지 못한 수치를 성과로 단정하지 않습니다.</p>
            </article>
            <article>
              <span>02 / APPROACH</span>
              <h3>시스템 관점</h3>
              <p>화면·API·데이터·모델·인프라가 연결되는 전체 흐름과 각 구성요소의 책임 경계를 함께 고려합니다.</p>
            </article>
            <article>
              <span>03 / PRACTICE</span>
              <h3>끝까지 통합</h3>
              <p>분리된 구성요소가 실제 요청과 응답에서 동작하도록 연결하고, 부족한 부분을 확인하며 개선합니다.</p>
            </article>
          </div>

          <div className="experience-strip">
            <div className="small-label">PROJECT TIMELINE & ROLES</div>
            <div className="experience-list">
              {PROJECTS.map((project) => (
                <div className="experience-row" key={project.id}>
                  <time>{project.dateLabel}</time>
                  <strong>{project.name}</strong>
                  <span>{project.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="about-aside">
          <div className="profile-card">
            <div className="profile-photo-wrap">
              <img src="/media/profile.png" alt="김동규 프로필 사진" className="profile-photo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="profile-badge">KIM DONG GYU</div>
            </div>
            <div className="profile-meta-info">
              <div className="small-label">PROFILE & QUALIFICATIONS</div>
              <dl>
                <div>
                  <dt>학력</dt>
                  <dd>
                    <strong>국립목포대학교 생명과학과</strong><br />
                    <span>2019.03 – 2027.02 (졸업예정 · 학점 3.83/4.5)</span>
                  </dd>
                </div>
                <div>
                  <dt>교육</dt>
                  <dd>
                    <strong>[KDT] 빅데이터 분석 & AI SW개발자 양성</strong><br />
                    <span>더조은컴퓨터아카데미 종로 · 1,050시간 수료</span>
                  </dd>
                </div>
                <div>
                  <dt>자격</dt>
                  <dd className="cert-list">
                    <div className="cert-item">
                      <strong>SQL개발자 (SQLD)</strong>
                      <span>한국데이터산업진흥원 · 2026.03</span>
                    </div>
                    <div className="cert-item">
                      <strong>정보처리기사 (필기)</strong>
                      <span>한국산업인력공단 · 2026.09</span>
                    </div>
                    <div className="cert-item">
                      <strong>빅데이터분석기사 (필기)</strong>
                      <span>한국데이터산업진흥원 · 2026.09</span>
                    </div>
                    <div className="cert-item">
                      <strong>한국사능력검정시험 (1급)</strong>
                      <span>국사편찬위원회 · 2022.02</span>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt>연락처</dt>
                  <dd>
                    <a href={`mailto:${PROFILE.email}`} className="profile-email-link">{PROFILE.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const [selected, setSelected] = useState(null);
  const rail = useRef(null);
  const moveRail = (direction) => {
    const card = rail.current?.querySelector('.project-card');
    rail.current?.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 420) + 22), behavior: 'smooth' });
  };
  return (
    <div className="section-content portfolio-content">
      {selected ? (
        <ProjectDetail project={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <div className="section-heading portfolio-heading">
            <div>
              <div className="eyebrow">02 / SELECTED WORK</div>
              <h2>만든 결과와<br /><em>그 안의 문제 해결 과정.</em></h2>
            </div>
            <p className="section-lead">프로젝트 카드를 선택하면 문제 정의부터 담당 역할, 구현 방식, 시스템 구조와 기술적 판단까지 자세히 볼 수 있습니다.</p>
          </div>
          <div className="portfolio-rail-head">
            <span>{PROJECTS.length} PROJECTS <i /> 시작 시점 기준 오름차순</span>
            <div className="rail-buttons">
              <button type="button" onClick={() => moveRail(-1)} aria-label="이전 프로젝트">←</button>
              <button type="button" onClick={() => moveRail(1)} aria-label="다음 프로젝트">→</button>
            </div>
          </div>
          <div className="project-rail" ref={rail}>
            {PROJECTS.map((project) => (
              <ProjectThumbnail key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>
          <div className="rail-hint">카드를 누르면 이 섹션 안에서 상세 내용으로 이동합니다 <span>← →</span></div>
        </>
      )}
    </div>
  );
}

function StackSection() {
  const [active, setActive] = useState(0);
  const group = TECH_GROUPS[active];
  const move = (direction) => setActive((current) => (current + direction + TECH_GROUPS.length) % TECH_GROUPS.length);
  return (
    <div className="section-content stack-content">
      <div className="section-heading">
        <div>
          <div className="eyebrow">03 / TOOLKIT</div>
          <h2>기술도 하나씩,<br /><em>쓰임에 따라 살펴봅니다.</em></h2>
        </div>
        <p className="section-lead">프로젝트에서 사용한 기술을 역할별로 나눴습니다. 범주를 좌우로 넘겨 확인하고, 실제 숙련도를 입증하는 근거가 없는 점수나 레벨은 표시하지 않았습니다.</p>
      </div>
      <div className="stack-carousel">
        <div className="stack-carousel-top">
          <span>{String(active + 1).padStart(2, '0')} / {String(TECH_GROUPS.length).padStart(2, '0')}</span>
          <div className="stack-categories">
            {TECH_GROUPS.map((item, i) => (
              <button className={active === i ? 'active' : ''} key={item.id} onClick={() => setActive(i)}>
                {item.korean}
              </button>
            ))}
          </div>
          <div className="rail-buttons">
            <button type="button" onClick={() => move(-1)} aria-label="이전 기술 범주">←</button>
            <button type="button" onClick={() => move(1)} aria-label="다음 기술 범주">→</button>
          </div>
        </div>
        <article className="stack-feature" key={group.id}>
          <div className="stack-number">0{active + 1}</div>
          <div className="stack-feature-copy">
            <p className="eyebrow">{group.title}</p>
            <h3>{group.korean}<span> / {group.title}</span></h3>
            <p>{group.description}</p>
            <div className="tool-pills">
              {group.tools.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="stack-visual" aria-hidden="true">
            <div className="stack-visual-ring ring-1" />
            <div className="stack-visual-ring ring-2" />
            <div className="stack-visual-center">
              {group.id === 'backend' ? '{ }' : group.id === 'frontend' ? '◫' : group.id === 'data' ? '⌘' : '☁'}
            </div>
            <div className="stack-visual-label">{group.id.toUpperCase()}</div>
          </div>
        </article>
        <div className="stack-carousel-footer">
          <div className="stack-dots">
            {TECH_GROUPS.map((item, i) => (
              <button
                key={item.id}
                aria-label={`${item.korean} 기술 보기`}
                className={i === active ? 'active' : ''}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <span>좌우 버튼을 눌러 기술 범주 이동</span>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="section-content contact-content">
      <div className="eyebrow">04 / CONTACT</div>
      <div className="contact-layout">
        <div>
          <h2>다음 문제를<br /><em>함께 해결하고 싶습니다.</em></h2>
          <p className="section-lead">
            새로운 기회와 기술적 도전에 열려 있습니다. 프로젝트 코드와 세부 구현은 GitHub에서, 협업 및 채용 관련 문의는 아래 이메일로 연락 부탁드립니다.
          </p>
          <div className="contact-actions">
            <a className="primary-button inline-button" href={`mailto:${PROFILE.email}`}>
              이메일 보내기 ({PROFILE.email}) <Arrow />
            </a>
            <a className="plain-button inline-button" href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub 프로필 열기 <Arrow />
            </a>
          </div>
        </div>
        <div className="contact-card">
          <span>WHAT I FOCUS ON</span>
          <strong>Backend.<br />Data.<br /><em>Applied AI.</em></strong>
          <p>문제를 정의하고, 흐름을 연결하고, 근거로 결과를 확인합니다.</p>
        </div>
      </div>
      <div className="contact-bottom">
        <span>KIM DONG GYU / PORTFOLIO</span>
        <span>BACKEND · DATA · APPLIED AI</span>
      </div>
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  const sectionRefs = useRef({});
  const stageRef = useRef(null);
  const activeSection = SECTIONS[activeIndex];

  const navigate = useCallback((idOrIndex) => {
    const index = typeof idOrIndex === 'number'
      ? Math.max(0, Math.min(SECTIONS.length - 1, idOrIndex))
      : Math.max(0, SECTIONS.findIndex((section) => section.id === idOrIndex));
    setActiveIndex(index);
    if (window.matchMedia('(max-width: 760px)').matches) {
      requestAnimationFrame(() => sectionRefs.current[SECTIONS[index].id]?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else if (stageRef.current) {
      stageRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (!isMobile) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const index = SECTIONS.findIndex((section) => `section-${section.id}` === visible.target.id);
        if (index >= 0) setActiveIndex(index);
      }
    }, { threshold: [0.25, 0.45, 0.65] });
    Object.values(sectionRefs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); navigate(activeIndex + 1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); navigate(activeIndex - 1); }
      if (event.key === 'Home') navigate(0);
      if (event.key === 'End') navigate(SECTIONS.length - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, navigate]);

  const components = {
    home: <HomeSection navigate={navigate} />,
    about: <AboutSection />,
    portfolio: <PortfolioSection />,
    stack: <StackSection />,
    contact: <ContactSection />
  };

  return (
    <main className={`portfolio ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')} aria-label="처음으로">
          DK<span>®</span><small>PORTFOLIO</small>
        </button>
        <nav className="topnav" aria-label="포트폴리오 섹션">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => navigate(index)}
              aria-current={index === activeIndex ? 'page' : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="top-count">
          <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
          <span> / {String(SECTIONS.length).padStart(2, '0')}</span>
        </div>
      </header>
      <div className="progress-track">
        <span style={{ width: `${((activeIndex + 1) / SECTIONS.length) * 100}%` }} />
      </div>
      <div className="slide-stage" id="slide-stage" ref={stageRef}>
        {SECTIONS.map((section, index) => (
          <section
            id={`section-${section.id}`}
            className={`slide slide-${section.id} ${activeIndex === index ? 'active' : ''}`}
            key={section.id}
            ref={(node) => { sectionRefs.current[section.id] = node; }}
            aria-hidden={!isMobile && activeIndex !== index}
          >
            <div className="slide-inner">{components[section.id]}</div>
          </section>
        ))}
      </div>
      {!isMobile && (
        <footer className="slide-footer">
          <span className="footer-chapter">{activeSection.small}<i /> KIM DONG GYU</span>
          <span className="keyboard-hint">← → 이동 · Home / End 처음과 끝</span>
          <div className="footer-controls">
            <button onClick={() => navigate(activeIndex - 1)} disabled={activeIndex === 0}>← 이전</button>
            <button className="next" onClick={() => navigate(activeIndex + 1)} disabled={activeIndex === SECTIONS.length - 1}>
              다음 <Arrow />
            </button>
          </div>
        </footer>
      )}
    </main>
  );
}

export default App;
