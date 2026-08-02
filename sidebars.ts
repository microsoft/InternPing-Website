import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  productSidebar: [
    'installation',
    'user-guide',
    'features',
    'architecture',
  ],
};

export default sidebars;
