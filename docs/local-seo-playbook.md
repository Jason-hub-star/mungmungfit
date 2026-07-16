# 로컬 SEO 플레이북 — 정본

> 멍멍피트는 방문훈련 서비스라 **로컬 SEO**가 검색 유입의 1순위 채널.
> 본 문서는 사용자(주인)가 직접 진행해야 하는 외부 작업 + 사이트 측 NAP 일치 점검 절차를 정리.

---

## 1. NAP 정의 — 정본 1곳

NAP = Name · Address · Phone. **사이트와 외부 등록처(Google·네이버 등) 모두 100% 일치해야 신뢰점수 ↑**.

| 필드 | 정본 위치 | 현재 값 |
|---|---|---|
| Name | `content/site-content.json` `site.name` | "멍멍피트" |
| English Name | `site.englishName` | "Mungmungfit" |
| Phone | `site.phoneDisplay` | "010-2609-6593" |
| Address Region | `businessInfo.address.addressRegion` | "서울" |
| Address Locality | `businessInfo.address.addressLocality` | (미입력 — 사용자 결정 필요) |
| Street Address | `businessInfo.address.streetAddress` | (미입력) |
| 운영시간 | `businessInfo.openingHoursDisplay` | "평일 10:00~20:00 · 주말 10:00~18:00" |
| 이메일 | `businessInfo.email` | (미입력) |
| 사업자등록번호 | `businessInfo.registrationNumber` | (미입력) |
| SNS | `businessInfo.sameAs` | 인스타·유튜브 |

→ 미입력 항목을 채우려면 `content/site-content.json`의 `businessInfo` 키를 수정. 사이트는 graceful 자동 노출.

---

## 2. Google Business Profile (GBP) 등록 — 사용자 직접

방문훈련은 매장 없이 출장만 진행 → **"지역 서비스 비즈니스"(SAB, Service Area Business)**로 등록.

### 단계
1. https://business.google.com 접속 → 비즈니스 추가 → "여러 지역에 서비스 제공"
2. 비즈니스 이름: **멍멍피트**
3. 카테고리:
   - 1순위: "Pet trainer" (반려동물 훈련사)
   - 2순위: "Dog day care center" 
4. **물리 주소 비공개 + 서비스 지역만 공개** 옵션 선택 (강사 자택을 노출 안 해도 됨)
5. 서비스 지역: 서울특별시 / 경기도 / 인천광역시 / 충청남도 / 충청북도
6. 전화: `010-2609-6593` (사이트 phoneDisplay와 일치)
7. 웹사이트: `https://mungmungfit.kr`
8. 운영시간: 평일 10:00–20:00 / 토·일 10:00–18:00 (사이트와 일치)
9. **소유권 확인**: 우편엽서(2주 소요) / 영상통화 / 이메일 — 가장 빠른 옵션 선택
10. 승인 후 비즈니스 상세 페이지에 다음 추가:
    - 사진 5장 이상 (트레이너·수업 장면·헬퍼견 메이·도구·강아지 변화)
    - 서비스 항목 4개: 독피트니스 방문훈련 / 노령견 재활 / 비만견 다이어트 / 퍼피 사회화
    - 가격: "1회 89,000원~ / 3회 패키지 187,000원"

### 검증
- [ ] GBP 비즈니스 페이지의 이름·전화·도메인이 사이트와 100% 일치
- [ ] GBP 서비스 지역이 사이트 `/areas/[slug]` 4개와 동일
- [ ] GBP 카테고리 1·2가 명확히 "Pet trainer" 계열

---

## 3. 네이버 스마트플레이스 — 사용자 직접

한국에선 **네이버 검색이 Google보다 시장 점유율 높음**. 필수.

### 단계
1. https://smartplace.naver.com 접속 → 신규 등록 → "서비스업"
2. 업종: 반려동물 훈련 → 강아지 훈련사
3. NAP 동일 입력 (위 표 기준)
4. 인증: 사업자등록번호 또는 우편엽서
5. 가격표·이용 가이드·후기 응답 활성화
6. 네이버 검색 등록 (네이버 서치어드바이저 별도)

### 네이버 서치어드바이저
1. https://searchadvisor.naver.com → 사이트 등록
2. 메타 태그 또는 HTML 파일 인증 → `app/layout.tsx`의 `metadata.verification.other`에 `"naver-site-verification": "{token}"` 추가
3. `https://mungmungfit.kr/sitemap.xml` 등록
4. RSS `https://mungmungfit.kr/feed.xml` 등록 → 블로그 자동 색인

---

## 4. 후기 유도 — 카카오 메시지 템플릿

수업 종료 후 보호자에게 보낼 메시지.

### 템플릿 A — 3회 패키지 종료 시
```
{보호자 호칭}, 3회 수업 마무리 정말 수고 많으셨어요 🐕

{강아지 이름}이/가 {핵심 변화 1줄}한 모습 보면서 저도 정말 뿌듯했습니다.

혹시 시간 괜찮으시면, 다른 보호자분들이 참고하실 수 있게
짧은 후기 한 줄만 남겨주실 수 있을까요?

🟢 구글: {GBP 후기 링크}
🟢 네이버: {네이버플레이스 후기 링크}

(어느 쪽이든 한 곳만 남겨주셔도 큰 힘이 됩니다)

— 김주영 트레이너 드림
```

### 템플릿 B — 1회 단발 후
```
{보호자 호칭}, 오늘 평가 수업 함께 해주셔서 감사했어요!

오늘 알려드린 5분 루틴 한 주만 시도해보시고
{강아지 이름}이/가 어떻게 반응하는지 짧게 남겨주시면 감사하겠습니다.

→ {GBP 또는 네이버 후기 링크}
```

### 후기 후 사이트 반영
1. 보호자 동의 후 `content/site-content.json` `reviews[]`에 추가:
   ```json
   {
     "title": "...",
     "body": "...",
     "tags": ["..."],
     "meta": "{견종} · {나이} · {지역}",
     "breed": "...", "age": "...", "area": "...",
     "rating": 5,
     "datePublished": "YYYY-MM-DD",
     "authorName": "보호자(익명)"
   }
   ```
2. 자동으로 `aggregateRating` JSON-LD 갱신 (`getAggregateRating` 헬퍼)
3. `/reviews` 페이지에 새 사진 받으면 `reviewImages` 배열도 갱신

---

## 5. 백링크 작업 — 사용자 직접

### 우선순위
1. **반려견 커뮤니티** 자기소개 글 (강형욱 채널·도그마스터 게시판 등) — 자연 백링크
2. **블로그 카페** 글 작성 (멍멍피트 블로그 글 1편을 카페에 인용 + 원본 링크)
3. **인스타그램 bio·유튜브 채널 about** → `https://mungmungfit.kr` 노출 (이미 sameAs로 schema 연결됨)
4. **지역 매체 기고**: 지자체 반려동물 행사 진행 경력 활용해 지역 신문·블로그 기고

### 금지
- 링크팜·유료 백링크 — Google penalty 위험
- 스팸 댓글 게시 — 즉시 nofollow + 신뢰 ↓

---

## 6. 측정·반복

| 도구 | 확인 빈도 | 핵심 지표 |
|---|---|---|
| Google Search Console | 주 1회 | 색인 페이지 수·노출·클릭·평균 순위 |
| 네이버 서치어드바이저 | 주 1회 | 색인·검색 키워드 |
| GBP 인사이트 | 월 1회 | 검색 → GBP 노출 → 전화·웹사이트 클릭 수 |
| Vercel Speed Insights | 주 1회 (자동) | 실측 LCP·INP·CLS |
| `seo-health-check` 자동화 | 주 1회 (월요일) | 라우트·schema·Lighthouse 회귀 |

---

## 관련 정본

- **사이트 NAP 정본**: `content/site-content.json` (`site`·`businessInfo`)
- **SEO 로드맵**: `docs/seo-roadmap.md`
- **SEO Health Status**: `docs/status/SEO-HEALTH-STATUS.md`
- **자동화 인덱스**: `.claude/CLAUDE.md`
