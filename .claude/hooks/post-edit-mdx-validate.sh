#!/bin/bash
# PostToolUse hook: content/blog/*.mdx 편집 후 frontmatter 필수 필드 검증

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# .mdx 파일만 검사 (mungmungfit/content/blog 하위)
if [[ "$FILE_PATH" =~ ^/Users/family/jason/mungmungfit/content/blog/.+\.mdx$ ]]; then
  REQUIRED_FIELDS=("slug" "title" "description" "date" "author" "category")
  MISSING=()

  for field in "${REQUIRED_FIELDS[@]}"; do
    if ! grep -q "^${field}:" "$FILE_PATH"; then
      MISSING+=("$field")
    fi
  done

  if [ ${#MISSING[@]} -gt 0 ]; then
    echo "⚠️  MDX frontmatter missing required fields in $FILE_PATH:" >&2
    printf '   - %s\n' "${MISSING[@]}" >&2
    echo "   Run /blog-lint for full check." >&2
  fi

  # 정책 위반 단어 즉시 검출
  for blocked in "시저밀란" "퍼피빌" "쿠팡파트너스"; do
    if grep -q "$blocked" "$FILE_PATH"; then
      echo "❌ Policy violation in $FILE_PATH: '$blocked' detected" >&2
    fi
  done
fi

exit 0
