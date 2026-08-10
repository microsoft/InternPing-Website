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

현재 버전은 1.2.0입니다. 캘린더 탭과 함께 일정 알림을 보내는 채팅 탭이 같이 설치됩니다.

## 2. Teams에 업로드하기

1. Teams 앱 막대에서 **앱**을 엽니다.
2. 왼쪽 아래 **앱 관리**를 선택합니다.
3. **앱 업로드**를 누르면 업로드 방식 창이 열립니다. **사용자 지정 앱 업로드**를 선택합니다.
4. 내려받은 `internping.zip`을 엽니다.

같은 창의 **앱 제출**은 IT 관리자 승인을 거쳐 조직 전체에 배포하는 경로입니다. 본인이나 팀에서만 사용할 때는 **사용자 지정 앱 업로드**를 선택합니다.

![Teams 앱 관리 화면에서 앱 업로드 창의 사용자 지정 앱 업로드와 앱 제출 선택지를 표시한 화면](/img/installation/ko/00-upload-app.png)

*앱 관리 → 앱 업로드에서 사용자 지정 앱 업로드를 선택합니다.*

:::info[업로드 메뉴가 보이지 않는다면]
테넌트에서 사용자 지정 앱 업로드가 막혀 있는 경우입니다. Teams 관리자에게 앱 설정 정책에서 사용자 지정 앱 업로드를 허용해 달라고 요청합니다.
:::

## 3. 앱 추가하기

패키지를 읽으면 인턴핑 앱 정보 창이 열립니다.

1. 앱 이름과 게시자(Microsoft Intern Team), 설명을 확인합니다.
2. **추가**를 선택합니다.

![인턴핑 앱 정보와 추가 버튼, 개인 앱 및 탭 사용 범위를 표시한 Teams 화면](/img/installation/ko/01-1-add-app.png)

*앱 정보를 확인한 뒤 추가를 선택합니다.*

추가가 끝나면 사용할 위치를 고르는 창이 나타납니다.

- **열기**를 누르면 개인 탭으로 바로 실행됩니다.
- 아래 검색란에서 채널이나 채팅을 선택하면 해당 팀 또는 대화에 탭으로 추가됩니다.

![앱 추가 완료 후 열기 버튼과 채널·채팅 선택 목록을 표시한 Teams 화면](/img/installation/ko/01-2-added.png)

*개인 탭으로 열거나 채널 또는 채팅에 탭으로 추가할 수 있습니다.*

## 4. 로그인 권한 동의하기

앱을 처음 열면 계정 권한 동의 절차가 한 번 진행됩니다. 동의하지 않으면 일정을 불러올 수 없습니다.

1. **Almost there!** 창에서 **Continue**를 선택합니다.
2. Microsoft 로그인 창에서 사용할 조직 계정을 확인합니다.
3. 요청 권한(기본 프로필 조회, 허용한 데이터에 대한 액세스 유지)을 확인하고 **Accept**를 선택합니다.

![추가 권한이 필요하다는 안내와 Continue 버튼을 표시한 인턴핑 탭 화면](/img/installation/ko/02-consent-prompt.png)

*첫 실행에서 한 번만 표시되는 추가 권한 안내입니다.*

![기본 프로필 조회와 데이터 액세스 유지 권한 요청을 표시한 Microsoft 동의 화면](/img/installation/ko/03-permissions.png)

*요청 권한을 확인한 뒤 Accept를 선택합니다.*

:::note[unverified 표시]
동의 화면의 앱 이름 아래에 `unverified`와 "This application is not published by Microsoft or your organization" 문구가 나옵니다. 인턴핑은 Microsoft 마켓플레이스에 게시된 앱이 아니라 사내 프로젝트로 만든 Entra 앱이라 나타나는 정상적인 안내입니다. 앱 이름이 `intern-calendar-aad`인지 확인한 뒤 진행합니다.
:::

권한에 동의했더라도 탭에 `Authorization: Bearer <token> 헤더가 필요합니다.` 오류가 표시될 수 있습니다. 이때 탭 오른쪽 위의 **···** 아이콘을 누르고 **앱 다시 로드**를 선택하면 토큰을 다시 받아 앱이 정상적으로 열립니다.

<div className="image-row">

![Authorization Bearer 토큰 헤더가 필요하다는 오류 문구가 표시된 인턴핑 탭 화면](/img/installation/ko/04-auth-error.png)

![탭 오른쪽 위 더 보기 메뉴에서 앱 다시 로드를 강조한 화면](/img/installation/ko/04-1-reload-app.png)

</div>

*왼쪽 오류가 보이면 **··· → 앱 다시 로드**로 다시 불러오면 해결됩니다.*

앱을 다시 로드해도 같은 오류가 남아 있으면 동의 절차를 처음부터 다시 진행합니다.

## 5. 설치 확인하기

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
| `Authorization: Bearer <token> 헤더가 필요합니다.` 오류 | 권한에 동의했어도 나타날 수 있습니다. 탭 오른쪽 위 **··· → 앱 다시 로드**를 선택합니다. 그래도 남아 있으면 **Continue → Accept**로 권한 동의를 마칩니다. |
| 동의 화면에 unverified 표시 | 마켓플레이스에 게시되지 않은 사내 앱이라 표시되는 정상 안내입니다. 앱 이름이 `intern-calendar-aad`인지 확인합니다. |
| 로그인은 되는데 일정이 안 보임 | 사용 중인 계정이 인턴핑이 배포된 테넌트 소속인지 확인합니다. |
| 승인 메뉴가 없음 | 승인·보류·반려는 관리자 역할에서만 보입니다. 담당 관리자에게 역할 변경을 요청합니다. |
| 새 버전이 반영되지 않음 | 기존 앱을 제거한 뒤 최신 패키지를 다시 업로드합니다. |

## 직접 빌드해 배포하려면

별도 Azure 구독에 인턴핑을 직접 올리려면 소스 코드가 필요합니다. 애플리케이션은 [Microsoft_Intern_Project](https://github.com/kimsunki12/Microsoft_Intern_Project) 저장소의 `intern-calendar/` 폴더에 있고, Node.js 24와 Microsoft 365 Agents Toolkit(`atk`)으로 빌드해 Azure App Service에 배포합니다. 서버 구성과 제약은 [시스템 구조](./architecture.md)에 정리되어 있습니다.

이 문서에서 내려받는 패키지는 운영 인스턴스 주소와 Entra 앱 ID가 들어 있어 다른 배포본에는 사용할 수 없습니다. 직접 배포한 경우 패키지도 새로 만들어야 합니다.