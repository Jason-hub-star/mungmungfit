# 인스타그램 발행 사이클 점검 — 분기 C 실행 보고

**실행 시각**: 2026-06-12 (금요일, 샌드박스 기준)
**자동화**: `instagram-publishing-cycle.prompt.md` → 분기 C (목·일 09:00 발행 결과 점검)
**결과**: ⛔ **실행 불가 (환경 차단)** — Drive 접근 경로 없음. 2026-06-10 점검과 동일 상태.

---

## 요약

분기 C는 Google Drive 폴더(`3-발행완료/`, `4-발행실패/`, `5-인사이트/`)를 읽어 결과를 점검하는 작업이다. 이번 실행 환경에는 Drive에 닿을 수단이 없어 Step C-1~C-3을 수행할 수 없었다. 실데이터가 없으므로 Step C-4 텔레그램 보고는 **발송하지 않았다** — 수치를 지어내 보내는 것은 룰 위반이며, 자동화 자신의 Step 0-3("rclone 미설치 시 즉시 중단") 규칙에 해당한다.

## Step 0 점검 결과

| 항목 | 상태 |
|------|------|
| `MUNGMUNG_BOT_TOKEN` | ✅ SET (46자) |
| `MUNGMUNG_CHAT_ID` | ✅ SET (10자) |
| `MUNGMUNG_DRIVE_REMOTE` | ✅ SET (6자) |
| `MUNGMUNG_DRIVE_FOLDER` | ✅ SET (4자) |
| `.env.local` | ✅ 존재 |
| `rclone` 설치 | ❌ 미설치 (`command -v rclone` 실패) |
| `rclone` remote 설정 | ❌ 없음 (rclone 실행 불가) |
| Google Drive MCP 커넥터 | ❌ 미연결 (사용 가능 MCP: Slack·Notion·Vercel·PDF 등 — Drive 없음) |

→ 토큰류 환경변수는 모두 정상이나, Drive 접근 수단(rclone 또는 Drive MCP)이 전무하여 분기 C의 핵심 단계가 불가.

## 날짜 불일치 메모

스케줄 작업 파일은 "오늘은 목요일 또는 일요일"을 전제하고, cron은 `0 9 * * 4,0`(목·일)이다. 그러나 실제 실행일은 **금요일(2026-06-12, 샌드박스 기준)**으로 분기 C cron과 어긋난다. 직전 점검(2026-06-10)도 수요일에 트리거되어 동일한 불일치를 기록했다. 트리거 요일과 cron 정의가 반복적으로 어긋나는 것은 스케줄 오설정 신호일 수 있다.

## 점검 불가 항목 (Drive 필요)

- **C-1 발행 완료 확인**: `3-발행완료/`에서 어제 날짜 검색 — 불가
- **C-2 실패 케이스**: `4-발행실패/` 및 `_error.txt` 분석 — 불가
- **C-3 24h 인사이트**: `5-인사이트/`에서 그저께 발행분 수집 여부 — 불가
- **C-4 텔레그램 보고**: 실데이터 없음 → 발송 안 함 (룰 준수)

## 권장 조치

이 점검은 Drive RW가 되는 환경에서 실행해야 정상 동작한다. 둘 중 하나 필요:

1. **사용자 머신에서 직접 실행** — rclone + `gdrive:` remote가 설정된 로컬에서:
   ```bash
   claude --automation .claude/automations/instagram-publishing-cycle.prompt.md
   ```
2. **Google Drive MCP 커넥터 연결** — 샌드박스/Cowork에서 Drive 폴더를 읽도록 커넥터를 붙이면 rclone 없이도 분기 C 수행 가능.

추가로 **분기 C cron(목·일)과 실제 트리거 요일을 일치**시킬 것. 이틀 연속 off-schedule 트리거는 스케줄 설정 점검이 필요함을 시사.

---

*상세 막힘 대응: `docs/automation-runbook.md` § 환경변수/rclone 누락*
