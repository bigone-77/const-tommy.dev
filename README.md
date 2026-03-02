<p align="center">
  <a href="https://www.const-tommy.dev/">
    <img width="2816" height="1536" alt="tommy-thumbnail" src="https://github.com/user-attachments/assets/c84c4f67-a4c8-453d-ae83-db48c865abd9" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-DEVELOPING-blue?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Featured-Amber?style=for-the-badge&color=FFBF00" alt="Featured" />
</p>

<h1 align="center">const-tommy.dev</h1>

<p align="center">
  <b>세상에 하나뿐인 개발자 Tommy의 지식 아카이빙 시스템</b>
</p>

<p align="center">
  <a href="https://www.const-tommy.dev">
    <img src="https://img.shields.io/badge/라이브_데모-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/bigone-77/const-tommy.dev">
    <img src="https://img.shields.io/badge/GitHub_저장소-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

---

### ℹ️ Project Info

| 📅 진행 기간       | 🛠 핵심 기술                                                            |
| :----------------- | :---------------------------------------------------------------------- |
| **2026.01 - 현재** | `Next.js 15`, `GraphQL`, `Apollo`, `Prisma`, `Tailwind CSS`, `Fumadocs` |

---

## 1. 🥸 프로젝트 기획 배경

> **세상에 하나뿐인 오직 나만의 지식 아카이빙 공간이 있었으면**

평소 벨로그나 티스토리 같은 플랫폼을 사용해왔지만, 블로그 기능만으로는 아쉬움이 있었습니다. 단순히 글을 쓰는 곳을 넘어 **TIL, 포트폴리오, 그리고 이력서**까지 제가 필요한 모든 데이터를 한곳에 모아 관리하고 보여줄 수 있는 '나만의 허브'를 직접 구축하고 싶었습니다.

기존 서비스의 정해진 형식을 따르기보다, 내가 원하는 기능과 디자인을 직접 정의하고 애플리케이션의 전체 구조를 설계하는 데 집중했습니다. 특히 프론트엔드 개발자로서 평소 접하기 어려운 **백엔드 로직과 DB 설계**를 직접 경험하며, 서비스의 전체적인 흐름을 스스로 제어해보고자 했습니다.

이 사이트는 단순히 정보를 나열하는 곳이 아니라, 제가 마주한 기술적 고민들과 해결 과정들을 꾸준히 쌓아가는 기록소입니다. 기획부터 배포까지 전 과정을 직접 고민하며 구축한 결과물입니다.

## 2. 🚀 핵심 설계 및 시스템 아키텍처

> **효율적인 데이터 흐름과 견고한 인프라를 지향하는 올인원 시스템 설계**

단순한 기능 구현을 넘어, 전체 애플리케이션의 지속 가능성과 생산성을 고려한 아키텍처를 설계했습니다. 프론트엔드 전문성을 기반으로 하되, 낯선 백엔드 영역은 AI와 협업하는 **'바이브 코딩'** 전략으로 해결했습니다. 단순히 코드를 생성하는 것에 그치지 않고, **정확한 요구사항 정의**와 **전체 시스템 단위의 정합성 검증**에 집중했습니다.

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771755612/blog/aomllw37yagpbhdxchl5.png" alt="Vercel Postgres" />
<figcaption style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">사용자 인터랙션과 렌더링 파이프라인을 고려한 통합 아키텍처</figcaption>
</figure>

---

### 🌐 데이터 흐름 및 타입 전략 (Hybrid API)

- **조회 (`GraphQL`)**: **Partial Fetching**을 통해 필요한 필드만 선택 호출하여 데이터 전송 효율을 극대화했습니다.
- **수정 (`Server Actions`)**: 별도의 API 엔드포인트 관리 없이 서버에서 직접 데이터를 조작하여 **로직의 복잡도를 최소화**했습니다.
- **타입 무결성 (`Codegen`)**: `typeDefs`를 소스로 DB와 FE 타입을 실시간 동기화하여 **런타임 에러를 원천 차단**했습니다.

<details>
<summary><b>타입 시스템 파이프라인 (Schema → Codegen → Resolvers)</b></summary>

**1. Schema Definition (`typeDefs.ts`)**

```typescript
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String
    email: String
    image: String
    isAdmin: Boolean
    posts: [Post!]!
    series: [Series!]!
  }

  type Series {
    id: ID!
    title: String!
    thumbnail: String
    posts: [Post!]!
    author: User!
    authorId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    thumbnail: String
    content: String!
    published: Boolean!
    viewCount: Int!
    readingTime: Int!
    author: User!
    authorId: String!
    tags: [String!]!
    series: Series
    seriesId: String
    seriesOrder: Int
    createdAt: String!
  }

  type Til {
    id: ID!
    title: String!
    content: String!
    tags: [String!]!
    published: Boolean!
    author: User!
    authorId: String!
    createdAt: String!
  }

  enum ProjectStatus {
    DEVELOPING
    LIVE
    ARCHIVED
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    thumbnail: String!
    techStack: [String!]!
    techHighlights: [String!]!
    period: String!
    githubUrl: String
    liveUrl: String
    content: String!
    status: ProjectStatus!
    isFeatured: Boolean!
    published: Boolean!
    createdAt: String!
  }

  type Query {
    me: User
    allPosts: [Post!]!
    post(id: ID!): Post
    allSeries: [Series!]!
    series(id: ID!): Series
    allTils(fromDate: String, toDate: String): [Til!]!
    til(id: ID!): Til
    allProjects(
      isFeatured: Boolean
      status: ProjectStatus
      take: Int
    ): [Project!]!
    project(id: ID!): Project
  }
`;
```

**2. Codegen Configuration (`codegen.ts`)**

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/generated/**/*'],
  generates: {
    'src/generated/graphql-resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          User: '@prisma/client#User as PrismaUser',
          Post: '@prisma/client#Post as PrismaPost',
          Series: '@prisma/client#Series as PrismaSeries',
          Til: '@/lib/prisma#Til',
          Project: '@/lib/prisma#Project',
        },
        contextType: '@/app/api/graphql/route#ContextValue',
        maybeValue: 'T | null',
        avoidOptionals: false,
      },
    },
    'src/generated/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        maybeValue: 'T | null',
        avoidOptionals: true,
      },
    },
  },
};
export default config;
```

**3. Type-Safe Resolvers (`resolvers.ts`)**

```typescript
import { ProjectStatus } from '@prisma/client';

import { Resolvers } from '@/generated/graphql-resolvers';
import { prisma } from '@/lib/prisma';

export const resolvers: Resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.session?.user?.username) return null;
      const user = await prisma.user.findUnique({
        where: { username: context.session.user.username },
      });
      if (!user) return null;
      return {
        ...user,
        isAdmin: context.session.user.isAdmin,
      };
    },

    allPosts: async () => {
      return await prisma.post.findMany({
        include: { author: true, series: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    post: async (_parent, { id }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: { author: true, series: true },
      });
    },

    allSeries: async () => {
      return await prisma.series.findMany({
        include: {
          author: true,
          posts: {
            include: { author: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    },

    series: async (_parent, { id }) => {
      return await prisma.series.findUnique({
        where: { id },
        include: {
          author: true,
          posts: {
            orderBy: { createdAt: 'asc' },
            include: { author: true },
          },
        },
      });
    },

    allTils: async (_parent, { fromDate, toDate }) => {
      return await prisma.til.findMany({
        where: {
          published: true,
          ...(fromDate || toDate
            ? {
                createdAt: {
                  ...(fromDate ? { gte: new Date(fromDate) } : {}),
                  ...(toDate ? { lte: new Date(toDate) } : {}),
                },
              }
            : {}),
        },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    til: async (_parent, { id }) => {
      return await prisma.til.findUnique({
        where: { id },
        include: { author: true },
      });
    },

    allProjects: async (_parent, { isFeatured, status, take }) => {
      return await prisma.project.findMany({
        where: {
          isFeatured: isFeatured ?? undefined,
          status: (status as ProjectStatus) ?? undefined,
          published: true,
        },
        take: take ?? undefined,
        orderBy: { createdAt: 'desc' },
      });
    },

    project: async (_parent, { id }) => {
      return await prisma.project.findUnique({ where: { id } });
    },
  },
};
```

</details>

---

### 🏗️ 인프라 및 환경 관리 (Infrastructure Strategy)

- **독립적 개발 환경 (`Docker`)**
  로컬 PC에 직접 DB를 설치하지 않아 시스템이 가벼우며, 언제든 컨테이너만 내리고 올리면 DB 초기화가 가능합니다.

<details>
<summary style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">Docker 컨테이너 기반으로 격리된 로컬 PostgreSQL 운영 상태</summary>

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771749711/blog/qsjx5zvuczwjv0xo1isk.png " alt="Docker Desktop" />
</figure>
</details>

- **운영 리소스 제로화 (`Vercel`)**
  1인 개발자로서 DB 패치나 커넥션 풀 관리에 드는 시간을 아끼고, 오직 서비스 고도화에만 집중할 수 있는 환경을 만들었습니다.

<details>
<summary style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">Vercel Postgres와 연동된 실시간 운영 DB 모니터링</summary>

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771749742/blog/fy5bvmwccvk620gryg7w.png" alt="Vercel Postgres" />
</figure>
</details>

- **무결성 상시 검증**
  AI를 활용하여 생성된 데이터 로직이 실제 DB 스키마에 올바르게 반영되는지 `pnpm db:studio`를 통해 실시간으로 확인하며 개발했습니다.

---

## 3. 🎨 디자인 및 UI/UX 전략

> **정보 전달의 명확성과 운영 효율성을 동시에 확보한 사용자 중심의 인터페이스**

화려한 시각적 장치에 매몰되기보다, **콘텐츠의 본질인 '정보 전달'이 가장 원활하게 이루어지는 시스템 설계**에 주력했습니다. 독자가 마크다운 형식을 통해 정보를 분명하게 받아드려야함은 물론, 작성자가 코드 레벨에서의 수정 없이도 실제 서비스 화면과 동일한 결과물을 실시간으로 확인하며 포스팅할 수 있는 운영 환경에 초점을 맞췄습니다.

---

### 📖 독자와 작성자를 모두 고려한 콘텐츠 경험

- **독자 중심의 명확한 정보 수용**: 다른 사용자들이 방문했을 때 제가 전달하고자 하는 바를 가장 직관적으로 이해할 수 있도록 마크다운 형식을 체계화했습니다. 일관된 시각적 위계(Hierarchy)를 통해 복잡한 기술 지식도 편안하게 읽힐 수 있는 환경을 만들었습니다.
- **작성자 중심의 운영 최적화**
  운영 환경에서 매번 코드를 수정하는 번거로움을 제거했습니다. 입력 폼에서 실제 포스팅과 동일한 화면을 보여주는 **실시간 프리뷰(Preview)** 시스템을 구현하여, 관리자 페이지 내에서 즉시 글을 편집하고 발행할 수 있는 직관적인 워크플로우를 설계했습니다.

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771751858/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2026-02-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.13.21_a9cagr.gif" alt="Authoring Experience Preview" />
  <figcaption style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">
별도의 코드 수정 없이 운영 환경에서 즉시 편집하고 결과를 확인하는 실시간 프리뷰 시스템
  </figcaption>
</figure>

- **WYSIWYG 지향의 포스팅 시스템**: '작성하는 화면이 곧 결과물'이 되는 환경을 지향했습니다. 이를 통해 1인 개발자로서 콘텐츠 생산성을 높이고, 실제 운영 환경에서의 데이터 정합성을 즉각적으로 검증할 수 있게 되었습니다.

---

### 🌐 하이브리드 MDX 렌더링 시스템 구축

- **기술적 선택의 배경**: 모든 콘텐츠가 DB에서 동적으로 관리되지만, 단순 렌더링만으로는 노션과 같은 전문 문서 플랫폼 수준의 정돈된 UI를 구현하기 어려웠습니다.
- **라이브러리 융합 전략**:
  - **`next-mdx-remote`**: DB 데이터를 서버 사이드에서 안전하게 패칭하여 동적인 포스팅 환경을 제공합니다.
  - **`fumadocs-ui/core`**: 전문적인 문서 레이아웃과 컴포넌트를 활용하여 독자의 가독성을 극대화했습니다.
- **엔지니어링 결과**: 동적 데이터 관리의 유연성과 실시간 프리뷰가 가능한 운영 시스템을 완성하여, **기술적 완성도와 운영 편의성**이라는 두 마리 토끼를 모두 잡았습니다.

---

### ✨ 사용자 몰입을 위한 UX 디테일

- **체계적인 정보 구조화**: `rehype-slug`를 통해 본문 헤딩을 실시간으로 추출, 긴 글에서도 길을 잃지 않게 돕는 **우측 목차(ToC)** 기능을 구현했습니다.
- **실시간 목차(ToC) 및 스마트 내비게이션**
  `rehype-slug`와 커스텀 헬퍼 함수를 통해 본문의 헤딩을 실시간으로 추출하여 우측 목차를 자동 생성합니다. 이를 통해 사용자는 글의 전체 구조를 한눈에 파악하고, 원하는 지점으로 즉시 이동할 수 있는 최적의 탐색 경험을 얻습니다.

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771752270/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2026-02-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.22.22_sdnban.gif" alt="Table of Contents Navigation" />
  <figcaption style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">
헤딩 추출을 통한 목차 자동 생성 및 앵커 포인트 이동 UI
  </figcaption>
</figure>

- **가독성 최적화 환경**:
  - `rehype-pretty-code`를 연동하여 개발자에게 익숙한 IDE 스타일의 코드 하이라이팅을 제공합니다.
  - `ReadProgressBar`를 상단에 배치하여 현재 읽기 진행률을 직관적으로 인지할 수 있도록 설계했습니다.
- **디자인 일관성 (`shadcn-ui`)**: 시스템 전반에 일관된 톤앤매너를 유지하면서도, 각 콘텐츠 성격에 맞는 유연한 UI 커스터마이징을 수행했습니다.

---

## 4. 🚀 주요 해결 과제

> **라이브러리의 제약을 넘어서는 구조적 보완과 시스템 통합**

정적 도구와 동적 데이터 사이의 간극을 메우기 위해 고민했던 기술적 접합점과 엔지니어링적 대안들을 기록했습니다.

---

### 🛠️ CASE 1. 정적 도구(Fumadocs)의 동적 환경 이식

#### 🔴 문제 상황: 인프라 제약과 라이브러리 설계의 충돌

`Fumadocs`는 강력한 문서 UI를 제공하지만, 기본적으로 로컬 파일 시스템(`.mdx`)을 직접 읽는 정적 구조로 설계되어 있습니다. 그러나 **Vercel(Serverless)과 PostgreSQL(DB) 중심의 운영 환경**에서는 런타임에 파일을 생성하거나 프로젝트 폴더 내의 파일을 읽어오는 방식에 물리적 제약이 존재했습니다.

<figure style="margin: 20px 0; text-align: center;">
  <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771753657/Fumadocs_Static_vs_Dynamic-2026-02-22-094537_wzo6oo.png" alt="Fumadocs Static vs Dynamic" />
  <figcaption style="margin-top: 12px; font-size: 0.9rem; color: #666; font-style: italic;">
라이브러리의 기대 구조와 실제 운영 환경의 데이터 흐름 차이
  </figcaption>
</figure>

---

#### 🟢 해결 전략: UI와 Data 레이어 분리를 통한 하이브리드 파이프라인

라이브러리의 올인원(All-in-one) 방식을 해체하고, **'데이터 페칭'과 'UI 렌더링'의 역할을 분리**하여 재조립하는 하이브리드 아키텍처를 설계했습니다.

1. **Data Layer**: `next-mdx-remote`를 활용하여 DB에 저장된 동적 마크다운 데이터를 서버 사이드에서 직접 패칭합니다.
2. **UI Layer**: 렌더링 시점에만 `Fumadocs`의 UI 컴포넌트(`getMDXComponents`)를 주입하여, 데이터 출처와 관계없이 일관된 문서 UI 경험을 유지했습니다.

**하이브리드 렌더링 구현부**

```tsx
// 1. Data Layer: DB에서 동적으로 콘텐츠 패칭 (Apollo Client)
const { data } = await getClient().query<GetProjectQuery>({
  query: GET_PROJECT,
  variables: { id },
  context: { fetchOptions: { cache: 'no-store' } },
});

// 2. UI Layer: next-mdx-remote를 통해 렌더링하되 Fumadocs UI 컴포넌트 주입
<article className='prose dark:prose-invert max-w-none'>
  <DocsBody>
    <MDXRemote
      source={project.content} // DB에서 가져온 동적 데이터
      components={getMDXComponents()} // Fumadocs의 고도화된 UI 컴포넌트 매핑
    />
  </DocsBody>
</article>;
```

---

#### 🔵 기술적 가치: **환경 최적화 엔지니어링**

도구가 제시하는 표준 가이드에 갇히지 않고, **서비스의 인프라 특성(Serverless, DB)을 최우선으로 고려하여 아키텍처를 재설계**했습니다. 이를 통해 동적 데이터 관리의 유연성과 노션과 같은 전문 문서 사이트의 인터랙티브한 UX라는 두 가지 실익을 모두 확보할 수 있었습니다.

---

### 📖 CASE 2. 동적 콘텐츠를 위한 목차(ToC) 직접 가공

DB에서 실시간으로 불러오는 마크다운은 렌더링 전의 '텍스트' 상태이기에, 기존의 DOM 기반 라이브러리 대신 **필요한 제목(Heading) 정보를 골라내는 로직**을 직접 작성했습니다.

- **엣지 케이스 처리**: 코드 블록(```) 내부에 포함된 `#`이 목차로 오인되지 않도록 정규표현식으로 가볍게 필터링했습니다.
- **앵커 동기화**: `github-slugger`를 활용해 본문 내 앵커와 목차 링크의 ID를 일치시켜 동적 콘텐츠에서도 정확한 이동이 가능하게 했습니다.

````typescript
export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();

  // 코드 블록 내부의 '#' 노이즈를 먼저 제거
  const rawBody = content.replace(/```[\s\S]*?```/g, '');
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(rawBody)) !== null) {
    headings.push({
      id: slugger.slug(match[2].trim()),
      text: match[2].trim(),
      level: match[1].length,
    });
  }
  return headings;
}
````

---

### 🌐 CASE 3. 데이터 성격에 따른 API 수단 분리

모든 요청을 하나의 방식으로 통일하는 편의성보다, **조회(Read)와 수정(Write)의 목적에 따른 실익**을 챙기는 데 집중했습니다.

| 구분          | 조회 (Read)                           | 수정 (Write)                        |
| :------------ | :------------------------------------ | :---------------------------------- |
| **선택 기술** | **GraphQL (Apollo)**                  | **Server Actions**                  |
| **핵심 기여** | **네트워크 비용 최적화**              | **데이터 무결성 및 보안**           |
| **주요 특징** | 필요한 칼럼만 호출 (Partial Fetching) | 별도 엔드포인트 없는 서버 직접 제어 |

---

#### ⚡ 효율적인 데이터 패칭: `GraphQL`

- **Partial Fetching**: 블로그 상세 페이지처럼 데이터 양이 큰 콘텐츠를 다룰 때, 필요한 필드만 선택적으로 호출하여 **불필요한 네트워크 오버헤드**를 획기적으로 줄였습니다.
- **Self-Documenting**: 별도의 문서화 도구 없이도 **강력한 스키마 기반**으로 데이터 구조를 명확히 관리하며 개발 생산성을 높였습니다.

#### 🔒 안전하고 직관적인 데이터 변경: `Server Actions`

- **보안 및 안정성**: 데이터 생성 및 수정은 DB와 직접 맞닿은 민감한 작업입니다. Next.js 서버 권한 내에서 직접 DB를 제어하여 **복잡한 엔드포인트 관리 없이도 무결성**을 유지했습니다.
- **로직의 단순화**: API 레이어를 한 단계 거치지 않고 서버 로직을 직접 수행함으로써, 코드의 복잡도를 낮추고 유지보수성을 확보했습니다.

---

## 5. 🏁 마치며: 기록을 통한 지속적인 성장

> **검색 결과 중 하나가 아닌, 누군가의 시간을 아껴주는 유의미한 인사이트**

우리는 매일 구글링이라는 바다에서 답을 찾지만, 때로는 알맹이 없는 포스팅 속에서 시간을 낭비하거나 이미 알고 있던 로직마저 헷갈리곤 합니다. 이번 프로젝트는 그런 소모적인 경험을 반복하지 않기 위해, 방문하는 분들에게 **실전적인 인사이트**를 전달하고 저 또한 **지식의 무결성**을 검증받는 공간을 만드는 데 초점을 맞췄습니다.

---

### 📚 콘텐츠 철학 및 운영 계획

- **Blog (Insight & Dev Log)**:
  - 검색하면 누구나 알 수 있는 지식은 지양합니다. 프로젝트를 진행하며 마주한 **진짜 문제들과 그 해결 과정에서의 기술적 사유**를 깊이 있게 담아내어, 방문자의 시간을 가치 있게 만드는 밀도 높은 포스팅을 지향합니다.

- **TIL (Continuous Learning)**:
  - 매주 코딩 테스트 스터디와 데일리 배움을 기록합니다. 단편적인 지식 습득에 그치지 않고, 제 기술 스택에 어떻게 녹아들었는지 복기하며 지식의 힘을 키워나갈 예정입니다.

---

### 💬 지식의 상호 검증과 소통 (Giscus 연동)

기술은 끊임없이 변하고 저의 지식 또한 완벽하지 않을 수 있습니다. 이를 보완하기 위해 **Giscus를 도입하여 제 GitHub 계정과 연동**했습니다.

- 잘못된 정보에 대한 비판이나 더 나은 대안에 대한 의견은 언제든 환영합니다.
- 댓글을 통한 의사소통은 저에게는 성장의 자극제가 되고, 방문자에게는 **지식의 상호 검증**이 일어나는 건강한 커뮤니티의 장이 되길 바랍니다.
