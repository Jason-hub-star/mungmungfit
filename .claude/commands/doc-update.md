---
description: 코드 변경 후 PROJECT-STATUS 등 정본 문서 자동 갱신
model: claude-sonnet-4-6
---

# /doc-update — 문서 자동 갱신

코드 변경 후 "문서업데이트"라고 하면 이 프로세스를 실행한다.
정본 1곳 원칙 (Single Source of Truth) 을 따른다.

## 프로세스

### 1. 변경 범위 파악
```bash
git diff --name-only HEAD
git diff --name-only --cached
git status --porcelain
```

### 2. 영향 문서 판별 (자동)

| 변경 영역 | 필수 갱신 | 조건부 갱신 |
|-----------|----------|-----------|
| **어떤 코드든** | `PROJECT-STATUS.md` (상태 한 줄) | — |
| `app/**` (Next.js route/page) | `PROJECT-STATUS.md` | `PHOTO-SLOTS-STATUS.md` (슬롯 추가시) |
| `content/blog/**` | `BLOG-QUEUE-STATUS.md` | `INSTAGRAM-THREAD-QUEUE.md` |
| `content/placeholders.ts` | `PHOTO-SLOTS-STATUS.md` | `photo-slots-reference.md` |
| `supabase/migrations/**` | `PROJECT-STATUS.md` | 새 핸드오프 문서 |
| `apps/mungmung-bot/**` (외부) | `BOT-COMMAND-MATRIX.md` | `PROJECT-STATUS.md` |
| `docs/manus-*.md` | `PROJECT-STATUS.md` | — |
| `docs/claude-content-handoff.md` | `PROJECT-STATUS.md` | — |
| `.claude/automations/**` | `.claude/automations/CLAUDE.md` (있다면) | — |
| `.claude/commands/**` | `.claude/commands/CLAUDE.md` (있다면) | — |
| 톤·정책 변경 | `claude-content-handoff.md` | `manus-*.md` |

### 3. 실제 수정 실행

각 필수 문서에 대해:
1. 해당 파일을 읽는다
2. 변경 내용을 반영하는 최소 수정을 한다
3. **정본 1곳 원칙**: 같은 사실을 여러 문서에 반복하지 않는다. 상세는 정본에, 나머지는 "done" 한 줄 + 링크

### 4. PROJECT-STATUS.md 라인 추가

기존 "Last Updated: ..." 라인은 그대로 두고 (히스토리 보존), 새 라인을 최상단에 추가:

```
Last Updated: YYYY-MM-DD (KST) — <한 줄 요약>

Previous: <기존 마지막 라인>
```

### 5. 검증 보고

```
## Doc Update Report

변경 파일: N개
갱신 문서: M개
- PROJECT-STATUS.md: ✅ (상태 반영)
- BLOG-QUEUE-STATUS.md: ✅ (Pipeline 섹션 갱신)
- PHOTO-SLOTS-STATUS.md: ✅ (#5 채워짐 반영)
```

## 서브에이전트 모델 배분

| 작업 | 모델 | 이유 |
|------|------|------|
| 상태 한 줄 추가/체크 | `haiku` | 템플릿 단순 삽입 |
| 섹션 수정/통합 | `sonnet` | 맥락 파악 + 편집 |
| drift 감지/판별 | `sonnet` | 영향 분류 |

## 규칙

- `docs/status/*`는 구현과 충돌하면 구현을 먼저 확인하고 맞춘다 (정본 = 코드)
- PROJECT-STATUS.md는 거의 항상 갱신 대상
- trivial 변경(주석, 오탈자, 테스트만)이면 "문서 갱신 불필요"로 종료
- 이 커맨드는 점검만 하는 게 아니라 **실제 수정까지 실행**한다
- 새 docs 폴더가 필요하면 자동 생성
