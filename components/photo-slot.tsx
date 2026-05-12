import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { getSlot, type PhotoSlotDef } from "@/content/placeholders";

type Props = {
  slotId: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function PhotoSlot({ slotId, className, priority, sizes }: Props) {
  const slot = getSlot(slotId as Parameters<typeof getSlot>[0]);

  if (!slot) {
    return (
      <div className="photo-slot photo-slot-error">
        <span>슬롯 {slotId}을(를) 찾을 수 없음</span>
      </div>
    );
  }

  if (slot.src) {
    return (
      <div className={`photo-slot photo-slot-filled ${className ?? ""}`}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 940px) 100vw, 50vw"}
          className="photo-img"
        />
      </div>
    );
  }

  return <PhotoSlotPlaceholder slot={slot} className={className} />;
}

function PhotoSlotPlaceholder({
  slot,
  className,
}: {
  slot: PhotoSlotDef;
  className?: string;
}) {
  const aspectValue = slot.aspect.replace("/", " / ");

  return (
    <div
      className={`photo-slot photo-slot-placeholder ${className ?? ""}`}
      style={{ aspectRatio: aspectValue }}
      aria-label={`사진 슬롯 #${slot.number}: ${slot.description}`}
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
