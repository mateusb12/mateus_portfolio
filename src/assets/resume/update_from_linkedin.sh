#!/bin/bash
set -euo pipefail

HAR="profile.har"

echo "[1] Searching Pontotel block inside HAR…"

BLOCK=$(rg -iU '"Pontotel"' -A200 -B20 "$HAR" || true)

if [[ -z "$BLOCK" ]]; then
    echo "❌ Could not find Pontotel block."
    exit 1
fi

echo "---------------------------------------------"
echo "[ Found block ]"
echo "---------------------------------------------"
echo "$BLOCK"
echo "---------------------------------------------"

# Extract the URL
URL=$(echo "$BLOCK" | rg -o 'https[^"]+' | head -n1)

if [[ -z "$URL" ]]; then
    echo "❌ Could not extract URL."
    exit 1
fi

echo "[2] Extracted URL:"
echo "$URL"
echo "---------------------------------------------"

# Extract headers needed
CSRF=$(echo "$BLOCK" | rg -o 'ajax:[^"]+' | head -n1)
LI_AT=$(echo "$BLOCK" | rg -o 'AQ[^;]+' | head -n1)
JSESSION=$(echo "$BLOCK" | rg -o 'ajax:[^;]+' -m1 | tail -n1)

echo "[3] Extracted cookies:"
echo "csrf-token: $CSRF"
echo "li_at: $LI_AT"
echo "JSESSIONID: $JSESSION"
echo "---------------------------------------------"

# Build the final curl
CURL_CMD=$(cat <<EOF
curl "$URL" \
  -H "csrf-token: $CSRF" \
  -H "cookie: li_at=$LI_AT; JSESSIONID=$JSESSION" \
  -H "accept: application/vnd.linkedin.normalized+json+2.1"
EOF
)

echo "[4] Final cURL command:"
echo "---------------------------------------------"
echo "$CURL_CMD"
echo "---------------------------------------------"

echo "[5] Running cURL…"

RESPONSE=$(eval "$CURL_CMD" 2>/dev/null || true)

echo "[6] Response:"
echo "---------------------------------------------"
echo "$RESPONSE"
echo "---------------------------------------------"
