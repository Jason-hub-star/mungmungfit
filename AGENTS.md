# 멍멍피트 Codex 작업 인덱스

> 주인님이라고 부른다.
> 이 문서는 Codex가 처음 읽는 짧은 포인터다. 상세 정본은 각 파일 안에 둔다.

---

## 현재 실제 구조

```text
.codex/
├── config.toml                       # Codex MCP 설정
├── hooks.json                        # Codex hook 등록
└── hooks/
    ├── post-edit-typecheck.sh        # .ts/.tsx 편집 후 tsc --noEmit
    └── post-edit-mdx-validate.sh     # .mdx 편집 후 frontmatter + 정책 검증

.claude/
├── CLAUDE.md                         # Claude/자동화/스킬 운영 인덱스
├── commands/                         # 슬래시 커맨드 정본
├── automations/                      # 자동화 prompt 정본
├── hooks/                            # Claude hook 스크립트
└── skills/                           # 반복 작업 절차 정본
    ├── photo-slot-replacement/
    ├── docs-status-sync/
    ├── seo-submit-monitor/
    ├── media-performance-budget/
    └── release-qa/
```

`.Codex/`와 `.codex/`는 같은 inode를 가리키는 로컬 설정 디렉토리다. `.codex/`는 토큰 가능성이 있어 gitignore 대상이며, 반복 가능한 절차는 추적 가능한 `.claude/skills/`에 둔다.

---

## Codex 작업 규칙

| 상황 | 먼저 볼 곳 | 해야 할 일 |
|------|------------|------------|
| 코드 변경 | `package.json`, 관련 app/components/content 파일 | 변경 후 `npm run typecheck` |
| 사진 슬롯 교체 | `.claude/skills/photo-slot-replacement/SKILL.md` | 화면 번호 `#N` → `content/placeholders.ts` 슬롯 매핑 |
| 문서 상태 동기화 | `.claude/skills/docs-status-sync/SKILL.md` | 가장 가까운 status/ref 문서만 갱신 |
| 이미지 성능 점검 | `.claude/skills/media-performance-budget/SKILL.md` | `npm run media:budget` 후 큰 public 이미지 최적화/기록 |
| 릴리즈 QA | `.claude/skills/release-qa/SKILL.md` | `npm run qa:responsive`로 390/768/1440 smoke |
| 배포 후 SEO 제출 | `.claude/skills/seo-submit-monitor/SKILL.md` | `npm run seo:dry-run -- --no-write` 먼저 실행 |
| 블로그/콘텐츠 | `docs/status/BLOG-QUEUE-STATUS.md`, `docs/claude-content-handoff.md` | `content/blog/*.mdx`를 정본으로 확인 |
| 배포 전 점검 | `.claude/commands/publish-readiness.md` | 타입체크·콘텐츠·문서 정합성 확인 |

---

## 문서 정본 맵

| 영역 | 정본 |
|------|------|
| 프로젝트 현재 상태 | `docs/status/PROJECT-STATUS.md` |
| 사진 슬롯 레지스트리 | `content/placeholders.ts` |
| 사진 슬롯 운영표 | `docs/photo-slots-reference.md` |
| 사진 슬롯 진행률 | `docs/status/PHOTO-SLOTS-STATUS.md` |
| 블로그 발행 큐 | `docs/status/BLOG-QUEUE-STATUS.md` |
| 인스타·스레드 큐 | `docs/status/INSTAGRAM-THREAD-QUEUE.md` |
| 봇 명령어 | `docs/status/BOT-COMMAND-MATRIX.md` |
| SEO 로드맵 | `docs/seo-roadmap.md` |
| SEO Health | `docs/status/SEO-HEALTH-STATUS.md` |
| 자동화 복구 | `docs/automation-runbook.md` |
| Manus Drive 운영 | `docs/MANUS-DRIVE-INSTRUCTIONS.md` |
| 콘텐츠 핸드오프 | `docs/claude-content-handoff.md` |
| 로컬 SEO/NAP | `docs/local-seo-playbook.md` |

---

## 없는 것으로 간주

- `.Codex/commands/`와 `.Codex/automations/`는 현재 없다. 관련 정본은 `.claude/commands/`, `.claude/automations/`다.
- `docs/Codex-content-handoff.md`는 없다. 콘텐츠 핸드오프 정본은 `docs/claude-content-handoff.md`다.
