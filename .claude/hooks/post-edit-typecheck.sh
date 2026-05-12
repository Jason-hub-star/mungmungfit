#!/bin/bash
# PostToolUse hook: Next.js TypeScript 파일 편집 후 자동 tsc --noEmit
# stderr로 출력해서 Claude 컨텍스트에 결과 전달

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# .ts, .tsx, .mts, .cts 파일만 검사 (mungmungfit 루트 기준)
if [[ "$FILE_PATH" =~ ^/Users/family/jason/mungmungfit/.+\.(tsx?|mts|cts)$ ]] && [[ ! "$FILE_PATH" =~ /node_modules/ ]]; then
  cd /Users/family/jason/mungmungfit
  RESULT=$(npx tsc --noEmit --pretty 2>&1)
  EXIT_CODE=$?

  if [ $EXIT_CODE -ne 0 ]; then
    echo "❌ TypeScript errors after editing $FILE_PATH:" >&2
    echo "$RESULT" | tail -20 >&2
  fi
fi

exit 0
