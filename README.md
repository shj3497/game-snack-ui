## 프로젝트 소개

Game-snack UI는 다양한 미니게임 이벤트에 앞서 광고를 시청한 뒤 게임에 참여해 포인트(리워드)를 획득할 수 있도록 설계된 프런트엔드 애플리케이션입니다. 사용자의 참여 가능 여부 확인, 게임 결과 기록, 포인트 지급 등 모든 비즈니스 로직은 백엔드 API와 연동하여 처리됩니다.

- **핵심 플로우**

  1. 이벤트 인트로 진입(`/event/*`)
  2. 광고 요청 및 노출(AdPopcorn, Mezzo Media, Dawin, Google Publisher Tag)
  3. 광고 시청 완료 확인 → 참여 버튼 활성화
  4. 게임 참여 및 결과 산출(Win/Fail)
  5. 결과/리워드 서버 반영 → 결과 페이지 노출

- **주요 기능**

  - 이벤트/게임: `catch-second`, `draw-second`, `find-second`, `roulette`
  - 광고 연동: 매체 스크립트 로드 및 예외 대응(광고 미노출 시 대체 처리)
  - 데이터 관리: React Query 기반 비동기 상태관리, Axios 커스텀 인스턴스(요청 취소/쿼리스트링 배열 처리)
  - UI/UX: MUI + Emotion 테마, Framer Motion 전환, 디버그 도구(`DebugDrawer`, `AdDebugDrawer`)

- **기술 스택**

  - 앱: React 19, TypeScript, Vite
  - UI: MUI 7, Emotion, Framer Motion
  - 상태/폼: React Query 5, Zustand, React Hook Form + Zod
  - 품질/도구: ESLint, Prettier, Vitest, Storybook, Orval(OpenAPI 코드 생성)

- **라우팅 개요**

  - `/` 메인(지연 로딩)
  - `/event/*` 게임 인트로/참여/결과(레이아웃 기반 중첩 라우팅)

- **관련 경로 참고**
  - 라우팅: `src/router.tsx`, `src/pages/event/*`
  - 광고 스크립트: `src/components/_organisms/ad/**`, 엔트리 주입 `src/main.tsx`
  - API 연동: `src/lib/service/custom-axios.ts`, 모델/클라이언트 `src/lib/service/api/**`, `orval.config.cjs`


### 운영서버
www.game-snack.co.kr
