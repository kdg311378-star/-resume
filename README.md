# 김동규 — Data, Backend & Applied AI Portfolio

React + Vite로 만든 반응형 개인 포트폴리오입니다. 기존 포트폴리오 템플릿을 실제 공개 GitHub 저장소와 확인된 기여 내역을 기준으로 완성했습니다.

## 실행

```bash
npm install
npm run dev
```

배포용 빌드와 로컬 확인:

```bash
npm run build
npm run preview
```

## Vercel 배포

1. 이 프로젝트를 새 GitHub 저장소에 push합니다.
2. Vercel에서 해당 저장소를 Import합니다.
3. Framework Preset은 `Vite`, Build Command는 `npm run build`, Output Directory는 `dist`로 둡니다.
4. Node.js 빌드 환경에서 설치 및 빌드가 성공하는지 확인합니다.
5. 배포 후 모바일/데스크톱 너비, 상세 모달, 프로젝트 필터, GitHub 링크, 키보드 조작을 점검합니다.

## 화면과 기능

- 상단 내비게이션과 모바일 메뉴
- 프로젝트 카테고리 필터
- 프로젝트별 상세 모달 (Esc 키 / 바깥 영역 클릭으로 닫기)
- 프로젝트별 GitHub 링크
- 역할별 기술 스택, 작업 원칙, 연락 링크
- 모바일 반응형 및 `prefers-reduced-motion` 대응

## 프로젝트 설명 원칙

- GoldenStep AI, 집현전, TomorrowMarket, Eco Encyclopedia, Data Collection Pipeline의 공개 저장소와 감사 결과를 토대로 작성했습니다.
- 테스트 또는 체크포인트에서 재현되지 않은 정확도·성공률·SLA를 표시하지 않습니다.
- 집현전 공개 저장소의 API 키 노출 문제가 해소되기 전까지는 포트폴리오에서 해당 저장소 링크를 숨겼습니다. 이 조치는 저장소 자체를 비공개로 만드는 것이 아니므로 키 폐기·재발급과 Git 이력 정리가 별도로 필요합니다.
- 이 포트폴리오는 개인 프로젝트 소개용 정적 사이트이며, 백엔드·분석 API·데이터베이스를 포함하지 않습니다.

## 주요 파일

- `src/App.jsx`: 콘텐츠, 프로젝트 데이터, 카드, 필터, 상세 모달
- `src/styles.css`: 디자인 시스템, 프로젝트 비주얼, 반응형 스타일
- `index.html`: 문서 메타데이터 및 Vite 진입점
