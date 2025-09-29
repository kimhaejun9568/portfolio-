# 주예수 개인 포트폴리오 & 블로그

Next.js 14 (App Router)와 TypeScript를 활용하여 구축한 개인 포트폴리오 웹사이트입니다.

## ✨ 주요 기능

- **모던 기술 스택**: Next.js 14, TypeScript, Tailwind CSS
- **MDX 블로그**: 코드 하이라이팅, 목차 자동 생성, 태그 시스템
- **다크 모드**: 시스템 설정에 따른 자동 전환
- **반응형 디자인**: 모든 기기에서 최적화된 경험
- **SEO 최적화**: 메타 태그, 구조화된 데이터, 사이트맵
- **웹 접근성**: WCAG 2.1 가이드라인 준수
- **성능 최적화**: Core Web Vitals 95+ 점수 목표

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18.17+ 
- pnpm (권장) 또는 npm

### 로컬 개발 환경 설정

1. **저장소 클론**
   ```bash
   git clone https://github.com/juyesu/portfolio.git
   cd portfolio
   ```

2. **의존성 설치**
   ```bash
   pnpm install
   # 또는
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   cp env.example .env.local
   # .env.local 파일을 편집하여 필요한 값들을 설정하세요
   ```

4. **개발 서버 실행**
   ```bash
   pnpm dev
   # 또는
   npm run dev
   ```

5. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 📁 프로젝트 구조

```
├── app/                    # Next.js 14 App Router
│   ├── (site)/            # 메인 사이트 레이아웃
│   ├── blog/              # 블로그 페이지들
│   ├── projects/          # 프로젝트 페이지
│   ├── talks/             # 발표 페이지
│   ├── now/               # /now 페이지
│   └── uses/              # 사용 도구 소개
├── components/            # 재사용 가능한 컴포넌트들
├── content/               # MDX 콘텐츠 파일들
│   ├── posts/            # 블로그 글들
│   └── pages/            # 정적 페이지들
├── lib/                   # 유틸리티 함수들
├── public/               # 정적 파일들
└── styles/               # 전역 스타일 파일들
```

## ✍️ 블로그 글 작성하기

### 새 글 생성
```bash
pnpm post:new
# 또는
npm run post:new
```

이 명령어는 날짜와 슬러그가 자동으로 생성된 새 MDX 파일을 만들어줍니다.

### 수동으로 글 생성
`content/posts/` 디렉토리에 새 `.mdx` 파일을 생성하고 다음과 같은 front matter를 추가하세요:

```markdown
---
title: "글 제목"
date: "2024-01-15"
description: "글 설명"
tags: ["Next.js", "React", "TypeScript"]
cover: "/images/posts/cover-image.jpg" # 선택사항
draft: false # true로 설정시 프로덕션에서 숨김
---

여기에 글 내용을 작성하세요...
```

### 사용 가능한 MDX 컴포넌트

```markdown
# 표준 Markdown 문법 지원

## 커스텀 콜아웃
<Note>
이것은 노트 박스입니다.
</Note>

<Warning>
이것은 경고 박스입니다.
</Warning>

<Error>
이것은 오류 박스입니다.
</Error>

<Success>
이것은 성공 박스입니다.
</Success>
```

## 🎨 커스터마이징

### 색상 테마 변경
`tailwind.config.js`에서 색상 팔레트를 수정할 수 있습니다.

### 폰트 변경
`app/layout.tsx`에서 Google Fonts를 변경할 수 있습니다.

### 소셜 링크 수정
`components/footer.tsx`와 `app/(site)/page.tsx`에서 소셜 미디어 링크를 수정하세요.

## 📊 분석 도구 설정

### Vercel Analytics
Vercel에 배포하면 자동으로 활성화됩니다.

### Google Analytics
```bash
# .env.local에 추가
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Plausible Analytics
```bash
# .env.local에 추가
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 🚀 배포

### Vercel (권장)
1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 완료!

### 기타 플랫폼
```bash
# 정적 빌드 생성
pnpm build

# 빌드 결과 확인
pnpm start
```

## 🔧 개발 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과 실행
pnpm start

# 타입 체크
pnpm typecheck

# 린터 실행
pnpm lint

# 새 블로그 글 생성
pnpm post:new
```

## 🧪 성능 및 품질 체크

### Lighthouse 감사
```bash
# Chrome DevTools에서 Lighthouse 실행
# 또는 CLI 사용:
npx lighthouse http://localhost:3000 --view
```

### 번들 크기 분석
```bash
# 번들 분석기 실행
npm run analyze
```

## 🤝 기여하기

버그 리포트나 기능 제안은 언제나 환영합니다!

1. 이슈 등록
2. Fork 후 브랜치 생성
3. 변경사항 커밋
4. Pull Request 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자유롭게 사용하세요!

## 📞 연락처

- **이메일**: hello@juyesu.dev
- **GitHub**: [@juyesu](https://github.com/juyesu)
- **Twitter**: [@juyesu_dev](https://twitter.com/juyesu_dev)
- **LinkedIn**: [juyesu](https://linkedin.com/in/juyesu)

---

이 프로젝트가 도움이 되었다면 ⭐를 눌러주세요!
