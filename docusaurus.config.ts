import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = process.env.SITE_URL ?? 'https://calendar-management-app.github.io';
const baseUrl = process.env.BASE_URL ?? '/';
const organizationName = process.env.GITHUB_REPOSITORY_OWNER ?? 'calendar-management-app';
const projectName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'calendar-management-app';

const config: Config = {
  title: '인턴핑 사용 설명서',
  tagline: 'Microsoft Teams에서 인턴 일정 확인, 투입 예약, 승인 및 Outlook 연동',
  favicon: 'img/mascot-walking.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: siteUrl,
  baseUrl,

  organizationName,
  projectName,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    metadata: [
      {name: 'theme-color', content: '#0f6cbd'},
      {
        name: 'keywords',
        content: 'Microsoft Teams, 인턴 일정, 투입 예약, 승인, Outlook, ICS, 인턴핑',
      },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '인턴핑',
      logo: {
        alt: 'InternPing',
        src: 'img/header-head.png',
      },
      items: [
        {
          to: '/docs/installation',
          label: '설치',
          position: 'right',
          className: 'navbar-cta navbar-cta--secondary',
        },
        {
          to: '/docs/user-guide',
          label: '사용자 가이드',
          position: 'right',
          className: 'navbar-cta navbar-cta--primary',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {label: '설치', to: '/docs/installation'},
        {label: '사용자 가이드', to: '/docs/user-guide'},
        {label: '주요 기능', to: '/docs/features'},
        {label: '시스템 구조', to: '/docs/architecture'},
        {label: 'Microsoft Teams', href: 'https://www.microsoft.com/microsoft-teams/'},
      ],
      copyright: `© ${new Date().getFullYear()} 인턴핑. Microsoft Teams를 위한 인턴 일정 관리 앱입니다.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
