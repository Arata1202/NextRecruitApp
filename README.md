<div id="top"></div>

<div align="right">
  
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Arata1202/NextRecruitApp/vercel_deploy.yml)
![GitHub License](https://img.shields.io/github/license/Arata1202/NextRecruitApp)

</div>

![3](/.docs/readme/images/title.png)

## 目次

- [リクビジョン](#top)
  - [目次](#目次)
  - [リンク一覧](#リンク一覧)
  - [主な機能一覧](#主な機能一覧)
  - [使用技術](#使用技術)
  - [環境構築](#環境構築)
  - [ディレクトリ構成](#ディレクトリ構成)
  - [Gitの運用](#Gitの運用)
    - [ブランチ](#ブランチ)
    - [コミットメッセージの記法](#コミットメッセージの記法)

## リンク一覧

<ul><li><a href="https://rikuvision.realunivlog.com/">リクビジョン</a></li></ul>

<p align="right">(<a href="#top">トップへ</a>)</p>

## 主な機能一覧

※本番環境ではGoogle AdSenseによる広告が表示されます。

| アカウント登録ページ                                                                       | 　ログインページ                                                                    |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| ![11](/.docs/readme/images/11.png)                                                         | ![12](/.docs/readme/images/12.png)                                                  |
| 新規アカウント登録を行うページです。ソーシャルアカウントの場合は登録する必要はありません。 | ログインを行うページです。Google, X, GitHubのソーシャルログインにも対応しています。 |

| パスワードリセットページ                             | 　就活イベントページ                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![13](/.docs/readme/images/13.png)                   | ![14](/.docs/readme/images/14.png)                                                                           |
| パスワードを忘れた場合に、リセットを行うページです。 | 登録した就活イベントを、明後日まで一目で確認することができます。詳細から、企業ごとの選考状況を確認できます。 |

| カレンダーページ                                                                                                                       | 　企業管理ページ                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![15](/.docs/readme/images/15.png)                                                                                                     | ![16](/.docs/readme/images/16.png)                                                                           |
| 登録した就活イベント（青）とToDoタスク（緑）を、カレンダーで閲覧することができます。イベントをクリックすることで、詳細を確認できます。 | 選考を受ける企業を登録することができます。星で志望度を表します。詳細から、企業情報と選考状況を登録できます。 |

| 企業情報管理ページ                                     | 　選考状況管理ページ                         |
| ------------------------------------------------------ | -------------------------------------------- |
| ![17](/.docs/readme/images/17.png)                     | ![18](/.docs/readme/images/18.png)           |
| 登録した企業ごとに、詳細情報を登録することができます。 | 登録した企業ごとに、選考状況を登録できます。 |

| ESテンプレートページ                                           | 　自己分析ページ                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![19](/.docs/readme/images/19.png)                             | ![20](/.docs/readme/images/20.png)                                                                   |
| ESで使い回し可能な、テンプレートを保存しておくことができます。 | 予め用意された質問をセレクトボックスから選び、答えていくことで自己分析を行うことができるページです。 |

| ToDoリストページ                                                                                               | 　お問い合わせページ                 |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ![21](/.docs/readme/images/21.png)                                                                             | ![22](/.docs/readme/images/22.png)   |
| ToDoタスクを登録することができます。完了をクリックすることで実行済みとなります。完了したタスクは復元可能です。 | 管理者にお問い合わせするページです。 |

<p align="right">(<a href="#top">トップへ</a>)</p>

## 使用技術

| Category          | Technology Stack                              |
| ----------------- | --------------------------------------------- |
| Frontend          | Next.js, TypeScript, Tailwind CSS             |
| Backend           | Go                                            |
| Database          | Supabase（PostgreSQL）                        |
| Infrastructure    | Cloudflare Pages, Vercel                      |
| Environment setup | Docker                                        |
| CI/CD             | GitHub Actions                                |
| Design            | Canva                                         |
| Google            | AdSense, Analytics, Search Console, reCAPTCHA |
| etc.              | PWA, OneSignal                                |

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境構築

```
# リポジトリのクローン
git clone git@github.com:Arata1202/NextRecruitApp.git
cd NextRecruitApp

# .env.exampleから.envを作成
mv .env.example .env

# .envの編集
vi .env

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
❯ tree -a -I "node_modules|.next|.git|out|.vercel|_|.DS_Store|.env|next-env.d.ts|tmp" -L 3
.
├── .air.toml
├── .docker
│   ├── go
│   │   └── Dockerfile
│   └── js
│       └── Dockerfile
├── .docs
│   └── readme
│       └── images
├── .env.example
├── .github
│   └── workflows
│       └── vercel_deploy.yml
├── .gitignore
├── .husky
│   └── pre-commit
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .vercelignore
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── LICENSE
├── README.md
├── api
│   ├── recaptcha.go
│   └── sendemail.go
├── cmd
│   └── main.go
├── docker-compose.yml
├── eslint.config.mjs
├── go.mod
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── OneSignalSDKWorker.js
│   ├── favicon.ico
│   ├── googlec56af014abd74f5c.html
│   ├── images
│   │   ├── head
│   │   ├── icons
│   │   ├── og
│   │   └── top
│   └── robots.txt
├── src
│   ├── app
│   │   ├── contact
│   │   ├── copyright
│   │   ├── disclaimer
│   │   ├── fonts
│   │   ├── layout.tsx
│   │   ├── link
│   │   ├── manifest.json
│   │   ├── not-found.module.css
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── privacy
│   │   ├── service
│   │   └── sitemap.ts
│   ├── components
│   │   ├── Common
│   │   ├── Features
│   │   ├── Pages
│   │   └── ThirdParties
│   ├── constants
│   │   ├── data.ts
│   │   └── page.ts
│   ├── contents
│   │   ├── copyright.ts
│   │   ├── disclaimer.ts
│   │   ├── link.ts
│   │   └── privacy.ts
│   ├── hooks
│   │   ├── useA2hs.ts
│   │   ├── useMutationObserver.ts
│   │   └── useSocialLogin.ts
│   ├── libs
│   │   └── supabase.js
│   ├── styles
│   │   └── globals.css
│   └── types
│       ├── a2hs.ts
│       └── form.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json

39 directories, 52 files
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## Gitの運用

### ブランチ

GitHub Flowを使用する。
masterとfeatureブランチで運用する。

| ブランチ名 |   役割   | 派生元 | マージ先 |
| :--------: | :------: | :----: | :------: |
|   master   | 本番環境 |   -    |    -     |
| feature/\* | 機能開発 | master |  master  |

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
