// Every word on the site lives here. The site is the team's profile told
// through its public projects: no people are shown. Do not add claims that are
// not backed by a public repository (no testimonials, counts of users,
// clients, funding, hiring), and do not list private repositories.
//
// English is server-rendered. The Vietnamese strings are emitted as a JSON
// dictionary (see `viDictionary`) and swapped in by the language toggle, so
// this file stays the single owner of both languages.

export interface Bilingual {
  en: string;
  vi: string;
}

/** Rail lane keys, one per project: `u` Undercroft, `y` Ymir, `t` Text Transporter. `m` is main. */
export type Lane = 'u' | 'y' | 't';

export interface UseCase {
  title: Bilingual;
  text: Bilingual;
}

export interface Project {
  slug: string;
  name: string;
  /** The kind of work the project stands for, shown in the index and on the contact page. */
  track: Bilingual;
  tagline: Bilingual;
  detail: Bilingual;
  useCases: UseCase[];
  /** Stack tags, joined with middle dots. Not translated. */
  tags: string;
  repo: { label: string; url: string };
  site?: { label: string; url: string };
  /** The command or artifact that gets a visitor started, when there is one. */
  start?: { key: 'install' | 'image'; value: string };
  license?: string;
  status?: string;
  lane: Lane;
  /** The project's own mark. */
  mark: 'undercroft' | 'ymir' | 'text-transporter';
}

export const brand = {
  name: 'multnelis',
  domain: 'multnelis.org',
  github: 'https://github.com/muitneliss',
  githubLabel: 'github.com/muitneliss',
  /** Forwarded by Cloudflare Email Routing to the organisation owner. */
  email: 'contact@multnelis.org',
  location: { en: 'Ho Chi Minh City', vi: 'Sài Gòn' } satisfies Bilingual,
  /** The GitHub organisation was created in April 2025. */
  since: '2025',
};

export const statement: Bilingual = {
  en: 'We build the tools we work with, and ship them in the open.',
  vi: 'Chúng tôi làm ra công cụ mình dùng, và phát hành chúng công khai.',
};

export const supporting: Bilingual = {
  en: 'multnelis is an engineering team in Ho Chi Minh City. Three public projects carry our work: a data platform you host yourself, a harness that gets any repository ready for coding agents, and a notes board that moves text between machines.',
  vi: 'multnelis là một nhóm kỹ sư ở Sài Gòn. Ba dự án công khai gánh công việc của chúng tôi: một nền tảng dữ liệu bạn tự host, một harness giúp mọi repository sẵn sàng cho coding agent, và một bảng ghi chú chuyển văn bản giữa các máy.',
};

export const actions = {
  primary: {
    label: { en: 'Explore the projects', vi: 'Xem các dự án' } satisfies Bilingual,
    href: '#projects',
  },
  secondary: {
    label: { en: 'Our code on GitHub', vi: 'Code của chúng tôi trên GitHub' } satisfies Bilingual,
    href: brand.github,
  },
};

/** The profile section: who the team is, in its own words and in repository facts. */
export const profile = {
  title: { en: 'Built for our own work first.', vi: 'Làm cho công việc của chính mình trước.' } satisfies Bilingual,
  body: {
    en: 'We started as a GitHub organisation in April 2025. We write the software our own work needs, use it ourselves, and publish it once it holds up. Everything on this page is a public repository you can read, install, and file issues against.',
    vi: 'Chúng tôi bắt đầu là một tổ chức GitHub từ tháng 4 năm 2025. Chúng tôi viết phần mềm mà công việc của mình cần, tự dùng nó, và công bố khi nó đã đứng vững. Mọi thứ trên trang này là repository công khai: bạn đọc được, cài được và mở issue được.',
  } satisfies Bilingual,
  index: { en: 'What we build', vi: 'Chúng tôi làm gì' } satisfies Bilingual,
};

export const projects: Project[] = [
  {
    slug: 'undercroft',
    name: 'Undercroft',
    track: { en: 'Data infrastructure', vi: 'Hạ tầng dữ liệu' },
    tagline: {
      en: 'An immutable raw lake, declarative connectors, and a schema you define yourself.',
      vi: 'Một raw lake bất biến, connector khai báo, và schema do bạn tự định nghĩa.',
    },
    detail: {
      en: 'Undercroft pulls your accounts into a lake you own. Raw data lands once, content-addressed and never overwritten; connectors are YAML, not code; and every table above the lake is a dbt model you wrote. Multi-tenant and self-hostable. Pre-alpha, under active construction.',
      vi: 'Undercroft kéo dữ liệu từ các tài khoản của bạn về một lake do bạn sở hữu. Dữ liệu thô chỉ ghi một lần, định danh theo nội dung và không bao giờ bị ghi đè; connector viết bằng YAML thay vì code; và mọi bảng phía trên lake là model dbt do bạn viết. Đa tenant và tự host được. Đang ở pre-alpha, còn xây dựng tích cực.',
    },
    useCases: [
      {
        title: { en: 'Bring business data home', vi: 'Đưa dữ liệu kinh doanh về nhà' },
        text: {
          en: "Pull HubSpot, Xero, Gmail and Google Drive into one store on your own S3 or MinIO, each tenant's credentials sealed.",
          vi: 'Kéo HubSpot, Xero, Gmail và Google Drive về một kho trên S3 hoặc MinIO của chính bạn, thông tin đăng nhập của từng tenant được niêm phong.',
        },
      },
      {
        title: { en: 'Model it your way', vi: 'Mô hình hoá theo cách của bạn' },
        text: {
          en: 'No business schema ships. Records land in one generic Postgres table; your dbt models, questions and dashboards sit on top.',
          vi: 'Không có schema nghiệp vụ dựng sẵn. Bản ghi vào một bảng Postgres chung; model dbt, câu hỏi và dashboard của bạn nằm phía trên.',
        },
      },
      {
        title: { en: 'Search everything at once', vi: 'Tìm mọi thứ trong một ô' },
        text: {
          en: 'One search box over records and document text, matching Vietnamese with or without tone marks.',
          vi: 'Một ô tìm kiếm cho cả bản ghi lẫn nội dung tài liệu, khớp tiếng Việt dù có dấu hay không dấu.',
        },
      },
      {
        title: { en: 'Let agents work as you', vi: 'Để agent làm việc với quyền của bạn' },
        text: {
          en: 'A CLI and an MCP server give Claude and other agents every procedure, signed in as you and never with more.',
          vi: 'Một CLI và một MCP server mở mọi thao tác cho Claude và các agent khác, đăng nhập bằng quyền của bạn và không hơn.',
        },
      },
    ],
    tags: 'TypeScript · Bun · Postgres · dbt · MinIO · MCP',
    repo: { label: 'muitneliss/undercroft', url: 'https://github.com/muitneliss/undercroft' },
    site: { label: 'undercroft.lowbit.link', url: 'https://undercroft.lowbit.link' },
    license: 'MIT',
    status: 'pre-alpha',
    lane: 'u',
    mark: 'undercroft',
  },
  {
    slug: 'ymir',
    name: 'Ymir',
    track: { en: 'Agent tooling', vi: 'Công cụ cho coding agent' },
    tagline: {
      en: 'A harness spec for any repository, from a Socratic interview.',
      vi: 'Một harness spec cho bất kỳ repository nào, từ một cuộc phỏng vấn Socratic.',
    },
    detail: {
      en: 'Ymir is an agent skill. It explores your codebase, interviews you one concern at a time, and records your decisions as a spec. Applying the spec generates the rules, lint, CI checks, wiki context and CLAUDE.md or AGENT.md; reverting undoes it. It writes no application code.',
      vi: 'Ymir là một agent skill. Nó khám phá codebase, phỏng vấn bạn từng mối quan tâm một, và ghi lại quyết định của bạn thành một spec. Áp dụng spec sẽ sinh rules, lint, kiểm tra CI, wiki context và CLAUDE.md hoặc AGENT.md; revert sẽ hoàn tác. Nó không viết code ứng dụng.',
    },
    useCases: [
      {
        title: { en: 'Make a repository agent-ready', vi: 'Chuẩn bị repository cho agent' },
        text: {
          en: 'Turn the conventions a team keeps in its head into rules, lint and CI that a coding agent follows.',
          vi: 'Biến những quy ước cả nhóm vẫn giữ trong đầu thành rules, lint và CI mà coding agent tuân theo.',
        },
      },
      {
        title: { en: 'Keep the reasons on record', vi: 'Lưu lại lý do của mỗi quyết định' },
        text: {
          en: 'Each choice is probed for its why, given a grounded recommendation, and saved with its rationale.',
          vi: 'Mỗi lựa chọn được hỏi đến tận lý do, nhận một đề xuất có căn cứ, và được lưu cùng lập luận của nó.',
        },
      },
      {
        title: { en: 'Bring the agent you use', vi: 'Dùng agent bạn đang có' },
        text: {
          en: 'Installs through the skills CLI for Claude Code, Cursor, Codex and other agents. No registry account, only git.',
          vi: 'Cài qua skills CLI cho Claude Code, Cursor, Codex và các agent khác. Không cần tài khoản registry, chỉ cần git.',
        },
      },
      {
        title: { en: 'Try it without risk', vi: 'Thử mà không sợ hỏng' },
        text: {
          en: 'Applying backs up every file it overwrites, and one revert undoes the last apply.',
          vi: 'Khi áp dụng, mọi tệp bị ghi đè đều được sao lưu, và một lần revert hoàn tác lần áp dụng gần nhất.',
        },
      },
    ],
    tags: 'Agent skill · TypeScript · Bun · skills.sh',
    repo: { label: 'muitneliss/ymir', url: 'https://github.com/muitneliss/ymir' },
    site: { label: 'skills.sh/muitneliss/ymir', url: 'https://skills.sh/muitneliss/ymir' },
    start: { key: 'install', value: 'npx skills@latest add muitneliss/ymir' },
    status: 'released',
    lane: 'y',
    mark: 'ymir',
  },
  {
    slug: 'text-transporter',
    name: 'Text Transporter',
    track: { en: 'Everyday utilities', vi: 'Tiện ích hằng ngày' },
    tagline: {
      en: 'Type a name. Whatever you paste there follows you to any machine.',
      vi: 'Gõ một cái tên. Mọi thứ bạn dán vào đó theo bạn sang bất kỳ máy nào.',
    },
    detail: {
      en: 'A board of sticky notes at a name you choose. Open the same name on a laptop, a phone or a server’s browser and the notes are there. It runs as one container, with its notes in a single SQLite file.',
      vi: 'Một bảng ghi chú dán ở một cái tên bạn chọn. Mở cùng cái tên đó trên laptop, điện thoại hay trình duyệt của một máy chủ, ghi chú đã có sẵn. Nó chạy trong một container, ghi chú nằm trong một tệp SQLite duy nhất.',
    },
    useCases: [
      {
        title: { en: 'Move text between machines', vi: 'Chuyển văn bản giữa các máy' },
        text: {
          en: 'Paste a command, a link or a log on one device and copy it on another, without email or chat.',
          vi: 'Dán một lệnh, một đường link hay một đoạn log ở máy này và copy ở máy kia, không cần email hay chat.',
        },
      },
      {
        title: { en: 'Keep the snippets you reuse', vi: 'Giữ những đoạn hay dùng lại' },
        text: {
          en: 'Pin the notes you come back to, colour them, and filter by colour or search.',
          vi: 'Ghim những ghi chú bạn hay quay lại, tô màu, và lọc theo màu hoặc tìm kiếm.',
        },
      },
      {
        title: { en: 'Read code as code', vi: 'Đọc code đúng là code' },
        text: {
          en: 'Switch a note to Markdown to render headings, links and syntax-highlighted code blocks.',
          vi: 'Chuyển ghi chú sang Markdown để hiển thị tiêu đề, đường link và khối code có tô màu cú pháp.',
        },
      },
    ],
    tags: 'Next.js · React · SQLite · Docker',
    repo: { label: 'muitneliss/text-transporter', url: 'https://github.com/muitneliss/text-transporter' },
    start: { key: 'image', value: 'ghcr.io/muitneliss/text-transporter' },
    lane: 't',
    mark: 'text-transporter',
  },
];

/** How the team works, each principle pointing at the repositories that show it. */
export const principles = {
  title: { en: 'How we work', vi: 'Cách chúng tôi làm việc' } satisfies Bilingual,
  items: [
    {
      key: 'own',
      title: { en: 'Own the data and the stack.', vi: 'Làm chủ dữ liệu và hạ tầng.' },
      text: {
        en: 'Undercroft is self-hostable and MIT-licensed; Text Transporter is one container and one SQLite file. What we build runs where you decide.',
        vi: 'Undercroft tự host được và theo giấy phép MIT; Text Transporter là một container và một tệp SQLite. Những gì chúng tôi làm chạy ở nơi bạn quyết định.',
      },
      proof: 'undercroft · text-transporter',
    },
    {
      key: 'agents',
      title: { en: 'Write the rules down, for people and agents.', vi: 'Viết quy tắc ra, cho cả người lẫn agent.' },
      text: {
        en: 'Our main repositories carry their conventions as agent instructions and skills, so a coding agent works under the same rules as a person. Ymir exists to write that harness for any repository.',
        vi: 'Các repository chính của chúng tôi mang quy ước dưới dạng hướng dẫn và skill cho agent, để coding agent làm việc theo cùng quy tắc như con người. Ymir ra đời để viết harness đó cho mọi repository.',
      },
      proof: 'AGENTS.md · skills',
    },
    {
      key: 'ship',
      title: { en: 'Ship small, in the open.', vi: 'Phát hành từng phần nhỏ, công khai.' },
      text: {
        en: 'Work lands through pull requests with CI, and Undercroft and Ymir cut every release with release-please, changelog included.',
        vi: 'Công việc vào nhánh chính qua pull request có CI, và Undercroft cùng Ymir phát hành mỗi phiên bản bằng release-please, kèm changelog.',
      },
      proof: 'pull requests · release-please',
    },
  ],
};

/** The closing call to action on the landing page. */
export const closing = {
  title: {
    en: 'Use it, fork it, tell us what breaks.',
    vi: 'Dùng thử, fork, và báo cho chúng tôi chỗ hỏng.',
  } satisfies Bilingual,
  lead: {
    en: 'Every repository takes issues on GitHub. For anything else, one address reaches the whole team.',
    vi: 'Mọi repository đều nhận issue trên GitHub. Với những việc khác, một địa chỉ tới được cả nhóm.',
  } satisfies Bilingual,
  action: { en: 'Write to us', vi: 'Viết cho chúng tôi' } satisfies Bilingual,
};

/** The /contact page: one address, then each project and where to raise it. */
export const contact = {
  title: { en: 'Talk to the team.', vi: 'Nói chuyện với nhóm.' } satisfies Bilingual,
  lead: {
    en: 'One address reaches all of us. For a specific project, its repository is the fastest route: every one takes issues on GitHub.',
    vi: 'Một địa chỉ tới được cả nhóm. Với một dự án cụ thể, repository của nó là đường nhanh nhất: dự án nào cũng nhận issue trên GitHub.',
  } satisfies Bilingual,
  action: { en: 'Email us', vi: 'Gửi email cho chúng tôi' } satisfies Bilingual,
  projects: { en: 'Projects', vi: 'Dự án' } satisfies Bilingual,
  metaTitle: 'Contact — multnelis',
  metaDescription: 'Write to contact@multnelis.org, or open an issue on Undercroft, Ymir, or Text Transporter.',
};

/** Rendered as "multnelis · <place> · github.com/muitneliss · contact@multnelis.org". */
export const footer = {
  place: brand.location,
  domain: brand.domain,
};

/** Landmark and control names read by assistive technology, keyed as `ui.*`. */
export const ui: Record<string, Bilingual> = {
  'ui.introduction': { en: 'Introduction', vi: 'Giới thiệu' },
  'ui.profile': { en: 'About the team', vi: 'Về nhóm' },
  'ui.projects': { en: 'Projects', vi: 'Dự án' },
  'ui.useCases': { en: 'Use cases', vi: 'Tình huống sử dụng' },
  'ui.language': { en: 'Language', vi: 'Ngôn ngữ' },
  'ui.contact': { en: 'Contact', vi: 'Liên hệ' },
  'ui.home': { en: 'Home', vi: 'Trang chủ' },
  'ui.contactRoutes': { en: 'Every contact route', vi: 'Mọi cách liên hệ' },
};

/** Every project lane, in rail order. */
export const lanes: Lane[] = projects.map((p) => p.lane);

/** The repository path a project answers to, as a CODEOWNERS line would name it. */
export const projectPath = (p: Project): string => `/${p.repo.label.split('/')[1]}`;

/**
 * Every translatable node on the site, keyed by its `data-i18n` attribute.
 * Components must use these exact keys; the toggle swaps `textContent`.
 */
export const i18nEntries = (): Record<string, Bilingual> => {
  const entries: Record<string, Bilingual> = {
    'hero.statement': statement,
    'hero.supporting': supporting,
    'actions.primary': actions.primary.label,
    'actions.secondary': actions.secondary.label,
    'profile.title': profile.title,
    'profile.body': profile.body,
    'profile.index': profile.index,
    'principles.title': principles.title,
    'closing.title': closing.title,
    'closing.lead': closing.lead,
    'closing.action': closing.action,
    'footer.place': footer.place,
    'contact.title': contact.title,
    'contact.lead': contact.lead,
    'contact.action': contact.action,
    'contact.projects': contact.projects,
    ...ui,
  };
  for (const p of projects) {
    entries[`project.${p.slug}.track`] = p.track;
    entries[`project.${p.slug}.tagline`] = p.tagline;
    entries[`project.${p.slug}.detail`] = p.detail;
    p.useCases.forEach((u, i) => {
      entries[`project.${p.slug}.use.${i}.title`] = u.title;
      entries[`project.${p.slug}.use.${i}.text`] = u.text;
    });
  }
  for (const item of principles.items) {
    entries[`principles.${item.key}.title`] = item.title;
    entries[`principles.${item.key}.text`] = item.text;
  }
  return entries;
};

/** The Vietnamese half of `i18nEntries`, emitted to the page as JSON. */
export const viDictionary = (): Record<string, string> =>
  Object.fromEntries(Object.entries(i18nEntries()).map(([key, value]) => [key, value.vi]));
