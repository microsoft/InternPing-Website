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
  {icon: CalendarDays, title: '월간 및 주간 보기', text: '월간 캘린더와 인턴별 7일 일정표에서 팀 일정을 계획합니다.'},
  {icon: ShieldCheck, title: '체계적인 승인', text: '관리자 전용 대기 목록에서 투입 요청을 승인, 보류 또는 반려합니다.'},
  {icon: Download, title: 'Outlook 호환', text: '일정을 ICS 파일로 내려받아 Outlook 또는 다른 캘린더에 추가합니다.'},
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Microsoft Teams용 인턴 일정 관리"
      description="인턴핑 Teams 탭의 일정 관리, 승인, 역할 관리, Outlook 일정 업로드 및 ICS 내보내기 설명서입니다.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroIcon}>
                <img src="img/mascot-walking.png" alt="인턴핑 캘린더 캐릭터" />
              </div>
              <Heading as="h1">하나의 팀 캘린더.<br /><span>모든 일정을 한눈에.</span></Heading>
              <p>Microsoft Teams에서 인턴 일정을 확인하고, 투입을 예약하고, 승인하며, Outlook 일정을 가져오거나 내보낼 수 있습니다.</p>
              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/installation">시작하기 <ArrowRight size={18} /></Link>
                <Link className="button button--secondary button--lg" to="/docs/user-guide">사용자 가이드 보기</Link>
              </div>
              <div className={styles.proof}><span><Check size={16} /> 세 가지 역할</span><span><Check size={16} /> SQLite 저장</span><span><Check size={16} /> Entra 인증</span></div>
            </div>
            <div className={styles.productVisual}>
              <img src="img/internping-main.png" alt="Microsoft Teams에서 실행 중인 인턴핑 캘린더" />
            </div>
            <p className={styles.visualCaption}>인턴핑 · 팀 일정</p>
          </div>
        </section>
        <section className={styles.featureBand}>
          <div className={styles.sectionIntro}><span>팀을 위한 캘린더</span><Heading as="h2">하나의 캘린더에서 계획하고, 검토하고, 내보내세요.</Heading></div>
          <div className={styles.featureGrid}>{features.map(({icon: Icon, title, text}) => <article key={title}><Icon size={24} /><Heading as="h3">{title}</Heading><p>{text}</p></article>)}</div>
        </section>
        <section className={styles.flow}>
          <div><span>사용 흐름</span><Heading as="h2">투입 계획부터 캘린더 반영까지.</Heading></div>
          <ol><li><b>01</b><strong>신청</strong><span>날짜, 상세 정보, 분류와 대상자를 입력합니다.</span></li><li><b>02</b><strong>결정</strong><span>관리자가 대기 중인 일정을 승인, 보류 또는 반려합니다.</span></li><li><b>03</b><strong>내보내기</strong><span>확정 일정을 Outlook 호환 ICS 파일로 내려받습니다.</span></li></ol>
        </section>
      </main>
    </Layout>
  );
}
