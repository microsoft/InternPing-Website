import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Download,
  ShieldCheck,
} from 'lucide-react';

import styles from './index.module.css';

const features = [
  {icon: CalendarDays, title: 'Month and week views', text: 'Plan team activity across focused month and seven-day calendar layouts.'},
  {icon: ShieldCheck, title: 'Controlled approvals', text: 'Approve, hold, or reject member events through an admin-only queue.'},
  {icon: Download, title: 'Outlook compatible', text: 'Download an event as an ICS file for Outlook or another calendar client.'},
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Intern Calendar for Microsoft Teams"
      description="Documentation for the Intern Calendar Teams tab, event approvals, role management, Outlook SQL import, and ICS export.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroIcon}>
                <img src="img/mascot-walking.png" alt="Calendar mascot" />
              </div>
              <Heading as="h1">One team calendar.<br /><span>Every event in view.</span></Heading>
              <p>A Teams-hosted calendar for planning events, assigning interns, managing approvals, importing legacy Outlook data, and exporting ICS files.</p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/installation">Get started <ArrowRight size={18} /></Link>
                <Link className="button button--secondary button--lg" to="/docs/user-guide">Read the user guide</Link>
              </div>
              <div className={styles.proof}><span><Check size={16} /> Three roles</span><span><Check size={16} /> SQLite-backed</span><span><Check size={16} /> Entra ready</span></div>
            </div>
            <div className={styles.productVisual}>
              <img src="img/internping-main.png" alt="InternPing calendar in Microsoft Teams" />
            </div>
            <p className={styles.visualCaption}>INTERNPING · TEAM CALENDAR</p>
          </div>
        </section>
        <section className={styles.featureBand}>
          <div className={styles.sectionIntro}><span>BUILT FOR THE TEAM</span><Heading as="h2">Plan, review, and export from one calendar.</Heading></div>
          <div className={styles.featureGrid}>{features.map(({icon: Icon, title, text}) => <article key={title}><Icon size={24} /><Heading as="h3">{title}</Heading><p>{text}</p></article>)}</div>
        </section>
        <section className={styles.flow}>
          <div><span>HOW IT WORKS</span><Heading as="h2">A clear path from plan to calendar.</Heading></div>
          <ol><li><b>01</b><strong>Create</strong><span>Members add dates, details, categories, and assignees.</span></li><li><b>02</b><strong>Decide</strong><span>Admins approve, hold, or reject pending events.</span></li><li><b>03</b><strong>Export</strong><span>Users download approved events as Outlook-compatible ICS files.</span></li></ol>
        </section>
      </main>
    </Layout>
  );
}
