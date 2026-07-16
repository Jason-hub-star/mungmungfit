# SEO Submit Monitor — 배포 후 제출·색인 모니터

> 배포 후 `mungmungfit.kr`의 검색엔진 제출과 색인 상태를 점검한다.
> 공통 실행체는 `npm run seo:pipeline`이며, dry-run은 `npm run seo:dry-run`이다.

---

## 트리거

- 수동: `npm run seo:pipeline`
- Codex/Claude 자동화: `claude --automation .claude/automations/seo-submit-monitor.prompt.md`
- GitHub Actions 템플릿: `.github/workflows/seo-submit-monitor.yml`

## 필수 전제

1. 운영 배포가 끝나 있고 `NEXT_PUBLIC_SITE_URL=https://mungmungfit.kr`가 맞아야 한다.
2. Google Search Console 속성에 service account 또는 ADC 계정 권한이 있어야 한다.
3. Naver IndexNow를 live로 쓰려면 `NAVER_INDEXNOW_KEY`가 설정되어야 한다.
4. Naver 수집요청 API는 제휴 `NAVER_CRAWL_REQUEST_ACCESS_TOKEN`이 있을 때만 실행한다.

## 작업

1. 우선 dry-run으로 요청 목록과 payload를 검증한다.

```bash
npm run seo:dry-run
```

2. dry-run 결과에서 route/sitemap/robots/feed 실패가 없으면 live pipeline을 실행한다.

```bash
npm run seo:pipeline
```

3. 결과 파일을 확인한다.

- `docs/metrics/seo-pipeline-YYYY-MM-DD.json`
- `docs/status/SEO-HEALTH-STATUS.md`의 "SEO 제출·모니터 파이프라인" 섹션

4. 실패가 있으면 다음 순서로 분류한다.

- route/sitemap/robots/feed 실패: 배포/도메인/DNS 문제로 보고
- Google skipped: Google credential 또는 Search Console 권한 누락
- Naver IndexNow skipped: `NAVER_INDEXNOW_KEY` 누락
- Naver Crawl skipped: 제휴 API accessToken 없음, 운영상 정상일 수 있음
- submit 실패: HTTP status와 raw response를 근거로 텔레그램에 요약

## 출력

- 한국어 요약
- 실행한 명령
- 성공/스킵/실패 개수
- 실패 시 해결해야 할 env key 또는 외부 권한
