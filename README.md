<div id="top"></div>

<div align="right">
  
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Arata1202/NextRecruitApp/vercel_deploy.yml)
![GitHub License](https://img.shields.io/github/license/Arata1202/NextRecruitApp)

</div>

![3](/public/images/readme/title.png)

## 目次
- [リクビジョン](#top)
  - [目次](#目次)
  - [リンク一覧](#リンク一覧)
  - [主な機能一覧](#主な機能一覧)
  - [使用技術](#使用技術)
  - [環境構築](#環境構築)
    - [リポジトリのクローン](#リポジトリのクローン)
    - [pnpmの場合](#pnpmの場合)
      - [開発環境](#開発環境)
      - [本番環境](#本番環境)
    - [Dockerの場合](#Dockerの場合)
  - [ディレクトリ構成](#ディレクトリ構成)
  - [Gitの運用](#Gitの運用)
    - [ブランチ](#ブランチ)
    - [コミットメッセージの記法](#コミットメッセージの記法)

## リンク一覧
<ul><li><a href="https://rikuvision.realunivlog.com/">リクビジョン</a></li></ul>

<p align="right">(<a href="#top">トップへ</a>)</p>

## 主な機能一覧
| アカウント登録ページ |　ログインページ |
| ---- | ---- |
| ![11](/public/images/readme/11.png) | ![12](/public/images/readme/12.png) |
| 新規アカウント登録を行うページです。ソーシャルアカウントの場合は登録する必要はありません。 | ログインを行うページです。Google, X, GitHubのソーシャルログインにも対応しています。  |

| パスワードリセットページ |　就活イベントページ |
| ---- | ---- |
| ![13](/public/images/readme/13.png) | ![14](/public/images/readme/14.png) |
| パスワードを忘れた場合に、リセットを行うページです。 | 登録した就活イベントを、明後日まで一目で確認することができます。詳細から、企業ごとの選考状況を確認できます。 |

| カレンダーページ |　企業管理ページ |
| ---- | ---- |
| ![15](/public/images/readme/15.png) | ![16](/public/images/readme/16.png) |
| 登録した就活イベント（青）とToDoタスク（緑）を、カレンダーで閲覧することができます。イベントをクリックすることで、詳細を確認できます。 | 選考を受ける企業を登録することができます。星で志望度を表します。詳細から、企業情報と選考状況を登録できます。 |

| 企業情報管理ページ |　選考状況管理ページ |
| ---- | ---- |
| ![17](/public/images/readme/17.png) | ![18](/public/images/readme/18.png) |
| 登録した企業ごとに、詳細情報を登録することができます。 | 登録した企業ごとに、選考状況を登録できます。 |

| ESテンプレートページ |　自己分析ページ |
| ---- | ---- |
| ![19](/public/images/readme/19.png) | ![20](/public/images/readme/20.png) |
| ESで使い回し可能な、テンプレートを保存しておくことができます。 | 予め用意された質問をセレクトボックスから選び、答えていくことで自己分析を行うことができるページです。 |

| ToDoリストページ |　お問い合わせページ |
| ---- | ---- |
| ![21](/public/images/readme/21.png) | ![22](/public/images/readme/22.png) |
| ToDoタスクを登録することができます。完了をクリックすることで実行済みとなります。完了したタスクは復元可能です。 | 管理者にお問い合わせするページです。 |

<p align="right">(<a href="#top">トップへ</a>)</p>

## 使用技術

| Category          | Technology Stack                                     |
| ----------------- | --------------------------------------------------   |
| Frontend          | Next.js, TypeScript, Tailwind CSS                    |
| Infrastructure    | Vercel                                               |
| Database          | Supabase（PostgreSQL）                                |
| Environment setup | Docker, Nginx                                        |
| CI/CD             | GitHub Actions                                       |
| Design            | Canva                                                |
| Google            | AdSense, Analytics, Search Console, reCAPTCHA        |
| etc.              | PWA, OneSignal                                       |

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境構築

### リポジトリのクローン

```
# リポジトリのクローン
git clone git@github.com:Arata1202/NextRecruitApp.git
cd NextRecruitApp

# .env.exampleから.envを作成
mv .env.example .env

# .envの編集
vi .env
```

### pnpmの場合

#### 開発環境

```
# node_modulesのインストール
pnpm install

# 開発サーバーの立ち上げ
pnpm dev

# ブラウザにアクセス
http:localhost:3000
```

#### 本番環境

```
# node_modulesのインストール
pnpm install

# Next.jsのビルド
pnpm build

# ビルドしたNext.jsの起動
pnpm start

# ブラウザにアクセス
http:localhost:3000
```

### Dockerの場合

```
# コンテナのビルドと起動
docker compose up -d --build

# ブラウザにアクセス
http:localhost:3000

# コンテナの停止
docker compose down
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

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

## Gitの運用

### ブランチ

Github-flowを使用する。
masterとfeatureブランチで運用する。

| ブランチ名 |   役割   | 派生元 | マージ先 |
| :--------: | :------: | :----: | :------: |
|    master    | 本番環境 |   -    |    -     |
| feature/\* | 機能開発 |  master  |   master   |

### コミットメッセージの記法

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
