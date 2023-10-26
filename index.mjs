import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { setFailed, setOutput, getInput } from '@actions/core'
import { context } from '@actions/github'
import { parse } from 'semver'

/**
 * Analyze package.json and prepare a new version
 * @param {string} commitHash Current commit hash
 */
const getNewVersion = (commitHash) => {
  const path = resolve(process.cwd(), 'package.json')
  const file = readFileSync(path, 'utf8')
  const pkg = JSON.parse(file)
  const version = pkg.version

  if (!version)
    throw new Error('No version found in package.json')

  const semver = parse(version, { loose: true })
  semver.prerelease = [...semver.prerelease, commitHash]
  const newVersion = semver.format()

  pkg.version = newVersion
  const newPkg = JSON.stringify(pkg, null, 2)

  return {
    /**
     * New version
     * @type {string}
     */
    version: newVersion,
    /**
     * Write new version to package.json
     */
    writeFile: () => writeFileSync(path, newPkg, 'utf8')
  }
}

try {
  // Get new version
  const { version, writeFile } = getNewVersion(context.sha.substring(0, 7))
  console.log(`New version: ${version}`)

  // Write new version to package.json
  const dryRun = getInput('dry-run')
  if (dryRun !== 'true') {
    writeFile()
    console.log('package.json updated')
  } else {
    console.log('Dry run detected, package.json was not updated')
  }

  // Set output
  setOutput('version', version)
} catch (error) {
  setFailed(error.message)
}