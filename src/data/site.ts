// Every word on the landing page lives here. Copy is verbatim from
// mockups/CONTENT.md; do not add claims that are not backed by a repository
// or a member profile (no testimonials, counts, clients, funding, hiring).
//
// English is server-rendered. The Vietnamese strings are emitted as a JSON
// dictionary (see `viDictionary`) and swapped in by the language toggle, so
// this file stays the single owner of both languages.

import type { ImageMetadata } from 'astro';

import avatarCuong from '~/assets/images/members/cuongtranba.png';
import avatarThanh from '~/assets/images/members/thanh-dong.png';
import avatarYan from '~/assets/images/members/yanmad27.png';
import iconCuong from '~/assets/images/members/icon-cuongtranba.png';
import iconThanh from '~/assets/images/members/icon-thanh-dong.png';
import iconYan from '~/assets/images/members/icon-yanmad27.png';

export interface Bilingual {
  en: string;
  vi: string;
}

/** Rail lane keys: `c` cuongtranba, `t` thanh-dong, `y` yanmad27, `m` main. */
export type Lane = 'c' | 't' | 'y';

export interface Repo {
  name: string;
  url: string;
}

export interface Member {
  handle: string;
  /** Display name; equals the handle when the profile has none. */
  name: string;
  role: Bilingual;
  intro: Bilingual;
  /** Small print: languages, GitHub tenure, public repo count. */
  facts: Bilingual;
  /** Real bio quote from the GitHub profile, if any. */
  quote?: string;
  repos: Repo[];
  github: string;
  site?: string;
  avatar: ImageMetadata;
  /** Domain icon: an object standing for what the member builds, in the lane colour. */
  icon: ImageMetadata;
  /** What the domain icon depicts, for assistive tech. */
  iconAlt: Bilingual;
  lane: Lane;
  /** Theme token the lane draws with. */
  colour: 'vermilion' | 'cobalt' | 'jade';
}

export interface Project {
  slug: string;
  name: string;
  tagline: Bilingual;
  /** Absent when the repository is private: the project is named, not linked. */
  repo?: { label: string; url: string };
  /** Existing project mark, when one exists. */
  mark?: 'undercroft' | 'ymir';
}

export const brand = {
  name: 'multnelis',
  domain: 'multnelis.org',
  github: 'https://github.com/muitneliss',
  githubLabel: 'github.com/muitneliss',
  /** Forwarded by Cloudflare Email Routing to the organisation owner. */
  email: 'contact@multnelis.org',
  location: { en: 'Ho Chi Minh City', vi: 'Sài Gòn' } satisfies Bilingual,
};

/** The /contact page: one line and one address. */
export const contact = {
  title: { en: 'One address reaches all of us.', vi: 'Một địa chỉ tới được cả nhóm.' } satisfies Bilingual,
  action: { en: 'Email us', vi: 'Gửi email cho chúng tôi' } satisfies Bilingual,
  metaTitle: 'Contact — multnelis',
  metaDescription:
    'Write to multnelis at contact@multnelis.org. One address reaches the whole team in Ho Chi Minh City.',
};

export const statement: Bilingual = {
  en: 'A small collective in Ho Chi Minh City building tools for the coding-agent era.',
  vi: 'Một nhóm nhỏ ở Sài Gòn làm công cụ cho kỷ nguyên coding agent.',
};

export const supporting: Bilingual = {
  en: 'We publish what we build for ourselves: agent harnesses, autonomous implementation runs, a self-hostable data lake, and small utilities that make life easier.',
  vi: 'Chúng tôi công bố những gì tự làm cho mình: harness cho agent, các lượt triển khai tự động, một data lake tự host, và những tiện ích nhỏ giúp cuộc sống dễ hơn.',
};

export const actions = {
  primary: {
    label: { en: 'See the code on GitHub', vi: 'Xem code trên GitHub' } satisfies Bilingual,
    href: brand.github,
  },
  secondary: {
    label: { en: 'Meet the team', vi: 'Gặp nhóm' } satisfies Bilingual,
    href: '#members',
  },
};

const repos = (handle: string, names: string[]): Repo[] =>
  names.map((name) => ({ name, url: `https://github.com/${handle}/${name}` }));

export const members: Member[] = [
  {
    handle: 'cuongtranba',
    name: 'Cuong Tran',
    role: { en: 'Backend and agent tooling', vi: 'Backend và công cụ cho agent' },
    intro: {
      en: 'Builds Go and Rust services with clean architecture, and the tooling around Claude Code and Codex: parallel agent teams, skill stacks, session resume, and a web UI for both CLIs.',
      vi: 'Xây dịch vụ Go và Rust theo clean architecture, cùng bộ công cụ quanh Claude Code và Codex: đội agent song song, skill stack, resume phiên, và web UI cho cả hai CLI.',
    },
    facts: {
      en: 'Go · Rust · C# · TypeScript · on GitHub since 2013 · 124 public repos',
      vi: 'Go · Rust · C# · TypeScript · trên GitHub từ 2013 · 124 repo công khai',
    },
    repos: repos('cuongtranba', ['agent-teams-setup', 'go-scaffolding', 'tinkaria', 'wtguard', 'narrated-video']),
    github: 'https://github.com/cuongtranba',
    site: 'https://trancuong.me',
    avatar: avatarCuong,
    icon: iconCuong,
    iconAlt: { en: 'A terminal wired to a stack of servers', vi: 'Một terminal nối với dãy máy chủ' },
    lane: 'c',
    colour: 'vermilion',
  },
  {
    handle: 'thanh-dong',
    name: 'thanh-dong',
    role: { en: 'Agent harnesses and orchestration', vi: 'Harness và điều phối agent' },
    intro: {
      en: "Turns any repo into an agent-ready workspace, optimises how Claude Code routes to plugins, previews what an agent touched, and runs Symphony's autonomous implementation runs.",
      vi: 'Biến bất kỳ repo nào thành workspace sẵn sàng cho agent, tối ưu cách Claude Code định tuyến plugin, xem trước những gì agent đã chạm vào, và vận hành các lượt triển khai tự động của Symphony.',
    },
    facts: {
      en: 'Rust · TypeScript · Go · Python · on GitHub since 2015',
      vi: 'Rust · TypeScript · Go · Python · trên GitHub từ 2015',
    },
    repos: repos('thanh-dong', [
      'harness-repository-cc',
      'claude-routing-optimizer',
      'herdr-rich-preview',
      'magikarp_skill',
      'read-things',
    ]),
    github: 'https://github.com/thanh-dong',
    avatar: avatarThanh,
    icon: iconThanh,
    iconAlt: { en: 'A hub harnessed to three nodes', vi: 'Một hub nối với ba nút' },
    lane: 't',
    colour: 'cobalt',
  },
  {
    handle: 'yanmad27',
    name: 'Doan Phan',
    role: { en: 'Full-stack and small tools', vi: 'Full-stack và công cụ nhỏ' },
    intro: {
      en: 'Full-stack engineer who ships web apps end to end and small tools that scratch an itch: a Rust window manager for Windows, a Telegram expense bot, and a Claude Code plugin that answers questions from context.',
      vi: 'Kỹ sư full-stack làm web app trọn gói và những công cụ nhỏ giải quyết nhu cầu của chính mình: window manager viết bằng Rust cho Windows, bot Telegram ghi chi tiêu, và plugin Claude Code tự trả lời câu hỏi từ ngữ cảnh.',
    },
    facts: {
      en: 'TypeScript · Go · Rust · React · NestJS · on GitHub since 2018',
      vi: 'TypeScript · Go · Rust · React · NestJS · trên GitHub từ 2018',
    },
    quote: 'Make life easy',
    repos: repos('yanmad27', ['windows-rectangle', 'ask-jev', 'money-note-bot', 'text-transporter']),
    github: 'https://github.com/yanmad27',
    site: 'https://doanphan.com',
    avatar: avatarYan,
    icon: iconYan,
    iconAlt: {
      en: 'A browser window with a wrench and a paper plane',
      vi: 'Cửa sổ trình duyệt với cờ lê và máy bay giấy',
    },
    lane: 'y',
    colour: 'jade',
  },
];

export const projects: Project[] = [
  {
    slug: 'undercroft',
    name: 'Undercroft',
    tagline: {
      en: 'An immutable raw lake, declarative connectors, and a schema you define yourself.',
      vi: 'Một raw lake bất biến, connector khai báo, và schema do bạn tự định nghĩa.',
    },
    repo: { label: 'muitneliss/undercroft', url: 'https://github.com/muitneliss/undercroft' },
    mark: 'undercroft',
  },
  {
    slug: 'ymir',
    name: 'Ymir',
    tagline: {
      en: 'A harness spec for any repo, from a Socratic interview.',
      vi: 'Một harness spec cho bất kỳ repo nào, từ một cuộc phỏng vấn Socratic.',
    },
    repo: { label: 'muitneliss/ymir', url: 'https://github.com/muitneliss/ymir' },
    mark: 'ymir',
  },
  {
    slug: 'symphony',
    name: 'Symphony',
    tagline: {
      en: 'Manage the work, not the coding sessions.',
      vi: 'Quản lý công việc, không phải từng phiên code.',
    },
    repo: { label: 'muitneliss/symphony-its-everdred', url: 'https://github.com/muitneliss/symphony-its-everdred' },
  },
  {
    slug: 'text-transporter',
    name: 'Text Transporter',
    tagline: {
      en: 'Quickly share text between devices.',
      vi: 'Chia sẻ văn bản nhanh giữa các thiết bị.',
    },
  },
];

/** Rendered as "multnelis · <place> · github.com/muitneliss", the CONTENT.md footer line in both languages. */
export const footer = {
  line: {
    en: 'multnelis · Ho Chi Minh City · github.com/muitneliss',
    vi: 'multnelis · Sài Gòn · github.com/muitneliss',
  } satisfies Bilingual,
  place: brand.location,
  domain: brand.domain,
};

/** Landmark names read by assistive technology, keyed as `ui.*`. */
export const ui: Record<string, Bilingual> = {
  'ui.introduction': { en: 'Introduction', vi: 'Giới thiệu' },
  'ui.projects': { en: 'Projects', vi: 'Dự án' },
  'ui.language': { en: 'Language', vi: 'Ngôn ngữ' },
  'ui.contact': { en: 'Contact', vi: 'Liên hệ' },
  'ui.home': { en: 'Home', vi: 'Trang chủ' },
};

/**
 * Every translatable node on the page, keyed by its `data-i18n` attribute.
 * Components must use these exact keys; the toggle swaps `textContent`.
 */
export const i18nEntries = (): Record<string, Bilingual> => {
  const entries: Record<string, Bilingual> = {
    'hero.statement': statement,
    'hero.supporting': supporting,
    'actions.primary': actions.primary.label,
    'actions.secondary': actions.secondary.label,
    'footer.place': footer.place,
    'contact.title': contact.title,
    'contact.action': contact.action,
    ...ui,
  };
  for (const m of members) {
    entries[`member.${m.handle}.role`] = m.role;
    entries[`member.${m.handle}.intro`] = m.intro;
    entries[`member.${m.handle}.facts`] = m.facts;
    entries[`member.${m.handle}.iconAlt`] = m.iconAlt;
  }
  for (const p of projects) {
    entries[`project.${p.slug}.tagline`] = p.tagline;
  }
  return entries;
};

/** The Vietnamese half of `i18nEntries`, emitted to the page as JSON. */
export const viDictionary = (): Record<string, string> =>
  Object.fromEntries(Object.entries(i18nEntries()).map(([key, value]) => [key, value.vi]));
