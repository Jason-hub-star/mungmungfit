-- 멍멍피트 마케팅 자동화 큐 시스템
-- 실행 대상: Supabase 프로젝트 qufjlveukaoiokhpkhwj
-- 실행 방법: Supabase Studio → SQL Editor에서 전체 복사 → Run

-- =====================================================
-- 1. instagram_queue (Manus가 pull → create_instagram)
-- =====================================================
CREATE TABLE IF NOT EXISTS instagram_queue (
  id BIGSERIAL PRIMARY KEY,
  status TEXT CHECK (status IN ('pending', 'published', 'analyzed', 'failed')) DEFAULT 'pending',
  content_type TEXT CHECK (content_type IN ('post', 'reel', 'story', 'carousel')),
  media_urls TEXT[],
  caption TEXT,
  hashtags TEXT[],
  source TEXT,
  blog_slug TEXT,
  reference_url TEXT,
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  instagram_post_id TEXT,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_instagram_queue_status ON instagram_queue (status, scheduled_at);

-- =====================================================
-- 2. threads_queue (vibehub1030 계정으로 발행)
-- =====================================================
CREATE TABLE IF NOT EXISTS threads_queue (
  id BIGSERIAL PRIMARY KEY,
  status TEXT CHECK (status IN ('pending', 'published', 'failed')) DEFAULT 'pending',
  text TEXT,
  media_url TEXT,
  link_url TEXT,
  account_handle TEXT DEFAULT 'vibehub1030',
  source TEXT,
  blog_slug TEXT,
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  threads_post_id TEXT,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_threads_queue_status ON threads_queue (status, scheduled_at);

-- =====================================================
-- 3. youtube_inspirations (해외 유튜브 가공 원천)
-- =====================================================
CREATE TABLE IF NOT EXISTS youtube_inspirations (
  id BIGSERIAL PRIMARY KEY,
  channel TEXT NOT NULL,
  video_url TEXT UNIQUE NOT NULL,
  video_title TEXT,
  title_ko TEXT,
  transcript TEXT,
  key_concepts JSONB,
  used_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 4. pet_tech_products (펫테크 리뷰 소스)
-- =====================================================
CREATE TABLE IF NOT EXISTS pet_tech_products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price_krw INTEGER,
  source_url TEXT UNIQUE,
  image_url TEXT,
  pros TEXT[],
  cons TEXT[],
  notes TEXT,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 5. insights_log (게시 후 인사이트 누적)
-- =====================================================
CREATE TABLE IF NOT EXISTS insights_log (
  id BIGSERIAL PRIMARY KEY,
  queue_id BIGINT REFERENCES instagram_queue(id),
  platform TEXT CHECK (platform IN ('instagram', 'threads')),
  views INTEGER,
  reach INTEGER,
  likes INTEGER,
  comments INTEGER,
  shares INTEGER,
  saves INTEGER,
  raw JSONB,
  collected_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 6. content_calendar (Google Sheets sync 대상)
-- =====================================================
CREATE TABLE IF NOT EXISTS content_calendar (
  id BIGSERIAL PRIMARY KEY,
  publish_date DATE NOT NULL,
  weekday TEXT,
  category TEXT,
  title TEXT,
  status TEXT CHECK (status IN ('planned', 'drafting', 'queued', 'published')) DEFAULT 'planned',
  blog_slug TEXT,
  instagram_queue_id BIGINT REFERENCES instagram_queue(id),
  threads_queue_id BIGINT REFERENCES threads_queue(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_content_calendar_date ON content_calendar (publish_date);

-- =====================================================
-- 완료 확인
-- =====================================================
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'instagram_queue',
    'threads_queue',
    'youtube_inspirations',
    'pet_tech_products',
    'insights_log',
    'content_calendar'
  )
ORDER BY table_name;
