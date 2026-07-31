import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = process.env.SITE_URL ?? 'https://calendar-management-app.github.io';
const baseUrl = process.env.BASE_URL ?? '/';
const organizationName = process.env.GITHUB_REPOSITORY_OWNER ?? 'calendar-management-app';
const projectName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'calendar-management-app';

const config: Config = {
  title: 'Calendar Management App',
  tagline: 'Calendar requests, approvals, and Outlook invitations inside Microsoft Teams',
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
    defaultLocale: 'en',
    locales: ['en'],
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
        content: 'Microsoft Teams, calendar management, approvals, Outlook, ICS',
      },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'InternPing',
      logo: {
        alt: 'InternPing',
        src: 'img/header-head.png',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/docs/installation', label: 'Installation', position: 'left'},
        {to: '/docs/user-guide', label: 'User Guide', position: 'left'},
        {to: '/docs/features', label: 'Features', position: 'left'},
        {to: '/docs/architecture', label: 'Architecture', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Features', to: '/docs/features'},
            {label: 'Architecture', to: '/docs/architecture'},
            {label: 'User Guide', to: '/docs/user-guide'},
          ],
        },
        {
          title: 'Get started',
          items: [
            {label: 'Installation Guide', to: '/docs/installation'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Microsoft Teams', href: 'https://www.microsoft.com/microsoft-teams/'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Calendar Management App. Built by interns for Microsoft Teams.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
