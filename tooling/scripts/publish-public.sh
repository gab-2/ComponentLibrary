#!/usr/bin/env bash
set -euo pipefail

PACKAGES=(
  "@sua-marca-ui/tokens"
  "@sua-marca-ui/styles"
  "@sua-marca-ui/core"
  "@sua-marca-ui/icons"
  "@sua-marca-ui/react"
  "@sua-marca-ui/vue"
  "@sua-marca-ui/angular"
  "@sua-marca-ui/svelte"
  "@sua-marca-ui/web-components"
)

echo "==> Checking npm authentication"
npm whoami >/dev/null

echo "==> Running pre-publish checks"
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build

for pkg in "${PACKAGES[@]}"; do
  echo "==> Publishing ${pkg}"
  pnpm --filter "${pkg}" publish --access public --no-git-checks

  echo "==> Verifying ${pkg} on npm"
  npm view "${pkg}" version >/dev/null
  echo "Published ${pkg} successfully"
done

echo "All public packages were published and verified."
