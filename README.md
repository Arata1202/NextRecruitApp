<div id="top"><h1>リクビジョン</h1></div>

## 使用技術

<!-- シールド一覧 -->
<p style="display: inline">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Typescript-000000.svg?logo=typescript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Tailwind CSS-000000.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Supabase-000000.svg?logo=supabase&style=for-the-badge">
  <img src="https://img.shields.io/badge/-PostgreSQL-000000.svg?logo=postgresql&style=for-the-badge">
  <img src="https://img.shields.io/badge/-PWA-000000.svg?logo=pwa&style=for-the-badge">
  <img src="https://img.shields.io/badge/-OneSignal-000000.svg?logo=onesignal&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Vercel-000000.svg?logo=vercel&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Github Actions-000000.svg?logo=githubactions&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Docker-000000.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Nginx-000000.svg?logo=nginx&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Canva-000000.svg?logo=canva&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Google AdSense-000000.svg?logo=googleadsense&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Google Analytics-000000.svg?logo=googleanalytics&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Google Search Console-000000.svg?logo=googlesearchconsole&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#1-プロジェクトについて)
2. [環境](#2-環境)
3. [ディレクトリ構成](#3-ディレクトリ構成)
4. [開発環境構築](#4-開発環境構築)
4. [プレフィックス](#5-プレフィックス)

## 1. プロジェクトについて

就活における日程管理や自己分析、選考状況などを一括で管理することのできるサービス

  <p align="left">
    <br />
    <a href="https://rikuvision.realunivlog.com"><strong>リクビジョン »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 2. 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 主要なパッケージ  | バージョン |
| --------------------- | ---------- |
| next               | 15.0.3     |
| react               | 18.3.1     |
| typescript               | 5.6.3     |
| tailwindcss               | 3.4.15     |
| @supabase/supabase-js               | 2.47.10     |
| husky               | 9.1.6     |
| eslint               | 9.15.0     |
| prettier               | 3.3.3     |

その他のパッケージのバージョンは package.json を参照

<p align="right">(<a href="#top">トップへ</a>)</p>

## 3. ディレクトリ構成

```
❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
.
├── .docker
│   ├── js
│   └── nginx
├── .env
├── .env.example
├── .github
│   └── workflows
├── .gitignore
├── .husky
│   └── pre-commit
├── .prettierignore
├── .prettierrc
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── LICENSE
├── README.md
├── app
│   ├── api
│   ├── contact
│   ├── copyright
│   ├── disclaimer
│   ├── fonts
│   ├── globals.css
│   ├── layout.tsx
│   ├── link
│   ├── not-found.module.css
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── privacy
│   └── service
├── components
│   ├── Common
│   ├── Home
│   └── Service
├── docker-compose.yml
├── eslint.config.mjs
├── hooks
│   ├── A2hs
│   └── Middleware
├── libs
│   ├── OneSignalInitial.tsx
│   └── supabase.js
├── next-sitemap.config.js
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── OneSignalSDKWorker.js
│   ├── favicon.ico
│   ├── images
│   ├── manifest.json
│   └── robots.txt
├── tailwind.config.ts
└── tsconfig.json
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 4. 開発環境構築

### 開発環境の構築と起動

.env ファイルを[環境変数一覧](#環境変数一覧)を元に作成

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ONESIGNAL_APP_ID=
GOOGLE_ANALYTICS_ID=
GOOGLE_ADSENSE_ID=
RECAPTCHA_SECRET_KEY=
EMAIL_TO=
EMAIL_FROM=
SMTP_USER=
SMTP_PASS=
```

.env ファイルを作成後、以下の方法で開発環境を起動

#### pnpmを使用する場合

```
pnpm install
pnpm run dev
```

#### Dockerを使用する場合

```
docker compose up -d --build
```

### 動作確認

http://localhost:3000 にアクセスできるか確認
アクセスできたら成功

### コンテナの停止

以下のコマンドでコンテナを停止

```
docker compose down
```

### 環境変数一覧

| 変数名                 | 役割                                      |
| ---------------------- | ----------------------------------------- |
| NEXT_PUBLIC_SUPABASE_URL    | SupabaseのProject URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY         | SupabaseのProject API keys（anon）   |
| NEXT_PUBLIC_ONESIGNAL_APP_ID             | OneSignalのappId         |
| GOOGLE_ANALYTICS_ID         | Google AnalyticsのスクリプトID       |
| GOOGLE_ADSENSE_ID             | Google AdSenseのスクリプトID         |
| RECAPTCHA_SECRET_KEY             | Google reCAPTCHAのシークレットキー                 |
| EMAIL_TO          | お問い合わせの送信先メールアドレス              |
| EMAIL_FROM                  | お問い合わせの送信元メールアドレス                  |
| SMTP_USER        | Googleアカウントのメールアドレス                  |
| SMTP_PASS | Googleアカウントのアプリパスワード   |

### コマンド一覧

| 主要なコマンド               | 実行する処理                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| pnpm install        | `node_modules`のインストール |
| pnpm run dev             | 開発環境の起動                                                          |
| pnpm run build          | Next.jsのビルド、サイトマップとRSSフィードの生成                                                     |
| pnpm run start           | ビルド済みNext.jsの起動                                                          |
| docker compose up -d --build       | コンテナのビルドと起動                                                      |
| docker compose down | コンテナの停止                                          |

<p align="right">(<a href="#top">トップへ</a>)</p>

## 5. プレフィックス

```
fix: バグ修正
feat: 新機能追加
update: 機能更新
change: 仕様変更
perf: パフォーマンス改善
refactor: コードのリファクタリング
docs: ドキュメントのみの変更
style: コードのフォーマットに関する変更
test: テストコードの変更
revert: 変更の取り消し
chore: その他の変更
```

<p align="right">(<a href="#top">トップへ</a>)</p>
