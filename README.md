# Nightly Versioning Action
Add lastest commit hash as semver pre-release version.<br>
For example, bump `1.0.0-rc.0` to `1.0.0-rc.0.a1b2c3d`.

## Example usage

```yaml
- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Set nightly version
  uses: significantbit/nightly-versioning-action@main

- name: Publish package
  run: pnpm publish --no-git-checks
```