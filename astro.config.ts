import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, fontProviders } from 'astro/config';

import { unified } from '@astrojs/markdown-remark';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',

  // Native Fonts API: self-hosts, subsets (latin + vietnamese) and preloads the
  // three faces of the site, and generates metric-adjusted fallbacks. Injected
  // via <Font /> in Layout.astro and consumed through `--aw-font-*` in
  // CustomStyles.astro.
  //
  //   Anybody          display: the wordmark and every heading, set wide (wdth 125)
  //   Hanken Grotesk   body
  //   JetBrains Mono   handles, facts, metadata, the branch chip
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Anybody',
      cssVariable: '--font-anybody',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin', 'vietnamese'],
      fallbacks: ['sans-serif'],
      // Anybody is a two-axis variable font; ask Google for the width axis too
      // so `font-stretch: 125%` resolves to the wide instance.
      options: { experimental: { variableAxis: { wdth: [['50', '150']] } } },
    },
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-hanken',
      weights: ['300 800'],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'vietnamese'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'vietnamese'],
      fallbacks: ['monospace'],
    },
  ],

  integrations: [
    sitemap(),
    mdx(),
    icon({
      // Local SVG icons (used as <Icon name="file-name" />): the Undercroft mark
      // and the branch glyph. No icon-font sets are bundled.
      iconDir: 'src/assets/icons',
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      // csso off on purpose: its parser doesn't understand the media range
      // syntax Tailwind v4 emits for breakpoints (`@media (width>=48rem)`) and
      // silently drops every one of those blocks — the site then renders as if
      // all `md:`/`lg:` classes were missing. lightningcss parses it correctly.
      CSS: { csso: false, lightningcss: { minify: true } },
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    // Astro's default Sharp service handles local images.
    //
    // Most remote CDN images (Unsplash, Cloudinary, Imgix…) are routed by
    // src/components/common/Image.astro through `unpic`, which rewrites the
    // URL with CDN-side query parameters and serves it straight from the
    // provider — Astro never downloads it, so they don't need to be listed.
    //
    // `domains` only matters for remote URLs that fall through to Astro's
    // native <Image /> (i.e. providers Unpic can't detect, like Pixabay).
    // Listed entries are authorized to be processed by Sharp.
    // Unsplash is listed so post covers can be rendered as real 1200×626 Open Graph images.
    domains: ['cdn.pixabay.com', 'images.unsplash.com'],

    // Emit responsive styles for the native <Image layout=…> used by
    // src/components/common/Image.astro (local images). Utility classes on
    // each usage still win, since these styles use low-specificity selectors.
    responsiveStyles: true,
  },

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin],
    }),
    shikiConfig: {
      // Code blocks follow the site theme; see the `.astro-code` rules in tailwind.css.
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
