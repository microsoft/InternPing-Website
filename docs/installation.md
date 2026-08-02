---
id: installation
title: 설치 및 배포 가이드
description: 인턴핑을 로컬에서 실행하고 Microsoft Teams와 Azure에 배포하는 방법입니다.
sidebar_position: 3
---

# 설치 및 배포 가이드

인턴핑 애플리케이션은 원본 저장소의 `intern-calendar/` 폴더에 있습니다. React 탭과 Node.js API를 함께 빌드하고 한 서버에서 제공합니다.

## 준비 사항

- Node.js 24: 안정 버전의 내장 `node:sqlite` `DatabaseSync` API에 필요합니다.
- npm과 Git
- Microsoft 365 개발 또는 데모 테넌트
- Microsoft 365 Agents Toolkit VS Code 확장 또는 `atk` CLI
- Teams 사용자 지정 앱 업로드 권한
- Entra 앱 생성 권한과 Azure 배포 시 Azure 구독

## 1. 소스 코드 준비하기

```powershell
git clone https://github.com/kimsunki12/Microsoft_Intern_Project.git
cd Microsoft_Intern_Project\intern-calendar
npm install
node --version
```

Node 버전이 `v24`가 아니면 버전을 맞춘 뒤 의존성을 다시 설치합니다.

## 2. 브라우저에서 실행하기

```powershell
npm run build
$env:PORT = "3978"
node .
```

`http://localhost:3978/tabs/home`을 엽니다. Entra 환경 변수가 없으면 **개발 모드**로 실행되어 사용자 역할을 전환할 수 있습니다.

:::danger 개발 모드는 로컬 전용입니다
개발 모드는 사용자를 인증하지 않습니다. 인터넷이나 사내 네트워크에 공개된 서버에서는 반드시 Entra 인증을 설정합니다.
:::

개발 중 자동 재빌드가 필요하면 `npm run dev`를 사용합니다. 첫 실행 시 `data/intern-calendar.db`가 생성되고 코드에 정의된 팀 명단이 사용자 테이블에 반영됩니다.

## 3. 주요 환경 변수

| 변수 | 기본값 | 용도 |
| --- | --- | --- |
| `PORT` | `3978` | 애플리케이션 서버 포트 |
| `ENTRA_TENANT_ID` | 없음 | 홈 Entra 테넌트 ID |
| `ENTRA_CLIENT_ID` | 없음 | Entra 앱 클라이언트 ID |
| `ENTRA_AUDIENCE` | 클라이언트 ID 기반 | 허용할 토큰 audience 목록 |
| `ENTRA_ALLOWED_TENANTS` | 홈 테넌트 | 로그인을 허용할 테넌트 ID 목록 |
| `ADMIN_EMAILS` | 없음 | 항상 관리자 권한을 가질 이메일 목록 |
| `DEFAULT_ROLE` | `member` | 처음 로그인한 사용자의 기본 역할 |
| `DATA_DIR` | 로컬 `./data`, Azure `/home/data` | 데이터 저장 폴더 |
| `DB_FILE` | `<DATA_DIR>/intern-calendar.db` | SQLite 파일 경로 |
| `CALENDAR_IANA_TIME_ZONE` | `Asia/Seoul` | ICS 시간 변환에 사용할 IANA 시간대 |

## 4. Teams에서 로컬 실행하기

`env/.env.local`의 `ADMIN_EMAILS`에 승인 담당자 이메일을 입력한 뒤 다음 명령을 실행합니다.

```powershell
atk auth login m365
atk provision --env local -i false
atk deploy --env local -i false
npm run dev:teamsfx
```

생성된 `appPackage/build/internping.zip`을 Teams에 사용자 지정 앱으로 업로드합니다. 탭은 `https://localhost:3978/tabs/home`을 열고 Teams SSO 토큰을 서버에 전달합니다.

## 5. Azure에 배포하기

```powershell
atk provision --env dev
atk deploy --env dev
atk publish --env dev
```

`publish`는 조직 전체 배포 승인이 필요할 때만 실행합니다.

| 리소스 | 설정 |
| --- | --- |
| App Service Plan | Linux B1 |
| App Service | Node 24 LTS, HTTPS 전용, Always On, 인스턴스 1개 |
| Entra 앱 | Teams SSO용 `access_as_user` 범위 |
| Teams 앱 | 배포된 탭 주소와 허용 도메인 |

SQLite 파일을 공유할 수 없으므로 App Service 인스턴스는 1개로 유지합니다. 데이터는 재배포 후에도 유지되는 `/home/data`에 저장됩니다.

## 6. 배포 확인하기

1. Teams에서 본인 이름과 역할이 표시되는지 확인합니다.
2. 일반 사용자로 투입 예약을 만들고 승인 대기 상태인지 확인합니다.
3. 관리자로 승인·보류·반려를 시험합니다.
4. 마지막 관리자를 강등할 수 없는지 확인합니다.
5. 겹치는 확정 일정으로 충돌 안내를 확인합니다.
6. Outlook SQL 미리보기와 업로드 결과를 확인합니다.
7. 종일 및 시간 일정의 ICS를 Outlook에서 엽니다.
8. 서버 재시작 후 데이터가 유지되는지 확인합니다.
9. 데스크톱과 640px 이하 모바일 화면에서 일정 목록과 상세 패널을 확인합니다.

## 자주 발생하는 문제

| 증상 | 확인할 내용 |
| --- | --- |
| `node:sqlite` 모듈 오류 | Node.js가 24인지 확인합니다. |
| Teams에서 빈 화면 | HTTPS 서버, 인증서, 탭 URL과 포트 3978을 확인합니다. |
| API가 401을 반환함 | SSO 토큰, tenant, audience와 Entra 앱 ID를 확인합니다. |
| 관리 메뉴가 없음 | 로그인 이메일과 `ADMIN_EMAILS`가 일치하는지 확인합니다. |
| 재배포 후 데이터가 사라짐 | Azure `DATA_DIR`이 `/home/data`인지 확인합니다. |
| 앱 업로드 메뉴가 없음 | Teams의 사용자 지정 앱 업로드 정책을 확인합니다. |