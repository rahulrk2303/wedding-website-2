import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const SRC_DIR = path.resolve(process.cwd(), 'assets', 'gallery');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'optimized-gallery');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

function isImage(file) {
  return /\.(jpe?g|png|webp|svg)$/i.test(file);
}

async function optimize() {
  await ensureDir(OUT_DIR);

  const files = (await fs.readdir(SRC_DIR)).filter(isImage);
  const sizes = [800, 1200];
  const manifest = [];
  // Remove old WebP and any 400px variants from output dir
  try {
    const outFiles = await fs.readdir(OUT_DIR);
    for (const f of outFiles) {
      if (/\.webp$/i.test(f) || /-400\.jpg$/i.test(f)) {
        await fs.unlink(path.join(OUT_DIR, f)).catch(() => {});
      }
    }
  } catch (e) {}

  for (const file of files) {
    const inputPath = path.join(SRC_DIR, file);
    const name = path.parse(file).name;
    const ext = path.parse(file).ext.toLowerCase();

    try {
      const image = sharp(inputPath);
      const meta = await image.metadata();
      const availableSizes = sizes.filter(s => !meta.width || s <= meta.width).map(s => s);
      if (availableSizes.length === 0) availableSizes.push(Math.min(meta.width || 1200, 1200));

      const jpgEntries = [];

      for (const s of availableSizes) {
        const jpgOut = `${name}-${s}.jpg`;
        const jpgPath = path.join(OUT_DIR, jpgOut);

        await sharp(inputPath)
          .resize({ width: s })
          .jpeg({ quality: 90 })
          .toFile(jpgPath);

        jpgEntries.push(`/optimized-gallery/${jpgOut} ${s}w`);
      }

      const largest = Math.max(...availableSizes);

      manifest.push({
        id: file,
        fallback: `/optimized-gallery/${name}-${largest}.jpg`,
        jpgSrcSet: jpgEntries.join(', '),
        sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw'
      });
    } catch (err) {
      console.error('Failed optimizing', file, err);
    }
  }

  await fs.writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Optimized', manifest.length, 'images. Output -> public/optimized-gallery');
}

optimize().catch(err => { console.error(err); process.exit(1); });
