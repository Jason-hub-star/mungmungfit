# 📚 멍멍피트 학습 레퍼런스 큐레이션

> 주인님(CSCC 보유 김주영 트레이너)의 **운동학·해부학·핸들링 심화 학습**을 위한 외부 자료 정본.
> 콘텐츠 제작과 학습을 동시에 가져가는 파이프라인의 입력 소스.
> Last Updated: 2026-05-12

---

## 0. 사용법

1. 각 자료는 `youtube_inspirations` 테이블 또는 노트에 INSERT
2. 주인님이 transcript·요약 보고 → **본인 언어로 한국화 1단락 작성** (학습 슬롯)
3. Claude가 SEO·구조·캡션 자동 보강 → 발행

→ 콘텐츠 1편 = 학습 1세션. **70% 자동 + 30% 본인 손**.

---

## 1. 🏆 1순위 — CSCC·핏포즈 직결

### Bobbie Lyons (Pawsitive Performance)
- **링크**: pawsitiveperformance.com / 유튜브 "Bobbie Lyons"
- **자격**: FitPaws Master Trainer, K9FITcoach 창시자
- **왜 1순위**: FitPaws 도구의 정석 활용법을 만든 사람. 도넛·디스크·스텝업 박스 시퀀스가 표준.
- **활용**: #5·#7·#8 슬롯과 직결 → 도구별 운동 시퀀스 블로그 시리즈

### Debbie Gross Torraca, DVM (Wizard of Paws Rehab)
- **링크**: wizardofpaws.net
- **자격**: 수의사 + Certified Canine Rehabilitation Therapist (CCRT)
- **왜 1순위**: 재활 의학 기반 운동학의 권위. 다만 "재활" 용어는 우리 콘텐츠에선 "근육 자극·활성화"로 우회.
- **활용**: 견종별 약점 매뉴얼 (의료 표현 제거 버전)

### Christine Zink, DVM
- **링크**: caninesports.com
- **책**:
  - 🔥 **"Peak Performance: Coaching the Canine Athlete"** (피트니스 트레이너 필독)
  - "The Agility Advantage"
- **왜 1순위**: 스포츠견 컨디셔닝의 표준 교과서. CSCC 시험에도 인용되는 자료.

---

## 2. 🎯 2순위 — 방법론·정수

### Sasha Foster (Bobbie Lyons 후속 세대)
- **책**: **"Canine Cross Training"** ⭐ 한국에 거의 알려지지 않은 피트니스 입문서 표준
- **자격**: Certified Professional Dog Trainer + Canine Fitness Trainer
- **왜 추천**: 보호자가 집에서 따라할 수 있는 5분 루틴이 카테고리별로 정리됨. **"우리집 1평 거실 루틴" 시리즈의 원형**.

### Susan Garrett (Say Yes Dog Training)
- **링크**: dogsthat.com
- **포커스**: 어질리티·focus·motivation
- **왜 추천**: "강아지 자신감"·"보호자 핸들링 타이밍"의 가장 정교한 방법론. 멍멍피트의 "보호자 핸들링" 영역 핵심.

### Stonnie Dennis
- **링크**: 유튜브 "Stonnie Dennis"
- **포커스**: 무도구 자연주의 핸들링
- **왜 추천**: 도구 의존도가 낮은 보호자에게 권할 "도구 없이도 가능한 것" 콘텐츠 소스.

---

## 3. 📺 3순위 — 콘텐츠 가공용 (출처 표기 필수, 본인 재현 필수)

### Zak George (Zak George's Dog Training Revolution)
- **링크**: 유튜브 "Zak George"
- **포커스**: 줄당김·basic obedience·boredom busters
- **활용 룰**: 방법론만 차용 → 본인이 헬퍼견과 직접 재현 → "Zak George 방법을 한국 환경에 맞게 재해석" 명시

### Kikopup (Emily Larlham, Dogmantics)
- **링크**: 유튜브 "kikopup"
- **포커스**: 무공포(progressive) 훈련의 표준
- **왜 가치**: 한국 보호자가 가장 자주 검색하는 "혼내지 않는 훈련" 답변의 정수.

### McCann Dog Training
- **링크**: 유튜브 "McCann Dog Training"
- **포커스**: 가족 친화·일상 매너
- **활용**: FAQ 카드뉴스 답변 소스

### ⛔ 절대 인용 금지
- **Cesar Millan (시저밀란)**: 도미넌스 이론 논쟁적, 한국 시장에서 부정적 시그널

---

## 4. 🇰🇷 한국 시장 부재 영역 (선점 기회 = 본인 학습 기회)

| 영역 | 한국 자료 | 영문 1차 자료 | 선점 카드 |
|------|----------|--------------|-----------|
| **독피트니스 운동학** | 거의 없음 | Lyons / Foster / Zink | 메인 시리즈 |
| **견종별 약한 근육 매뉴얼** | 없음 (의료 영역만 존재) | Zink "Peak Performance" Ch.7 | "근육 자극" 표현으로 우회 |
| **핏포즈 도구별 시퀀스** | 없음 | Lyons youtube | 도구 × 근육 4×4 매트릭스 |
| **거실 5분 루틴** | 산발적 | Foster "Cross Training" | 견종·체급별 표준화 |
| **노령견 컨디셔닝** | 의료(재활) 영역만 | Gross / Zink | "근육 활성화"로 우회 |

→ 이 5개가 본인 학습 + 한국 1등 콘텐츠를 동시에 가져갈 영역.

---

## 5. 🧠 학습 추적 (제안)

`youtube_inspirations` 테이블 외에 본인 학습 노트도 별도 컬럼 추천:

```sql
ALTER TABLE youtube_inspirations
  ADD COLUMN learning_note text,        -- 본인이 보고 배운 점 1단락
  ADD COLUMN kr_adaptation text,        -- 한국화 해석 1단락
  ADD COLUMN content_used_count int DEFAULT 0;
```

→ 한 자료를 여러 콘텐츠에 우려낼 때마다 `content_used_count++`.

---

## 6. 🔖 시드 INSERT 예시

발행 가동 후 첫 주에 INSERT할 1순위 시드:

```sql
INSERT INTO youtube_inspirations (channel, video_url, video_title, title_ko, key_concepts) VALUES
('Bobbie Lyons', 'https://www.youtube.com/@PawsitivePerformance', 'FitPaws Donut Foundation', '도넛 디스크 기초', '{"concepts": ["정적 균형", "체중 분산", "코어 자극"]}'),
('Susan Garrett', 'https://www.youtube.com/@dogsthat', 'Focus & Motivation Series', '집중·동기 시리즈', '{"concepts": ["보호자 핸들링", "타이밍", "보상 가치"]}'),
('Sasha Foster', NULL, 'Canine Cross Training Book', '강아지 크로스 트레이닝(책)', '{"concepts": ["5분 루틴", "도구 매트릭스", "보호자 가이드"]}'),
('Kikopup', 'https://www.youtube.com/@kikopup', 'Loose Leash Walking', '줄당김 무공포 교정', '{"concepts": ["무공포", "양방향 보상", "progressive"]}');
```

---

## 7. 책 구매 우선순위

| 우선순위 | 제목 | 저자 | 가격대 | 비고 |
|----------|------|------|--------|------|
| 🔥 1 | Peak Performance: Coaching the Canine Athlete | Christine Zink | $40~ | 한국 미번역. 영문 원서 |
| 🔥 1 | Canine Cross Training | Sasha Foster | $25~ | 보호자 친화 |
| 🎯 2 | Building the Canine Athlete | Bobbie Lyons (online course) | $200~ | 온라인 강의 |
| 🎯 2 | The Agility Advantage | Christine Zink | $30~ | |

→ Peak Performance 1권만 사도 1년치 블로그 소스 확보.

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-12
**갱신 룰**: 새 자료 학습 후 본 문서에 추가, `youtube_inspirations` 테이블에 동기화.
