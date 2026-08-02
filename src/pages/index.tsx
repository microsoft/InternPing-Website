import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {ArrowRight, BookOpen} from 'lucide-react';

import styles from './index.module.css';

const rotatingWords = [
  {text: translate({id: 'home.rotator.schedule', message: '일정'}), kind: 'violet'},
  {text: translate({id: 'home.rotator.assignment', message: '투입'}), kind: 'pink'},
  {text: translate({id: 'home.rotator.approval', message: '승인'}), kind: 'coral'},
];

const showcase = [
  {
    label: translate({id: 'home.showcase.calendar.label', message: '월간·주간 보기'}),
    text: translate({
      id: 'home.showcase.calendar.text',
      message:
        '팀 전체 투입 현황을 월간 캘린더로 훑고, 주간 캘린더로 좁혀 봅니다. 인턴·팀원·관리자 역할에 따라 보이는 버튼과 다룰 수 있는 일정이 달라집니다.',
    }),
    img: 'img/showcase/month.png',
    overlay: 'img/showcase/week.png',
  },
  {
    label: translate({id: 'home.showcase.request.label', message: '일정 신청'}),
    text: translate({
      id: 'home.showcase.request.text',
      message:
        '대상자와 기간을 고르면 같은 기간의 확정 일정과 겹치는지 그 자리에서 확인합니다. 관리자가 만든 일정은 즉시 확정되고, 그 외의 신청은 승인 대기로 저장됩니다.',
    }),
    img: 'img/showcase/new-schedule.png',
  },
  {
    label: translate({id: 'home.showcase.filter.label', message: '상태 필터'}),
    text: translate({
      id: 'home.showcase.filter.text',
      message: '승인·대기·반려 상태와 인턴별 필터를 함께 걸어 필요한 일정만 남깁니다.',
    }),
    img: 'img/showcase/filter-intern.png',
    overlay: 'img/showcase/status.png',
    overlayWide: true,
  },
  {
    label: translate({id: 'home.showcase.outlook.label', message: 'Outlook 연동'}),
    text: translate({
      id: 'home.showcase.outlook.text',
      message:
        '확정된 일정을 ICS 파일로 내려받아 Outlook에 그대로 추가합니다. Teams SSO로 로그인한 본인 계정 기준으로 동작합니다.',
    }),
    img: 'img/showcase/detail.png',
  },
];

const steps = [
  {
    no: '01',
    title: translate({id: 'home.flow.request.title', message: '신청'}),
    text: translate({
      id: 'home.flow.request.text',
      message:
        '대상자를 고르면 같은 기간의 확정 일정과 겹치는지 그 자리에서 확인합니다. 관리자가 만든 일정은 즉시 확정되고, 그 외 신청은 승인 대기로 저장됩니다.',
    }),
  },
  {
    no: '02',
    title: translate({id: 'home.flow.approval.title', message: '관리자 승인'}),
    text: translate({
      id: 'home.flow.approval.text',
      message:
        '관리자가 투입 일정을 승인, 보류, 반려합니다. 처리 사유는 500자까지 기록되고 신청·수정·처리·삭제 이력과 함께 보관됩니다.',
    }),
  },
  {
    no: '03',
    title: translate({id: 'home.flow.apply.title', message: '일정 반영'}),
    text: translate({
      id: 'home.flow.apply.text',
      message:
        '확정된 일정만 내보낼 수 있고, 인턴은 기존 Outlook 일정을 반대로 가져올 수도 있습니다.',
    }),
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function WaveUnderline(): ReactNode {
  return (
    <svg className={styles.wave} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="internpingWave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e2799a" />
          <stop offset="0.5" stopColor="#efa373" />
          <stop offset="1" stopColor="#9d6fd9" />
        </linearGradient>
      </defs>
      <path
        d="M2 7C22 1 42 1 62 6s40 5 60-1 40-4 60 2"
        fill="none"
        stroke="url(#internpingWave)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home(): ReactNode {
  const [word, setWord] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setWord((i) => (i + 1) % rotatingWords.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion()) {
      targets.forEach((el) => el.setAttribute('data-reveal', 'in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal', 'in');
          observer.unobserve(entry.target);
        });
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.12},
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout
      title={translate({
        id: 'home.meta.title',
        message: 'Microsoft Teams용 인턴 일정 관리',
      })}
      description={translate({
        id: 'home.meta.description',
        message:
          '인턴핑 Teams 탭의 일정 관리, 승인, 역할 관리, Outlook 일정 업로드 및 ICS 내보내기 설명서입니다.',
      })}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroTop}>
              <div className={styles.heroCopy} data-reveal="">
                <span className={styles.eyebrow}>
                  <Translate id="home.eyebrow">Microsoft Teams 앱</Translate>
                </span>
                <Heading as="h1" className={styles.wordmark}>
                  InternPing
                </Heading>
                <p className={styles.tagline}>
                  <Translate
                    id="home.tagline"
                    values={{
                      word: (
                        <span
                          key={word}
                          className={`${styles.rotator} ${styles[rotatingWords[word].kind]}`}>
                          {rotatingWords[word].text}
                        </span>
                      ),
                    }}>
                    {'모든 {word}을 하나의 팀 캘린더로.'}
                  </Translate>
                </p>
                <p className={styles.lede}>
                  <Translate id="home.lede">
                    Microsoft Teams에서 인턴 일정을 확인하고, 투입을 예약하고, 승인하며, Outlook 일정을 가져오거나 내보낼 수 있습니다. Entra ID로 인증하고 Azure App Service에서 동작합니다.
                  </Translate>
                </p>
                <div className={styles.actions}>
                  <Link className="button button--primary button--lg" to="/docs/installation">
                    <Translate id="home.cta.start">시작하기</Translate> <ArrowRight size={18} />
                  </Link>
                  <Link className="button button--secondary button--lg" to="/docs/user-guide">
                    <BookOpen size={18} /> <Translate id="home.cta.guide">사용자 가이드</Translate>
                  </Link>
                </div>
              </div>
              <div className={styles.heroArt} data-reveal="">
                <img
                  src="img/mascot-walking.png"
                  alt={translate({id: 'home.alt.mascot', message: '인턴핑 캘린더 캐릭터'})}
                />
              </div>
            </div>
            <div className={styles.productVisual} data-reveal="">
              <img
                src="img/internping-main.png"
                alt={translate({
                  id: 'home.alt.product',
                  message: 'Microsoft Teams에서 실행 중인 인턴핑 캘린더',
                })}
              />
            </div>
          </div>
        </section>

        <section className={styles.showcase}>
          <div className={styles.sectionIntro} data-reveal="">
            <span>
              <Translate id="home.showcase.eyebrow">팀을 위한 캘린더</Translate>
            </span>
            <Heading as="h2">
              <Translate id="home.showcase.heading">
                인턴 투입 일정을 Teams 안에서 그대로 관리합니다.
              </Translate>
            </Heading>
          </div>
          <div className={styles.showcaseBody}>
            <ul className={styles.showcaseList} data-reveal="">
              {showcase.map((item, index) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={index === active ? styles.showcaseActive : undefined}
                    aria-pressed={index === active}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}>
                    <span className={styles.showcaseLabel}>
                      {item.label}
                      {index === active && <WaveUnderline />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.showcasePanel} data-reveal="">
              <figure key={showcase[active].label} className={styles.panelFrame}>
                <div className={styles.panelStack}>
                  <img
                    className={styles.panelBase}
                    src={showcase[active].img}
                    alt={showcase[active].label}
                  />
                  {showcase[active].overlay && (
                    <img
                      className={
                        showcase[active].overlayWide
                          ? `${styles.panelOverlay} ${styles.panelOverlayWide}`
                          : styles.panelOverlay
                      }
                      src={showcase[active].overlay}
                      alt=""
                    />
                  )}
                </div>
              </figure>
              <p>{showcase[active].text}</p>
            </div>
          </div>
        </section>

        <section className={styles.flow}>
          <div className={styles.sectionIntro} data-reveal="">
            <span>
              <Translate id="home.flow.eyebrow">사용 흐름</Translate>
            </span>
            <Heading as="h2">
              <Translate id="home.flow.heading">신청 한 건이 확정되기까지.</Translate>
            </Heading>
          </div>
          <ol>
            {steps.map((step) => (
              <li key={step.no} data-reveal="">
                <b>{step.no}</b>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </Layout>
  );
}
