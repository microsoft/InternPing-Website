import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  LayoutDashboard,
  MailCheck,
  ShieldCheck,
  Users,
} from 'lucide-react';

import styles from './index.module.css';

const features = [
  {icon: Users, title: 'Native to Teams', text: 'Create and review calendar requests without leaving the workspace.'},
  {icon: ShieldCheck, title: 'Controlled approvals', text: 'Route every request through a clear, role-aware admin workflow.'},
  {icon: MailCheck, title: 'Outlook ready', text: 'Deliver standards-based ICS invitations after approval.'},
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Calendar requests made simple"
      description="Documentation for the Calendar Management App for Microsoft Teams.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroIcon}>
                <img src="img/mascot-walking.png" alt="Calendar mascot" />
              </div>
              <Heading as="h1">Every calendar request.<br /><span>One clear workflow.</span></Heading>
              <p>A focused Teams workspace for submitting events, managing approvals, tracking progress, and delivering Outlook invitations.</p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/installation">Get started <ArrowRight size={18} /></Link>
                <Link className="button button--secondary button--lg" to="/docs/user-guide">Read the user guide</Link>
              </div>
              <div className={styles.proof}><span><Check size={16} /> Role-aware</span><span><Check size={16} /> Outlook compatible</span><span><Check size={16} /> Request history</span></div>
            </div>
            <div className={styles.productVisual} aria-label="Calendar request dashboard preview">
              <div className={styles.appRail}><div className={styles.teamsMark}>T</div><Users size={20} /><CalendarCheck size={20} /><LayoutDashboard size={20} /></div>
              <div className={styles.dashboard}>
                <div className={styles.dashboardTop}><div><small>Calendar Management</small><strong>Request dashboard</strong></div><span className={styles.avatar}>AM</span></div>
                <div className={styles.metrics}>
                  <div><Clock3 size={18} /><small>Pending</small><strong>4</strong></div>
                  <div><CalendarCheck size={18} /><small>Approved</small><strong>18</strong></div>
                  <div><MailCheck size={18} /><small>Invites sent</small><strong>17</strong></div>
                </div>
                <div className={styles.requestList}>
                  <div className={styles.listHeader}><strong>Recent requests</strong><span>This week</span></div>
                  <div className={styles.request}><span className={styles.date}>05<small>AUG</small></span><div><strong>Design review</strong><small>10:00 - 11:00 · Room 2A</small></div><b className={styles.approved}>Approved</b></div>
                  <div className={styles.request}><span className={styles.date}>07<small>AUG</small></span><div><strong>Intern demo day</strong><small>14:00 - 15:30 · Teams meeting</small></div><b className={styles.pending}>Pending</b></div>
                  <div className={styles.request}><span className={styles.date}>11<small>AUG</small></span><div><strong>Project retro</strong><small>16:00 - 17:00 · Room 4C</small></div><b className={styles.approved}>Approved</b></div>
                </div>
              </div>
            </div>
            <p className={styles.visualCaption}>CALENDAR MANAGEMENT APP · REQUEST DASHBOARD</p>
          </div>
        </section>
        <section className={styles.featureBand}>
          <div className={styles.sectionIntro}><span>ONE CONNECTED SYSTEM</span><Heading as="h2">From request to calendar, without the handoffs.</Heading></div>
          <div className={styles.featureGrid}>{features.map(({icon: Icon, title, text}) => <article key={title}><Icon size={24} /><Heading as="h3">{title}</Heading><p>{text}</p></article>)}</div>
        </section>
        <section className={styles.flow}>
          <div><span>HOW IT WORKS</span><Heading as="h2">A visible path from idea to invitation.</Heading></div>
          <ol><li><b>01</b><strong>Submit</strong><span>Members provide the event details.</span></li><li><b>02</b><strong>Review</strong><span>Admins approve or return the request.</span></li><li><b>03</b><strong>Deliver</strong><span>The system generates and emails the ICS file.</span></li></ol>
        </section>
      </main>
    </Layout>
  );
}
