import Image from "next/image";
import { font, space } from "@/styles/tokens";

/**
 * 블로그 본문 이미지.
 *
 * 사용:
 *   <BlogImage src="https://...supabase.co/storage/.../foo.webp" caption="..." />
 *   <BlogImage src="/images/blog/foo.png" alt="..." aspect="4/3" />
 *
 * Supabase Storage 공용 URL은 next.config.ts의 remotePatterns로 허용됨.
 */
type Props = {
  src: string;
  alt?: string;
  caption?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "4/5" | "3/2";
};

export function BlogImage({ src, alt, caption, aspect = "16/9" }: Props) {
  const aspectValue = aspect.replace("/", " / ");

  return (
    <figure
      style={{
        margin: `${space.xxl} 0`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: aspectValue,
          background: "var(--paper-deep)",
        }}
      >
        <Image
          src={src}
          alt={alt ?? caption ?? "blog image"}
          fill
          sizes="(max-width: 940px) 100vw, 800px"
          style={{ objectFit: "cover" }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: space.sm,
            fontSize: font.small,
            color: "var(--ink-muted)",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
