import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { getSlot, type PhotoSlotDef } from "@/content/placeholders";

type Props = {
  slotId: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// 슬롯 번호 배지는 사진 교체 워크플로용 관리 도구 — 운영 화면에는 숨긴다
const showSlotBadges = process.env.NODE_ENV === "development";

export function PhotoSlot({ slotId, className, priority, sizes }: Props) {
  const slot = getSlot(slotId as Parameters<typeof getSlot>[0]);

  if (!slot) {
    return (
      <div className="photo-slot photo-slot-error">
        <span>슬롯 {slotId}을(를) 찾을 수 없음</span>
      </div>
    );
  }

  const aspectValue = slot.aspect.replace("/", " / ");
  const slotLabel = `사진 슬롯 #${slot.number}: ${slot.description}`;

  if (slot.src) {
    return (
      <div
        className={`photo-slot photo-slot-filled ${className ?? ""}`}
        style={{ aspectRatio: aspectValue }}
        aria-label={slotLabel}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 940px) 100vw, 50vw"}
          className="photo-img"
        />
        {showSlotBadges && (
          <>
            <span className="photo-slot-number">#{slot.number}</span>
            <span className="photo-slot-replace-label">교체 #{slot.number}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <PhotoSlotPlaceholder
      slot={slot}
      className={className}
      aspectValue={aspectValue}
      slotLabel={slotLabel}
    />
  );
}

function PhotoSlotPlaceholder({
  slot,
  className,
  aspectValue,
  slotLabel,
}: {
  slot: PhotoSlotDef;
  className?: string;
  aspectValue: string;
  slotLabel: string;
}) {
  return (
    <div
      className={`photo-slot photo-slot-placeholder ${className ?? ""}`}
      style={{ aspectRatio: aspectValue }}
      aria-label={slotLabel}
    >
      <span className="photo-slot-number">#{slot.number}</span>
      <ImagePlus size={28} aria-hidden className="photo-slot-icon" />
      <span className="photo-slot-section">{slot.section}</span>
      <span className="photo-slot-desc">{slot.description}</span>
      <span className="photo-slot-meta">
        {slot.aspect} · {sourceLabel(slot.source)} · 우선순위 {slot.priority}
      </span>
    </div>
  );
}

function sourceLabel(source: PhotoSlotDef["source"]): string {
  switch (source) {
    case "owner-photo":
      return "주인님 사진";
    case "ai-generated":
      return "AI 생성";
    case "existing":
      return "기존";
  }
}
