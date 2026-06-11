// Golden-hour grade: one curve for every photograph on the site.
// Usage: node tools/grade-images.mjs
// Originals are preserved in image-originals/ (first run only).

import sharp from "sharp";
import { readdir, mkdir, copyFile, access } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC_DIRS = ["public/images", "public/images/domains"];
const BACKUP = join(ROOT, "image-originals");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function gradeFile(absPath, relPath) {
  const backupPath = join(BACKUP, relPath);
  await mkdir(join(backupPath, ".."), { recursive: true });
  if (!(await exists(backupPath))) {
    await copyFile(absPath, backupPath);
  }
  // Always grade from the pristine original so re-runs don't compound.
  const buf = await sharp(backupPath)
    // lift blacks, soften contrast: out = in * 0.94 + 14
    .linear(0.94, 14)
    // desaturate ~15%
    .modulate({ saturation: 0.85 })
    // warm matrix: push red/green up, pull blue down
    .recomb([
      [1.05, 0.03, 0.0],
      [0.01, 1.0, 0.01],
      [0.0, 0.03, 0.86],
    ])
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  await sharp(buf).toFile(absPath);
}

const failures = [];
for (const dir of SRC_DIRS) {
  const abs = join(ROOT, dir);
  const entries = await readdir(abs, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile() || !/\.jpe?g$/i.test(e.name)) continue;
    const absPath = join(abs, e.name);
    const relPath = relative(join(ROOT, "public"), absPath);
    try {
      await gradeFile(absPath, relPath);
      console.log("graded", relPath);
    } catch (err) {
      failures.push([relPath, err.message]);
    }
  }
}
if (failures.length) {
  console.error("FAILED:", failures);
  process.exit(1);
}
console.log("done — originals in image-originals/");
