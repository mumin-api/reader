  # 🕌 Mumin Hadith Reader: The Definitive Engineering Encyclopedia

  > **Version**: 2.2.0 (The Wisdom Release)  
  > **Date**: January 15, 2026  
  > **Classification**: Public / Open Source  
  > **Status**: Production Stable  
  > **Maintainers**: The Mumin Core Team  
  > **License**: MIT License  

  ```ascii
  ███╗   ███╗██╗   ██╗███╗   ███╗██╗███╗   ██╗
  ████╗ ████║██║   ██║████╗ ████║██║████╗  ██║
  ██╔████╔██║██║   ██║██╔████╔██║██║██╔██╗ ██║
  ██║╚██╔╝██║██║   ██║██║╚██╔╝██║██║██║╚██╗██║
  ██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
  ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
    R  E  A  D  E  R     E  C  O  S  Y  S  T  E  M
  ```

  ---

  ## 📜 Abstract

  The **Mumin Hadith Reader** is a high-performance, accessible, and aesthetically refined web interface for browsing, reading, and researching authentic Hadith collections. It is built to bridge the gap between classical Islamic scholarship and modern software engineering.

  This document serves as the **Single Source of Truth (SSOT)** for the project. It is intended for developers, designers, and open-source contributors who wish to understand the internal workings of the platform.

  **Warning**: This document is comprehensive. It covers philosophy, architecture, code style, SEO strategy, deployment ops, and legal governance.

  ---

  ## 📑 Table of Contents

  ### BOOK I: THE FOUNDATION
  1.  [Mission Statement](#1-mission-statement)
  2.  [Core Values (The "7 Pillars")](#2-core-values-the-7-pillars)
  3.  [Project Scope](#3-project-scope)

  ### BOOK II: ARCHITECTURE & STACK
  4.  [High-Level System Design](#4-high-level-system-design)
  5.  [Technology Stack Decision Record (ADR)](#5-technology-stack-decision-record-adr)
  6.  [The Hybrid Rendering Model (RSC + Client)](#6-the-hybrid-rendering-model)
  7.  [State Management with Zustand](#7-state-management-with-zustand)
  8.  [Internationalization (i18n) Architecture](#8-internationalization-i18n-architecture)

  ### BOOK III: THE SEO ENGINE
  9.  [Search Dominance Strategy](#9-search-dominance-strategy)
  10. [The Multi-Sitemap Indexing System](#10-the-multi-sitemap-indexing-system)
  11. [Dynamic Open Graph Image Generation](#11-dynamic-open-graph-image-generation)
  12. [E-E-A-T & Structured Data (JSON-LD)](#12-e-e-a-t--structured-data-json-ld)
  13. [The "Related Hadiths" Algorithm](#13-the-related-hadiths-algorithm)

  ### BOOK IV: DESIGN SYSTEM
  14. [Design Philosophy: "Digital Ihsaan"](#14-design-philosophy-digital-ihsaan)
  15. [Color System & Palettes](#15-color-system--palettes)
  16. [Typography & Font Loading](#16-typography--font-loading)
  17. [Component Library (Atomic Design)](#17-component-library-atomic-design)

  ### BOOK V: DEVELOPMENT GUIDE
  18. [Prerequisites & Environment](#18-prerequisites--environment)
  19. [Installation & Setup (Windows/Mac/Linux)](#19-installation--setup)
  20. [Directory Structure Deep Dive](#20-directory-structure-deep-dive)
  21. [Common Workflows](#21-common-workflows)
  22. [Debugging & Troubleshooting](#22-debugging--troubleshooting)

  ### BOOK VI: API REFERENCE
  23. [API Authentication](#23-api-authentication)
  24. [Endpoints Specification](#24-endpoints-specification)
  25. [Data Types & Interfaces](#25-data-types--interfaces)

  ### BOOK VII: OPERATIONS & OPS
  26. [Deployment Pipeline (CI/CD)](#26-deployment-pipeline-cicd)
  27. [Environment Variables Reference](#27-environment-variables-reference)
  28. [Performance Monitoring (Web Vitals)](#28-performance-monitoring-web-vitals)
  29. [Security Policy](#29-security-policy)

  ### BOOK VIII: GOVERNANCE
  30. [Code of Conduct](#30-code-of-conduct)
  31. [Contribution Guidelines](#31-contribution-guidelines)
  32. [License](#32-license)

  ---

  # 📖 BOOK I: THE FOUNDATION

  ## 1. Mission Statement

  > "To provide the digital Ummah with a reading experience that honors the sanctity of the Prophetic words through technical excellence, visual beauty, and uncompromising accessibility."

  We believe that the user interface should "disappear," leaving the reader alone with the text. Every animation, every pixel, and every millisecond of latency is optimized to support this state of flow.

  ## 2. Core Values (The "7 Pillars")

  Every line of code committed to this repository must align with at least one of these pillars:

  1.  **Ihsaan (Excellence)**: We do not ship "good enough". We ship perfection. If an animation stutters, it is a bug. If a layout shifts (CLS), it is a defect.
  2.  **Mizan (Balance)**: Design must be balanced. Not too sparse, not too cluttered.
  3.  **Bayan (Clarity)**: The UI must be intuitive. A grandmother in Tashkent and a student in London should both understand how to navigate immediately.
  4.  **Hifz (Preservation)**: The text is sacred. We verify every API response to ensure no data corruption has occurred.
  5.  **Amanah (Trust)**: We respect user privacy. We do not track personal data unnecessarily. Bookmarks stay on the device.
  6.  **Yusr (Ease)**: Accessibility is not an afterthought. We support screen readers, keyboard navigation, and high-contrast modes.
  7.  **Ikhlas (Sincerity)**: This project is Open Source. We build for the benefit of the community, not for profit.

  ## 3. Project Scope

  **In Scope:**
  *   Browsing major Hadith collections (Bukhari, Muslim, Tirmidhi, etc.).
  *   Multilingual translations (English, Russian, Arabic).
  *   Deep search functionality (fuzzy matching, logic operators).
  *   Personalization (bookmarks, font size, theme).
  *   Progressive Web App (PWA) capabilities.

  **Out of Scope (Currently):**
  *   Social networking features (comments, likes).
  *   User accounts/Cloud sync (User data is local-only for privacy).
  *   Fiqh rulings or fatwas (We strictly present the texts).

  ---

  # 📖 BOOK II: ARCHITECTURE & STACK

  ## 4. High-Level System Design

  The Mumin Reader acts as a **Headless Frontend** for the Mumin API. It is decoupled from the backend to ensure flexibility and speed.

  ```mermaid
  graph TD
      User[User Device] -->|Edge Network| CDN[Vercel CDN]
      CDN -->|Cache Hit| Static[Static Assets]
      CDN -->|Cache Miss| Server[Next.js Server]
      
      subgraph "Mumin Reader (Next.js)"
          Server -->|RSC Render| Page[Page Component]
          Page -->|Fetch Data| API_Client[API Client]
          Page -->|Generate Metadata| SEO[SEO Module]
      end
      
      subgraph "Mumin API (Backend)"
          API_Client -->|REST /v1| Gateway[API Gateway]
          Gateway -->|Query| DB[(PostgreSQL)]
          Gateway -->|Cache| Redis[(Redis Cache)]
      end
  ```

  ## 5. Technology Stack Decision Record (ADR)

  ### Framework: Next.js 16 (App Router)
  *   **Decision**: Adopt Next.js 16 with the App Router.
  *   **Why**: The App Router allows for **React Server Components (RSC)**. This is crucial for our "content-heavy" application. We can render thousands of words of text on the server, send zero JavaScript for those text blocks, and achieve perfect SEO.
  *   **Alternative Considered**: Vite (React SPA). Rejected because client-side rendering hurts SEO and initial load performance for text-heavy sites.

  ### Language: TypeScript 5
  *   **Decision**: Strict TypeScript usage.
  *   **Why**: To prevent runtime errors and provide self-documenting code.
  *   **Rule**: `noImplicitAny` is ON. No `any` types allowed in production code.

  ### Styling: Tailwind CSS
  *   **Decision**: Utility-first CSS.
  *   **Why**: Consistency. Instead of magic numbers (`margin: 13px`), we stick to a rigid scale (`m-4`, `p-6`). This ensures the design remains harmonious.

  ### State: Zustand
  *   **Decision**: Atomic state management.
  *   **Why**: Redux is too boilerplate-heavy. Context API triggers too many re-renders. Zustand allows us to subscribe specific components to specific slices of state (e.g., only the font-size button re-renders when font size changes).

  ## 6. The Hybrid Rendering Model

  We employ a sophisticated **Hybrid Rendering Strategy**:

  ### Server Components (Default)
  90% of the application runs here.
  *   **Route**: `src/app/...`
  *   **Behavior**: Data fetching happens on the server. HTML is generated and sent to the browser.
  *   **Benefit**: Users see content immediately, even on slow 3G connections.

  ### Client Components (Islands)
  Interactive "islands" are strictly isolated.
  *   **Directive**: `'use client'`
  *   **Examples**:
      *   `src/components/Navbar.tsx` (Need to track scroll position)
      *   `src/components/HadithCard.tsx` (Need to handle expand/collapse clicks)
      *   `src/components/SettingsPanel.tsx` (Need access to `localStorage`)

  ## 7. State Management with Zustand

  We use three primary stores:

  1.  **`useSettingsStore`**:
      *   **Persist**: `localStorage`
      *   **State**: `theme` ('light'|'dark'|'sepia'), `fontSize` (12-32), `showTranslation` (bool).
      *   **Hydration**: Protected by a custom `useHydration` hook to prevent "Flash of Unstyled Content" (FOUC).

  2.  **`useBookmarksStore`**:
      *   **Persist**: `IndexedDB` (via `idb-keyval` wrapper).
      *   **State**: Array of bookmarked Hadith IDs.
      *   **Limit**: Caps at 5,000 items to protect device memory.

  3.  **`useSearchStore`**:
      *   **Persist**: `sessionStorage`.
      *   **State**: Recent search queries, current filter state.

  ## 8. Internationalization (i18n) Architecture

  Our i18n strategy is **Path-Based Routing**.

  *   **URL Structure**: `/{locale}/{route}`
      *   `/en/collections/bukhari`
      *   `/ru/collections/bukhari`
      *   `/ar/collections/bukhari`
  *   **Middleware (`src/middleware.ts`)**:
      *   Detects `Accept-Language` header.
      *   Checks for `NEXT_LOCALE` cookie.
      *   Redirects root `/` to the best matching locale.
  *   **Layout flipping**:
      *   When `locale === 'ar'`, the root `<html>` tag gets `dir="rtl"`.
      *   Tailwind logical properties (`ms-4` instead of `ml-4`) automatically flip the layout.

  ---

  # 📖 BOOK III: THE SEO ENGINE

  ## 9. Search Dominance Strategy

  Our SEO strategy is aggressive. We aim to be the #1 result for query terms in our target languages.

  ### The "Content-First" Principle
  Search engines prioritize content quality. Our HTML structure is semantic:
  *   `<h1>`: Collection Name
  *   `<h2>`: Chapter Title
  *   `<article>`: The Hadith container
  *   `<p>`: The Matn (text)
  *   `<footer>`: The grading and reference

  ### Canonicalization Rules
  To prevent duplicate content penalties:
  *   **Self-Referencing**: Each page points to itself as canonical.
  *   **Query Params**: All tracking parameters (`utm_source`, `ref`) are stripped from the canonical tag.
  *   **Trailing Slash**: Removed globally.

  ## 10. The Multi-Sitemap Indexing System

  A monolithic `sitemap.xml` crashes when you have 40,000 URLs. We use a **Sitemap Index**.

  ### Structure
  *   **`sitemap.xml`** (Index): Points to the sub-sitemaps.
  *   **`sitemap-collections.xml`**: Lists all 20+ collection landing pages.
  *   **`sitemap-hadiths-[slug].xml`**: Dynamically generated for each collection.
      *   Example: `/sitemap-hadiths-sahih-bukhari` contains 7,563 URLs.
      *   Example: `/sitemap-hadiths-40-hadith-nawawi` contains 42 URLs.

  ### Updates
  *   **Frequency**: `monthly` for strict collections (Bukhari), `daily` for collections currently being digitized.
  *   **Priority**:
      *   Home: 1.0
      *   Collection Landing: 0.9
      *   Hadith Detail: 0.7
      *   Static Pages: 0.5

  ## 11. Dynamic Open Graph Image Generation

  We do not use generic stock photos. We generate images **on-the-fly** at the Edge.

  *   **Route**: `/api/og`
  *   **Library**: `@vercel/og` (Satori).
  *   **Mechanism**:
      1.  Request comes in: `/api/og?id=523`
      2.  Edge function fetches Hadith #523 from API.
      3.  Edge function renders a React component to an SVG.
      4.  Satori converts SVG to PNG.
      5.  Response is cached at the Edge for 24 hours.

  **Design Specs**:
  *   **Dimensions**: 1200x630.
  *   **Background**: Emerald Gradient with Islamic tessellation pattern.
  *   **Typography**: `Amiri` (Bold) for Arabic, `Inter` for translation.
  *   **Data**: Includes the full Hadith text (truncated to 280 chars), collection name, and verification grade.

  ## 12. E-E-A-T & Structured Data (JSON-LD)

  We implement **Schema.org** to satisfy Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines.

  ### `Article` Schema
  Applied to every Hadith page.
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Sahih Bukhari, Hadith 1",
    "author": {
      "@type": "Person",
      "name": "Muhammad al-Bukhari"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mumin Reader",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reader.mumin.ink/icon.png"
      }
    },
    "datePublished": "0870-01-01"
  }
  ```

  ### `BreadcrumbList` Schema
  Helps Google display the path: `Home > Bukhari > Book of Revelation > Hadith 1`.

  ### `ProfilePage` Schema
  Applied to `/scholars` to establish the authority of the collection authors.

  ## 13. The "Related Hadiths" Algorithm

  To improve user engagement and internal linking, we calculate "Relatedness" on the fly.

  **Formula**:
  ```typescript
  const NARRATOR_WEIGHT = 0.2;
  const COLLECTION_WEIGHT = 0.3;
  const TOPIC_WEIGHT = 0.5;

  score = (matchesNarrator ? NARRATOR_WEIGHT : 0) +
          (matchesCollection ? COLLECTION_WEIGHT : 0) +
          (keywordOverlapCount * 0.1);
  ```

  **Caching**: Results are cached in an LRU cache (`lru-cache`) for 24 hours to prevent API thrashing.

  ---

  # 📖 BOOK IV: DESIGN SYSTEM

  ## 14. Design Philosophy: "Digital Ihsaan"

  We eschew "trendy" design (neubrutalism, glassmorphism overload) in favor of **Timeless Design**. Our interface should look as appropriate in 10 years as it does today.

  ## 15. Color System & Palettes

  We use HSL values for programmatic manipulation (alpha transparency).

  ### The "Emerald" Palette (Primary)
  Used for branding, headers, and primary actions.
  *   `950`: `#022c22` (The Deepest Night)
  *   `900`: `#064e3b` (Prophetic Green)
  *   `800`: `#065f46` (Forest)
  *   `600`: `#059669` (Jade)

  ### The "Gold" Palette (Accent)
  Used for highlights, borders, and sacred emphasis.
  *   `500`: `#d4af37` (Metallic Gold)
  *   `400`: `#fbbf24` (Amber Light)

  ### The "Paper" Palette (Backgrounds)
  Used to simulate the reading experience of a physical book.
  *   `50`: `#fffdf9` (Warm Cream) - **Default Light Mode BG**
  *   `100`: `#fefce8` (Old Paper)

  ## 16. Typography & Font Loading

  ### Latins (English/Russian)
  *   **Font**: `Inter` (Variable).
  *   **Source**: `next/font/google`.
  *   **Weights**: 400 (Regular), 500 (Medium), 700 (Bold).

  ### Arabic
  *   **Font**: `Amiri` (Classic Naskh).
  *   **Rationale**: It is the most legible font for long-form reading and supports complex Quranic diacritics better than Noto Sans Arabic.
  *   **Optimization**: Sub-setted to Arabic Unicode range only.

  ## 17. Component Library (Atomic Design)

  ### Atoms
  *   `Button`: Multi-variant (primary, ghost, outline) with accessible focus states.
  *   `Badge`: For Hadith Grading (Green=Sahih, Yellow=Hasan, Red=Daif).
  *   `Spinner`: SVG-based loading indicator.

  ### Molecules
  *   `SearchBar`: Combines Input, Icon, and Dropdown logic.
  *   `ThemeToggle`: Combines Icon, State, and Tooltip.

  ### Organisms
  *   `HadithCard`: The core unit. Contains header, arabic body, translation body, footnotes, and footer actions.
  *   `CollectionGrid`: Responsive grid layout for library browsing.

  ---

  # 📖 BOOK V: DEVELOPMENT GUIDE

  ## 18. Prerequisites & Environment
  *   **Node.js**: Version 18.17 or higher (Required for Next.js 14+).
  *   **Package Manager**: `npm` (v9+) or `pnpm` (v8+).
  *   **Git**: Version 2.20+.

  ## 19. Installation & Setup

  ### Step 1: Clone the Repository
  ```bash
  git clone https://github.com/abubakrmuminov/mumin-api-reader.git
  cd reader
  ```

  ### Step 2: Install Dependencies
  ```bash
  npm install
  # OR
  pnpm install
  ```

  ### Step 3: Configure Environment
  Create a `.env.local` file in the root directory.
  ```bash
  cp .env.example .env.local
  ```

  **Required Variables**:
  ```ini
  # The URL of the Mumin API
  NEXT_PUBLIC_API_URL=https://api.mumin.ink/v1

  # Your public API key (Ask maintainer if you don't have one)
  NEXT_PUBLIC_API_KEY=sk_public_1234567890

  # The base URL of the frontend (Used for SEO/OG images)
  NEXT_PUBLIC_BASE_URL=http://localhost:3000
  ```

  ### Step 4: Run Development Server
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000` in your browser.

  ## 20. Directory Structure Deep Dive

  ```text
  /public                 # Static assets (images, fonts, robotic.txt)
    /icons                # App icons and PWA assets
    /fonts                # Local font files (if any)
  /src
    /app                  # Next.js App Router
      /[locale]           # Dynamic Locale Route (en, ru, ar)
        /collections      # Collection pages
          page.tsx        # /collections (List)
          /[slug]         # /collections/bukhari
            page.tsx      # Collection Index
            /[number]     # /collections/bukhari/1
              page.tsx    # Single Hadith View
    /components           # React Components
      /ui                 # Reusable UI elements (Button, Card, Input)
      /layout             # Header, Footer, Sidebar
      /features           # Feature-specific components (Search, Settings)
    /lib                  # Utilities
      /api                # API client configuration
      /hooks              # Custom React Hooks
      /utils              # Helper functions
    /messages             # i18n translation files (JSON)
    /styles               # Global CSS files
  ```

  ## 21. Common Workflows

  ### Adding a New UI Component
  1.  Create `src/components/ui/MyNewComponent.tsx`.
  2.  Use standard exports: `export const MyNewComponent = ...`.
  3.  Add it to `src/components/ui/index.ts` (Barrel export).

  ### Updating Translations
  1.  Open `src/messages/en.json`.
  2.  Add your key: `"NewFeature": { "title": "My Title" }`.
  3.  Repeat for `ru.json` and `ar.json`.
  4.  Use in component: `const t = useTranslations('NewFeature');`.

  ### Creating a Database Migration (Client-Side)
  If you change the structure of the `bookmarks` store:
  1.  Bump the version number in `src/store/useBookmarks.ts`.
  2.  Add a migration function in the `persist` middleware config.

  ## 22. Debugging & Troubleshooting

  **Issue**: "Hydration failed because the initial UI does not match what was rendered on the server."
  *   **Cause**: You are rendering something dependent on `window` or `localStorage` directly in the JSX.
  *   **Fix**: Wrap the component in `ClientOnly` or use the `useHydration` hook to return `null` until mounted.

  **Issue**: "API 401 Unauthorized"
  *   **Cause**: Invalid or missing `NEXT_PUBLIC_API_KEY`.
  *   **Fix**: Check your `.env.local` file.

  **Issue**: "Custom Font not loading"
  *   **Cause**: Network block or incorrect font path.
  *   **Fix**: Ensure `next/font` configuration in `src/app/layout.tsx` is correct.

  ---

  # 📖 BOOK VI: API REFERENCE

  ## 23. API Authentication

  All requests to the Mumin API must include the `x-api-key` header.

  ```typescript
  // src/lib/api/client.ts
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      'Content-Type': 'application/json',
    },
  });
  ```

  ## 24. Endpoints Specification

  ### `GET /collections`
  Returns a list of available Hadith collections.
  *   **Response**: `Collection[]`
  *   **Cache**: 24 hours.

  ### `GET /collections/{slug}`
  Returns metadata for a specific collection.
  *   **Params**: `slug` (e.g., `sahih-bukhari`).
  *   **Response**: `CollectionDetail`.

  ### `GET /hadiths`
  Search and filter Hadiths.
  *   **Query Params**:
      *   `collection`: Filter by collection slug.
      *   `book`: Filter by book ID.
      *   `q`: Search query.
      *   `page`: Pagination cursor.
  *   **Response**: `PaginatedResponse<Hadith>`.

  ### `GET /hadiths/{id}`
  Get a single Hadith by its internal ID.
  *   **Response**: `Hadith`

  ## 25. Data Types & Interfaces

  ```typescript
  // The fundamental unit of the platform
  export interface Hadith {
    id: number;
    hadithNumber: string; // Display number (may be alphanumeric like '23a')
    arabicText: string;   // The Matn in Arabic
    englishText: string;  // Translation
    russianText?: string; // Optional translation
    chapterId: number;
    collectionId: string;
    
    // Grading is crucial for validity
    grade: 'Sahih' | 'Hasan' | 'Daif' | 'Mawdu';
    
    // Navigation pointers
    nextHadithId?: number;
    prevHadithId?: number;
  }
  ```

  ---

  # 📖 BOOK VII: OPERATIONS & OPS

  ## 26. Deployment Pipeline (CI/CD)

  We use **Vercel** for continuous deployment.

  ### 1. Push to Branch
  Developer pushes code to `feature/new-design`.
  *   **Action**: Vercel creates a "Preview Deployment".
  *   **URL**: `https://reader-git-feature-new-design-mumin.vercel.app`.

  ### 2. Pull Request & Review
  *   Automated checks run:
      *   `npm run lint`: Checks for code style issues.
      *   `npm run type-check`: Verifies no TypeScript errors.
      *   `npm run test`: Runs unit tests.

  ### 3. Merge to Main
  *   **Action**: Vercel triggers "Production Build".
  *   **URL**: `https://reader.mumin.ink`.
  *   **Cache Invalidation**: Previous ISR caches are purged.

  ## 27. Environment Variables Reference

  | Variable | Description | Default | Required |
  | :--- | :--- | :--- | :--- |
  | `NEXT_PUBLIC_API_URL` | Mumin API Endpoint | `https://api.mumin.ink/v1` | Yes |
  | `NEXT_PUBLIC_API_KEY` | Read-Only API Key | - | Yes |
  | `NEXT_PUBLIC_BASE_URL` | Canonical Domain | `http://localhost:3000` | Yes |
  | `NEXT_PUBLIC_YANDEX_METRICA` | Analytics ID | - | No |
  | `NODE_ENV` | Environment | `development` | Built-in |

  ## 28. Performance Monitoring (Web Vitals)

  We define strict budgets for Core Web Vitals on Mobile connections (4G).

  | Metric | Target | Warning | Critical |
  | :--- | :--- | :--- | :--- |
  | **LCP** (Largest Contentful Paint) | < 1.2s | > 2.5s | > 4.0s |
  | **FID** (First Input Delay) | < 100ms | > 200ms | > 300ms |
  | **CLS** (Cumulative Layout Shift) | 0.00 | > 0.1 | > 0.25 |

  ## 29. Security Policy

  ### Reporting Vulnerabilities
  If you discover a security vulnerability, please do **NOT** open a public issue.
  Email `security@mumin.ink` immediately. We pledge to acknowledge your report within 24 hours.

  ### Data Privacy
  *   We do not use cookies for tracking, only for essential settings (locale).
  *   Analytics are anonymized. IP addresses are hashed.
  *   We do not store user reading history on our servers.

  ---

  # 📖 BOOK VIII: GOVERNANCE

  ## 30. Code of Conduct

  We are confirmed to the **Contributor Covenant 2.1**.
  *   **Be Welcoming**: We welcome contributors of all backgrounds.
  *   **Be Respectful**: Disagreement is fine; disrespect is not.
  *   **Focus on What is Best for the Community**: Technical decisions should serve the end user.

  ## 31. Contribution Guidelines

  1.  **Fork** the repo on GitHub.
  2.  **Clone** your fork locally.
  3.  **Branch** for your feature (`git checkout -b feat/amazing-feature`).
  4.  **Commit** with clear messages.
  5.  **Push** and open a **Pull Request**.

  ## 32. License

  **MIT License**

  Copyright (c) 2026 Mumin Development Team

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  ---

  **End of Engineering Handbook**  
  *May this work serve as a Sadaqah Jariyah (Continuing Charity) for all involved.*
