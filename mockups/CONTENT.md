# Shared content for every mockup (verbatim, do not invent claims)

Brand name on page: **muitnelis** (lowercase). Domain: muitnelis.org. GitHub org: https://github.com/muitneliss (note: org has two "s").
Location: Ho Chi Minh City, Vietnam. Org created April 2025.

## One-line positioning (hero)
EN: "A small collective in Ho Chi Minh City building tools for the coding-agent era."
VI: "Một nhóm nhỏ ở Sài Gòn làm công cụ cho kỷ nguyên coding agent."

## Supporting line
EN: "We publish what we build for ourselves: agent harnesses, autonomous implementation runs, a self-hostable data lake, and small utilities that make life easier."
VI: "Chúng tôi công bố những gì tự làm cho mình: harness cho agent, các lượt triển khai tự động, một data lake tự host, và những tiện ích nhỏ giúp cuộc sống dễ hơn."

## Primary action
EN: "See the code on GitHub" → https://github.com/muitneliss
VI: "Xem code trên GitHub"
Secondary EN: "Meet the team" (anchor to members)
Secondary VI: "Gặp nhóm"

## Project taglines in Vietnamese
- Undercroft VI: "Một raw lake bất biến, connector khai báo, và schema do bạn tự định nghĩa."
- Ymir VI: "Một harness spec cho bất kỳ repo nào, từ một cuộc phỏng vấn Socratic."
- Symphony VI: "Quản lý công việc, không phải từng phiên code."
- Text Transporter VI: "Chia sẻ văn bản nhanh giữa các thiết bị."

## Footer VI
"muitnelis · Sài Gòn · github.com/muitneliss"

## Members (exactly these three, in this order)

### cuongtranba — Cuong Tran
Avatar: ../research/avatars/cuongtranba.png (400x400). GitHub: https://github.com/cuongtranba. Site: https://trancuong.me
Role line EN: "Backend and agent tooling"
Role line VI: "Backend và công cụ cho agent"
Intro EN: "Builds Go and Rust services with clean architecture, and the tooling around Claude Code and Codex: parallel agent teams, skill stacks, session resume, and a web UI for both CLIs."
Intro VI: "Xây dịch vụ Go và Rust theo clean architecture, cùng bộ công cụ quanh Claude Code và Codex: đội agent song song, skill stack, resume phiên, và web UI cho cả hai CLI."
Facts (usable as small print): Go · Rust · C# · TypeScript · on GitHub since 2013 · 124 public repos
Notable repos: agent-teams-setup, go-scaffolding, tinkaria, wtguard, narrated-video

### thanh-dong
Avatar: ../research/avatars/thanh-dong.png. GitHub: https://github.com/thanh-dong
Role line EN: "Agent harnesses and orchestration"
Role line VI: "Harness và điều phối agent"
Intro EN: "Turns any repo into an agent-ready workspace, optimises how Claude Code routes to plugins, previews what an agent touched, and runs Symphony's autonomous implementation runs."
Intro VI: "Biến bất kỳ repo nào thành workspace sẵn sàng cho agent, tối ưu cách Claude Code định tuyến plugin, xem trước những gì agent đã chạm vào, và vận hành các lượt triển khai tự động của Symphony."
Facts: Rust · TypeScript · Go · Python · on GitHub since 2015
Notable repos: harness-repository-cc, claude-routing-optimizer, herdr-rich-preview, magikarp_skill, read-things

### yanmad27 — Doan Phan (Yan)
Avatar: ../research/avatars/yanmad27.png. GitHub: https://github.com/yanmad27. Site: https://doanphan.com
Role line EN: "Full-stack and small tools"
Role line VI: "Full-stack và công cụ nhỏ"
Intro EN: "Full-stack engineer who ships web apps end to end and small tools that scratch an itch: a Rust window manager for Windows, a Telegram expense bot, and a Claude Code plugin that answers questions from context."
Intro VI: "Kỹ sư full-stack làm web app trọn gói và những công cụ nhỏ giải quyết nhu cầu của chính mình: window manager viết bằng Rust cho Windows, bot Telegram ghi chi tiêu, và plugin Claude Code tự trả lời câu hỏi từ ngữ cảnh."
Facts: TypeScript · Go · Rust · React · NestJS · on GitHub since 2018
Bio quote (real, from his profile): "Make life easy"
Notable repos: windows-rectangle, ask-jev, money-note-bot, text-transporter

## Projects (exactly these four, in this order)

### Undercroft — public — https://github.com/muitneliss/undercroft — site https://undercroft.lowbit.link
Tagline: "An immutable raw lake, declarative connectors, and a schema you define yourself."
Detail EN: "Content-addressed raw storage on S3 or MinIO, YAML connectors instead of code, one generic Postgres table, and dbt models you write. Self-hostable, MIT. Pre-alpha."
Detail VI: "Lưu trữ thô định danh theo nội dung trên S3 hoặc MinIO, connector bằng YAML thay vì code, một bảng Postgres chung, và các model dbt bạn tự viết. Tự host, MIT. Pre-alpha."
Tags: TypeScript · Bun · Postgres · dbt · MinIO
Existing mark: ../research/refs/undercroft-mark.svg (single-ink arch, use fill currentColor)

### Ymir — public — https://github.com/muitneliss/ymir
Tagline: "A harness spec for any repo, from a Socratic interview."
Detail EN: "Explores your codebase, interviews you per concern, and emits rules, lint, CI, wiki context, and CLAUDE.md or AGENT.md. Works with Claude Code, Cursor, and Codex via skills.sh."
Detail VI: "Khám phá codebase, phỏng vấn bạn theo từng mối quan tâm, rồi sinh rules, lint, CI, wiki context, và CLAUDE.md hoặc AGENT.md. Dùng được với Claude Code, Cursor và Codex qua skills.sh."
Tags: TypeScript · Rust CLI · agent skill
Existing mark: ../research/refs/ymir-minimal.svg (navy tile, ice-blue rune)

### Symphony — public — https://github.com/muitneliss/symphony-its-everdred
Tagline: "Manage the work, not the coding sessions."
Detail EN: "Turns tracker issues into isolated, autonomous implementation runs with proof of work: CI status, PR review, walkthrough videos. Adds Claude support, GitHub Issues, and live agent logs on top of openai/symphony. Apache 2.0."
Detail VI: "Biến issue trên tracker thành các lượt triển khai tự động, cô lập, kèm bằng chứng: trạng thái CI, review PR, video walkthrough. Bổ sung Claude, GitHub Issues và log agent trực tiếp trên nền openai/symphony. Apache 2.0."
Tags: Elixir · Phoenix · Codex · Claude

### Text Transporter — private (no link) 
Tagline: "Quickly share text between devices."
Detail EN: "Paste on one device, read on another. A small utility, kept private while it settles."
Detail VI: "Dán ở thiết bị này, đọc ở thiết bị kia. Một tiện ích nhỏ, còn để riêng tư trong lúc hoàn thiện."
Tags: TypeScript

## Footer
EN: "muitnelis · Ho Chi Minh City · github.com/muitneliss"
Language toggle labels: "EN" / "VI" (mockups may show the toggle as a static control; only English copy needs to render unless the direction makes both cheap).

## Never include
Testimonials, user counts, stars counts as proof, clients, funding, pricing, hiring claims, a founding story.
