# Nightly Versioning Action

Use current commit hash as semver pre-release version in _package.json_.<br>
For example, bump `1.0.0-rc.0` to `1.0.0-rc.0.a1b2c3d`.

## Example usage

```yaml
name: Create nightly release

on: workflow_dispatch

jobs:
  publish:
    name: Publish package
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3

      - uses: pnpm/action-setup@v2
        name: Install pnpm

      - name: Set nightly version
        uses: significantbit/nightly-versioning-action@v1

      - name: Publish package
        run: pnpm publish --no-git-checks --tag next
```