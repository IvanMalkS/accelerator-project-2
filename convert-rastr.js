import sharp from 'sharp';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';
import path from 'path';
import fs from 'fs';

// Get all files with extensions jpg and png
const files = globSync('source/**/*.{png,jpg,jpeg}');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// Convert all files to webp and generate retina versions
bar1.start(files.length, 0);
const work = files.map(async (file) => {
  const { dir, name, ext } = path.parse(file);
  const outputDir = path.join(dir);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile1x = path.join(outputDir, `${name}@1x${ext}`);
  const outputFile2x = path.join(outputDir, `${name}@2x${ext}`);
  const outputFileWebp1x = path.join(outputDir, `${name}@1x.webp`);
  const outputFileWebp2x = path.join(outputDir, `${name}@2x.webp`);

  // Check if the optimized files already exist
  if (fs.existsSync(outputFile1x) && fs.existsSync(outputFile2x) && fs.existsSync(outputFileWebp1x) && fs.existsSync(outputFileWebp2x)) {
    bar1.increment();
    return;
  }

  // Skip files with '@' in the name
  if (name.includes('@')) {
    bar1.increment();
    return;
  }

  // Read the original image
  const image = sharp(file);
  const metadata = await image.metadata();

  // Generate 1x version in original format
  await image.clone().resize(Math.round(metadata.width / 2), Math.round(metadata.height / 2)).toFile(outputFile1x);

  // Generate 2x version in original format
  await image.clone().toFile(outputFile2x);

  // Generate 1x version in WebP format
  await image.clone().resize(Math.round(metadata.width / 2), Math.round(metadata.height / 2)).webp().toFile(outputFileWebp1x);

  // Generate 2x version in WebP format
  await image.clone().webp().toFile(outputFileWebp2x);

  bar1.increment();
});

Promise.all(work).then(() => {
  bar1.stop();
  console.log('All images have been processed.');
});
