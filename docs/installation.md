---
id: installation
title: 설치
description: 인턴핑 패키지를 내려받아 Microsoft Teams에 사이드로딩으로 설치하는 방법입니다.
sidebar_position: 3
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 설치

인턴핑은 Teams 앱 패키지(`.zip`)를 올려서 설치합니다.

## 준비 사항

- Microsoft Teams 데스크톱 앱 또는 웹 브라우저
- 조직 Microsoft 365 계정
- Teams 사용자 지정 앱 업로드 권한

## 1. 패키지 내려받기

<a className="download-cta" href={useBaseUrl('/download/internping.zip')} download>인턴핑 패키지 내려받기 (.zip)</a>

현재 버전은 1.0.0입니다.

## 2. Teams에 업로드하기

1. Teams 앱 막대에서 **앱**을 엽니다.
2. **앱 관리 → 앱 업로드 → 사용자 지정 앱 업로드**를 선택합니다.
3. 내려받은 `internping.zip`을 엽니다.
4. **추가**를 눌러 개인 탭으로 열거나 팀 또는 채팅에 추가합니다.

:::info 업로드 메뉴가 보이지 않는다면
테넌트에서 사용자 지정 앱 업로드가 막혀 있는 경우입니다. Teams 관리자에게 앱 설정 정책에서 사용자 지정 앱 업로드를 허용해 달라고 요청합니다.
:::

## 3. 설치 확인하기

1. 인턴핑 탭에서 본인 이름과 역할이 표시되는지 확인합니다.
2. 투입 예약을 만들고 승인 대기 상태로 저장되는지 확인합니다.
3. 겹치는 확정 일정이 있을 때 충돌 안내가 나오는지 확인합니다.
4. 확정 일정을 ICS로 내려받아 Outlook에서 엽니다.
5. 휴대폰이나 좁은 창에서 일정 목록과 상세 패널을 확인합니다.

## 자주 발생하는 문제

| 증상 | 확인할 내용 |
| --- | --- |
| 앱 업로드 메뉴가 없음 | Teams의 사용자 지정 앱 업로드 정책을 확인합니다. |
| 탭이 빈 화면으로 열림 | Teams를 다시 시작하고 조직 계정으로 로그인했는지 확인합니다. |
| 로그인은 되는데 일정이 안 보임 | 사용 중인 계정이 인턴핑이 배포된 테넌트 소속인지 확인합니다. |
| 승인 메뉴가 없음 | 승인·보류·반려는 관리자 역할에서만 보입니다. 담당 관리자에게 역할 변경을 요청합니다. |
| 새 버전이 반영되지 않음 | 기존 앱을 제거한 뒤 최신 패키지를 다시 업로드합니다. |

## 직접 빌드해 배포하려면

별도 Azure 구독에 인턴핑을 직접 올리려면 소스 코드가 필요합니다. 애플리케이션은 [Microsoft_Intern_Project](https://github.com/kimsunki12/Microsoft_Intern_Project) 저장소의 `intern-calendar/` 폴더에 있고, Node.js 24와 Microsoft 365 Agents Toolkit(`atk`)으로 빌드해 Azure App Service에 배포합니다. 서버 구성과 제약은 [시스템 구조](./architecture.md)에 정리되어 있습니다.

이 문서에서 내려받는 패키지는 운영 인스턴스 주소와 Entra 앱 ID가 들어 있어 다른 배포본에는 사용할 수 없습니다. 직접 배포한 경우 패키지도 새로 만들어야 합니다.