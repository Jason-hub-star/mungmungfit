---
description: git push 전 라이브 배포 가능 여부 통합 점검
argument-hint: "[blog [slug]]"
model: claude-opus-4-7
---

# /publish-readiness — 푸시 전 발행 가능 여부 체크

git push 전에 라이브 환경에 안전하게 배포 가능한지 통합 점검한다.

## 사용법

```
/publish-readiness                  # 전체 점검
/publish-readiness blog [slug]      # 특정 블로그 글 발행 가능 여부
```

## 체크 항목

### 1. 코드 품질

```bash
npx tsc --noEmit              # TypeScript 통과?
npm run lint --silent          # ESLint 통과? (있다면)
```

| 항목 | 결과 |
|------|------|
| TypeScript: 0 errors | ✅/❌ |
| ESLint: 0 errors | ✅/❌ |

### 2. Git 상태

```bash
git status --porcelain
git log @{u}..HEAD --oneline    # 푸시 안 된 커밋
```

| 항목 | 결과 |
|------|------|
| Untracked 파일 없음 | ✅/⚠️ |
| 커밋되지 않은 변경 없음 | ✅/⚠️ |
| 푸시 대기 커밋 수 | N개 |

### 3. 블로그 발행 검사 (slug 지정 시)

`/blog-lint [slug]` 실행:
- Frontmatter 완성도
- SEO 체크
- 톤·정책 (시저밀란/퍼피빌/메이 단독 등)
- 출처 표기 (유튜브 가공이면)

### 4. 환경변수 점검

`.env.example`에 새 변수가 추가됐는데 Vercel 환경에 없으면 경고:

```bash
diff <(grep "^[A-Z]" .env.example | cut -d= -f1) \
     <(vercel env ls production 2>/dev/null | tail -n +2 | awk '{print $1}')
```

### 5. Supabase 마이그레이션

`supabase/migrations/` 에 적용되지 않은 마이그레이션이 있는지:

```bash
supabase migration list 2>&1
```

### 6. 사진 슬롯 점검

`content/placeholders.ts`에서 `src: null` 인 슬롯이 있어도 경고만 (배포는 가능, placeholder UI 노출):

```
🟡 채워지지 않은 슬롯: N개 (배포 시 placeholder 노출)
```

### 7. 큐 상태 점검 (선택)

다음 수요일까지 발행 예정 큐가 있는지:

```sql
SELECT COUNT(*) FROM instagram_queue
WHERE status = 'pending' AND scheduled_at <= date_trunc('week', now()) + interval '2 days 23 hours';
```

## 출력 형식

```
🚀 Publish Readiness Check

[Code Quality]
✅ TypeScript: 0 errors
✅ ESLint: 0 errors

[Git Status]
✅ Working tree clean
🟢 Push pending: 3 commits

[Blog (if slug)]
✅ Frontmatter complete
✅ SEO checks passed
✅ No policy violations

[Environment]
✅ No missing env vars

[Supabase]
✅ All migrations applied

[Photo Slots]
🟡 7 slots unfilled (placeholders will show)

[Queue]
🟢 Next Wednesday publishing: 1 item ready

종합: 🟢 READY TO PUSH

다음 명령: git push origin main
```

## 실패 종류

- ❌ **HARD FAIL** (배포 차단): TypeScript 에러, 정책 위반, 마이그레이션 미적용
- ⚠️ **SOFT WARN** (배포 가능, 검토 필요): 사진 슬롯 미채움, 새 env 변수
- 🟢 **INFO** (참고만): 푸시 대기 커밋 수, 큐 상태

## 규칙

- HARD FAIL이 하나라도 있으면 git push 차단 권장
- WARN만 있으면 사용자 확인 후 진행 가능
- 본 커맨드는 권장만 함 (자동으로 git push하지 않음)
- 한국어 응답
