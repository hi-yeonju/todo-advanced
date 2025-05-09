

# 📝 Todo App (React + React Query + TypeScript)

### 핵심 변경 사항:
1. **MSW 설정**:
   - `src/mocks/handlers.ts`에 API 핸들러 정의
   - `src/mocks/server.ts`에서 MSW 서버 설정
2. **개발 환경에서 `msw` 사용법**:
   - `msw`가 API 요청을 실제 서버로 보내는 대신, 정의된 핸들러를 통해 응답을 반환하도록 설정합니다.

`msw`를 통해 API를 모킹하면 로컬 개발 환경에서 실제 서버 없이도 테스트할 수 있어 매우 유용합니다.

---

간단한 투두 리스트 앱입니다.  
React Query를 활용해 API와의 상태 동기화를 처리하고 있으며,  
추가, 수정, 삭제, 체크 기능이 구현되어 있습니다.

### 커밋 메시지 규칙
본 프로젝트에서는 다음과 같은 커밋 메시지 형식을 사용합니다:

1. **feat**: 새로운 기능 추가
   - 예시: `feat: Add Todo item creation functionality`
   
2. **fix**: 버그 수정
   - 예시: `fix: Resolve issue with empty input field in Todo form`

3. **docs**: 문서 수정
   - 예시: `docs: Update README with project setup instructions`

4. **style**: 코드 스타일 수정 (실행에 영향을 미치지 않는 변경)
   - 예시: `style: Adjust spacing in Todo list component`

5. **refactor**: 코드 리팩토링
   - 예시: `refactor: Refactor Todo list rendering logic`

6. **test**: 테스트 코드 추가/수정
   - 예시: `test: Add unit tests for Todo creation`

7. **chore**: 그 외 변경 사항 (빌드 프로세스, 패키지 업데이트 등)
   - 예시: `chore: Update dependencies`

### 사용 예시
- `feat: Add Todo item creation functionality`
- `fix: Resolve issue with empty input field in Todo form`


## 🚀 데모

(작성한 후 GitHub Pages 혹은 Vercel 배포 링크 추가)

예시: [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)

<br/>

## ⚙️ 사용 기술

- React (with Server Components)
- TypeScript
- React Query (tanstack/query)
- MSW (Mock Service Worker)
- Tailwind CSS
- API 라우트 기반 REST API (`/api/todos`)

<br/>

## 📂 폴더 구조
```
src/
├── app/
│ └── todo/
│ ├── Todo_list.tsx // 메인 컴포넌트
│ └── Todo_article.tsx // 각 Todo 항목 컴포넌트
├── lib/
│ └── fetcher.ts // 공통 fetch 유틸리티
├── mocks/
│ └── handlers.ts // MSW 핸들러 설정
│ └── server.ts // MSW 서버 설정
├── type/
│ └── todo.ts // Todo 타입 정의
```

## ✅ 기능

- [x] 할 일 추가
- [x] 체크박스를 통한 상태 업데이트
- [x] 드롭다운 메뉴로 편집 및 삭제
- [x] 체크 여부에 따른 정렬
- [x] 입력 필드 포커스, UX 세부 처리



## 🧪 실행 방법

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```
`msw`는 개발 환경에서만 동작하며, 실제 서버와 통신하는 방식 대신 로컬에서 API 요청을 모킹합니다.

3. msw 서버 설정
`src/mocks/server.ts`에서 MSW 서버를 설정하고,
`src/mocks/handlers.ts`에서 각 API 요청에 대한 응답을 설정합니다.

- 서버 시작: msw는 앱 시작 시 자동으로 서버를 시작하고, 요청을 가로채어 모킹된 응답을 반환합니다.

## ✨ 개발 의도
React Query: 상태 동기화 및 데이터 fetching 관리

MSW: 실제 API 서버 없이 로컬에서 API를 모킹하여 빠른 개발 환경 구성

폴더 구조: 프로젝트를 기능별로 나누어 관리하고, 유지 보수성을 높임

간단한 UI/UX: 사용자가 쉽게 할 일을 추가하고 관리할 수 있는 직관적인 UI 

## 📌 개선 포인트 (TODO)
 Drag & Drop 기능

 체크 시 애니메이션 추가

 모달 또는 confirm 컴포넌트 분리

 Zustand나 Context API 비교 적용

 테스트 코드(Jest, RTL) 도입

## 🧑‍💻 만든이
Yeonju
FE Developer
GitHub: github.com/hi-yeonju