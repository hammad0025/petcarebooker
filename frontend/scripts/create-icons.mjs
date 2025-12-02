// Script to create icon PNG files for PWA manifest
// Run with: node scripts/create-icons.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// Create SVG content
const createIconSVG = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9333ea"/>
      <stop offset="100%" style="stop-color:#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-size="${size * 0.25}" fill="white" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-weight="bold">🐾</text>
</svg>`;
};

// Generate PNG icons using sharp
async function generateIcons() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    const svg = createIconSVG(size);
    const pngPath = path.join(publicDir, `icon-${size}.png`);
    
    try {
      await sharp(Buffer.from(svg))
        .resize(size, size)
        .png()
        .toFile(pngPath);
      console.log(`✓ Created icon-${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to create icon-${size}.png:`, error.message);
    }
  }
  
  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
