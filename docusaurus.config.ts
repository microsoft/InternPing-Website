import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = process.env.SITE_URL ?? 'https://calendar-management-app.github.io';
const baseUrl = process.env.BASE_URL ?? '/';
const organizationName = process.env.GITHUB_REPOSITORY_OWNER ?? 'calendar-management-app';
const projectName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'calendar-management-app';

// title과 tagline은 번역 파일로 추출되지 않아 로케일별로 직접 골라야 합니다.
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'ko';
const siteText = {
  ko: {
    title: '인턴핑 사용 설명서',
    tagline: 'Microsoft Teams에서 인턴 일정 확인, 투입 예약, 승인 및 Outlook 연동',
    description:
      '인턴핑은 Microsoft Teams에서 인턴 일정을 확인하고 투입을 예약하며 관리자가 승인하는 캘린더 앱입니다.',
    keywords: ['인턴핑', 'InternPing', 'Microsoft Teams', '인턴 일정 관리', '투입 예약', 'Outlook 연동'],
  },
  en: {
    title: 'InternPing docs',
    tagline: 'Check intern schedules, book assignments, approve them, and connect Outlook in Microsoft Teams',
    description:
      'InternPing is a Microsoft Teams calendar app for checking intern schedules, booking assignments, and approving them as an admin.',
    keywords: ['InternPing', 'Microsoft Teams', 'intern scheduling', 'assignment booking', 'Outlook integration'],
  },
}[currentLocale === 'en' ? 'en' : 'ko'];

const config: Config = {
  title: siteText.title,
  tagline: siteText.tagline,
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
    locales: ['ko', 'en'],
    localeConfigs: {
      ko: {label: '한국어', htmlLang: 'ko-KR'},
      en: {label: 'English', htmlLang: 'en-US'},
    },
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
      {name: 'description', content: siteText.description},
      {name: 'keywords', content: siteText.keywords.join(', ')},
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
          type: 'localeDropdown',
          position: 'right',
          className: 'navbar-locale',
        },
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
