# 멍멍피트 .Codex 디렉토리 — 작업 인프라

> 자동화·슬래시 커맨드·훅·MCP 설정의 인덱스.
> 정본 1곳 원칙: 각 파일 상세는 그 파일 안에. 본 문서는 포인터만.

---

## 디렉토리 구조

```
.Codex/
├── settings.json                    # 권한·훅 등록 (정본 1곳)
├── commands/                         # 슬래시 커맨드 (수동 트리거)
│   ├── learn.md                      # /learn — feedback memory 저장
│   ├── doc-update.md                 # /doc-update — 문서 자동 갱신
│   ├── blog-lint.md                  # /blog-lint — MDX 품질 검사
│   └── publish-readiness.md          # /publish-readiness — 푸시 전 통합 체크
├── automations/                      # Nightly 자동화 (cron 트리거)
│   ├── blog-publish-nightly.prompt.md       # 매일 22:00
│   ├── bot-dispatch-tracker.prompt.md       # 매일 20:00
│   └── content-metrics-weekly.prompt.md     # 매주 일요일 21:00 (opus)
└── hooks/                            # 자동 검사 훅 (PostToolUse)
    ├── post-edit-typecheck.sh        # .ts/.tsx 편집 후 tsc --noEmit
    └── post-edit-mdx-validate.sh     # .mdx 편집 후 frontmatter + 정책 검증
```

---

## 슬래시 커맨드 사용

| Command | 호출 시점 | 결과 |
|---------|----------|------|
| `/learn` | 사용자 교정 후 | feedback memory 자동 저장 |
| `/doc-update` | 코드 변경 후 | PROJECT-STATUS.md 외 자동 갱신 |
| `/blog-lint` | 블로그 글 작성 후 | SEO·톤·정책 검사 |
| `/publish-readiness` | git push 전 | 통합 체크 + 권장 사항 |

## Nightly 자동화 스케줄

| 시간 | 자동화 | 모델 |
|------|--------|------|
| 매일 20:00 | bot-dispatch-tracker | sonnet |
| 매일 22:00 | blog-publish-nightly | sonnet |
| 매주 일 21:00 | content-metrics-weekly | opus |

자동화 실행 방법:
- 수동: `Codex --automation .Codex/automations/{name}.prompt.md`
- cron: 추후 GitHub Actions 또는 launchd 등록

## 훅 동작

`.ts`, `.tsx`, `.mts`, `.cts` 편집·작성 시 → `post-edit-typecheck.sh` 자동 실행
`.mdx` 편집·작성 시 → `post-edit-mdx-validate.sh` 자동 실행 (frontmatter + 정책 검사)

훅 결과는 stderr로 Codex 컨텍스트에 전달됨.

---

## 관련 정본 문서

- **프로젝트 상태**: `docs/status/PROJECT-STATUS.md`
- **블로그 큐**: `docs/status/BLOG-QUEUE-STATUS.md`
- **봇 명령어**: `docs/status/BOT-COMMAND-MATRIX.md`
- **인스타·스레드 큐**: `docs/status/INSTAGRAM-THREAD-QUEUE.md`
- **사진 슬롯**: `docs/status/PHOTO-SLOTS-STATUS.md`
- **마누스 핸드오프**: `docs/manus-{instagram,threads,image-prompts}-handoff.md`
- **Codex 콘텐츠 핸드오프**: `docs/Codex-content-handoff.md`
- **사진 슬롯 가이드**: `docs/photo-slots-reference.md`
