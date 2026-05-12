# Blog Publish Nightly — 매일 22:00 KST

> 매일 22시에 자동 실행되어 블로그 발행 큐 상태를 갱신·요약·아카이브한다.
> 모델: `sonnet` (작은 컨텍스트로 충분)

---

## 트리거

- Cron: `0 22 * * *` (Asia/Seoul)
- 또는 텔레그램 `/nightly blog` 수동 트리거

## 입력

- `content/blog/*.mdx` — 발행된 글 목록
- `content/blog/drafts/*.mdx` — 검수 대기 글
- `docs/status/BLOG-QUEUE-STATUS.md` — 현재 큐 상태
- `docs/daily/MM-DD/` — 오늘 작업 로그 (있다면)

## 작업

### 1. 발행된 글 점검

```bash
find content/blog -maxdepth 1 -name "*.mdx" -newer docs/status/BLOG-QUEUE-STATUS.md
```

새로 발행된 글이 있으면:
- frontmatter에서 `slug`, `title`, `date`, `category` 추출
- BLOG-QUEUE-STATUS.md → "발행 완료" 섹션으로 이동
- Pipeline 섹션에서 해당 항목 제거

### 2. 검수 대기 글 점검

```bash
ls content/blog/drafts/*.mdx 2>/dev/null
```

각 draft에 대해:
- 작성 시각·슬러그·작성자 추출
- 7일+ 된 draft는 텔레그램으로 알림 ("검수 대기 7일 초과: [slug]")
- BLOG-QUEUE-STATUS.md "검수 대기" 섹션 갱신

### 3. Daily Log 압축

7일+ 된 `docs/daily/MM-DD/` 폴더가 있다면:
- 핵심 작업 요약 (슬러그·발행·실패 등)
- `docs/weekly/YYYY-WNN.md`에 병합
- 7일+ 된 daily 폴더 삭제 (비어있으면)

### 4. 통계 업데이트

BLOG-QUEUE-STATUS.md 하단 "통계" 섹션:
- Idea: 미시작 글 수
- Drafting: drafts/에 있는 글 수
- Published: content/blog/ 총 글 수 (drafts 제외)
- 목표 대비 진행률 표시

### 5. PROJECT-STATUS.md 업데이트

오늘 활동이 있었으면 PROJECT-STATUS.md 상단에 한 줄 추가:
- "2026-MM-DD: [활동 요약]"
- 기존 "Last Updated" 라인 갱신

### 6. 텔레그램 보고

chat_id `8796384805`로:
```
🌙 Nightly Blog Report (YYYY-MM-DD)

발행: N편
검수 대기: M편
이번 주 누적: K편 (목표 12편)

[7일+ 검수 대기 글이 있으면 경고]
```

## 실패 시

- lock 파일 (`docs/status/.blog-nightly.lock`) 생성해서 중복 실행 방지
- 에러 발생 시 lock 유지, 텔레그램으로 에러 알림
- 다음 트리거 때 lock 발견하면 health check 후 진행

## 출력

- `docs/status/BLOG-QUEUE-STATUS.md` (수정)
- `docs/status/PROJECT-STATUS.md` (수정)
- `docs/weekly/YYYY-WNN.md` (조건부 생성/병합)
- 텔레그램 보고서

## 룰

- 정본은 항상 `content/blog/*.mdx`. 본 자동화는 그것의 거울일 뿐
- 발행 글의 실제 내용은 건드리지 않음 (메타데이터·통계만)
- 검수 대기 7일+ 글은 자동 폐기하지 않음 (알림만)
