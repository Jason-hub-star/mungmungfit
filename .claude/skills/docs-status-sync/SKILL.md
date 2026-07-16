---
name: docs-status-sync
description: Use when implementation changes should be reflected in 멍멍피트 status, queue, photo-slot, automation, or handoff documents.
---

# Docs Status Sync

## Use When

- A website surface, photo slot, automation, queue, or content workflow changes.
- `docs/status/*.md` may contradict code, content JSON, or slot registry state.
- The task changes how future agents should operate.

## Inputs

- Changed file list
- `docs/status/PROJECT-STATUS.md`
- The nearest status doc, such as `docs/status/PHOTO-SLOTS-STATUS.md`
- The related reference doc, such as `docs/photo-slots-reference.md`

## Read First

1. `docs/status/PROJECT-STATUS.md`
2. The status doc closest to the changed workflow
3. The related reference or handoff document

## Steps

1. Identify the nearest source of truth for the changed fact.
2. Keep full procedural detail in the reference doc, not in `PROJECT-STATUS.md`.
3. Update the status doc with the new state, evidence, and remaining follow-up.
4. Add a short `PROJECT-STATUS.md` addendum only when phase, workflow, or project direction changed.
5. Record one concrete verification command or manual check.

## Outputs

- Updated status or reference docs
- Short verification evidence
- Clear remaining follow-up list when work is incomplete

## Verify

- Status docs and reference docs do not disagree.
- The latest status can be restored from the documented loading order.
- Verification evidence is specific enough to rerun.

## Failure / Fallback

- If the source of truth is unclear, mark the doc section as pending rather than inventing certainty.
- If a doc is stale but unrelated to the task, note it as follow-up instead of broadening the edit.
- If verification cannot run, state the exact blocker and next command.

## Output Template

```text
- Changed Docs:
- Source Of Truth:
- Verification:
- Follow-up:
```
