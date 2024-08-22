# Nightly Versioning Action

Use current commit hash as semver pre-release version in _package.json_.<br>
For example, bump `1.0.0` to `1.0.0-a1b2c3d`.

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
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4

      - name: Set nightly version
        uses: significantbit/nightly-versioning-action@v2

      - name: Publish package
        run: npm publish --no-git-checks --tag next
```

## Example usage with release-please
You can run `release-please` in dry-run mode to determine the next version.
```yaml
- name: Run release-please
  id: release-please
  run: echo version=$(npx release-please release-pr --dry-run --repo-url ${{ github.event.repository.url }} --token ${{ secrets.GITHUB_TOKEN }} --release-type node | grep -Po 'release \d.*' | grep -Po '\d.*') >> $GITHUB_OUTPUT

- name: Set nightly version
  uses: significantbit/nightly-versioning-action@v2
  with:
    dry-run: true
    version: ${{ steps.release-please.outputs.version }}
```