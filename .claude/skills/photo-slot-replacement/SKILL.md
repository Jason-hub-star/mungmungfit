---
name: photo-slot-replacement
description: Use when the user gives one or more photos to replace numbered 멍멍피트 website photo slots such as "#5", "#18", or "5번 사진".
---

# Photo Slot Replacement

## Use When

- 주인님이 사진 파일과 함께 `#N`, `N번`, `슬롯 N` 교체를 요청한다.
- 사이트 UI에 보이는 사진 번호와 실제 파일 경로를 연결해야 한다.
- 사진 교체 후 `content/placeholders.ts`와 사진 슬롯 문서가 어긋날 수 있다.

## Inputs

- Slot number shown in the UI
- Replacement image file path or attached image
- `content/placeholders.ts`
- `docs/photo-slots-reference.md`
- `docs/status/PHOTO-SLOTS-STATUS.md`

## Read First

1. `content/placeholders.ts`
2. `docs/photo-slots-reference.md`
3. `docs/status/PHOTO-SLOTS-STATUS.md`

## Steps

1. Find the slot whose `number` matches the user-provided number.
2. Save the image under `public/images/slots/{slot-id}.{ext}` unless the slot intentionally uses an existing non-slot asset.
3. Prefer `.jpg` for photos and `.png` only when transparency or generated artwork needs it.
4. Update the slot `src` in `content/placeholders.ts` to `/images/slots/{slot-id}.{ext}?v=YYYYMMDD-N` when cache busting is needed.
5. Keep the existing `alt`, `description`, `aspect`, `priority`, and `source` unless the replacement changes their meaning.
6. Update `docs/photo-slots-reference.md` and `docs/status/PHOTO-SLOTS-STATUS.md` when pending/filled state changes.
7. Run `npm run typecheck`.
8. Open or refresh the local site and visually confirm the replacement slot number still appears in the UI.

## Outputs

- Replaced image in `public/images/slots/`
- Updated `content/placeholders.ts` when needed
- Updated photo slot docs when status changes
- Verification note naming the slot number and route checked

## Verify

- `npm run typecheck` passes.
- The requested `#N` badge is visible on the site after replacement.
- No unrelated slot number or slot ID was changed.
- Existing user edits outside the touched files are preserved.

## Failure / Fallback

- If a slot number is missing, check whether it was retired in `docs/photo-slots-reference.md`.
- If multiple photos are provided without clear numbering, ask one concise clarification before editing.
- If the image has the wrong aspect ratio, still preserve the image and note whether cropping will be handled by CSS `object-fit`.
- If typecheck cannot run, record the command failure and the first next command to retry.

## Output Template

```text
- Slot:
- Image:
- Changed Files:
- Verification:
- Remaining Slots:
```
