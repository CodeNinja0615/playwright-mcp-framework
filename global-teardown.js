import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export default async function globalTeardown() {
  const resultsDir = path.resolve('artifacts/allure-results');
  const reportDir = path.resolve('artifacts/allure-report');
  const allureCommand = path.resolve('node_modules/.bin/allure');

  try {
    await fs.access(resultsDir);
  } catch {
    return;
  }

  await execFileAsync(allureCommand, [
    'generate',
    resultsDir,
    '--clean',
    '--single-file',
    '--output',
    reportDir,
  ]);
}
