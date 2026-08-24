import fs from 'node:fs/promises';
import path from 'node:path';

export default async function globalSetup() {
  await fs.rm(path.resolve('artifacts'), { recursive: true, force: true });
  await fs.mkdir(path.resolve('artifacts'), { recursive: true });
}
