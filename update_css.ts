import fs from 'fs';

let css = fs.readFileSync('src/index.css', 'utf-8');

// Remove text-transform: uppercase;
css = css.replace(/.*text-transform:\s*uppercase;.*\n/g, '');

// Remove letter-spacing: ...;
css = css.replace(/.*letter-spacing:.*\n/g, '');

// Replace DM Sans with Satoshi
css = css.replace(/--sans:\s*'DM Sans',\s*sans-serif;/g, "--sans: 'Satoshi', sans-serif;");

// Add Satoshi font face
const fontFace = `
@font-face {
  font-family: 'Satoshi';
  src: url('/Satoshi-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
`;

// Insert after the last @font-face or at the beginning after @import
if (css.includes('@font-face')) {
  const lastFontFaceIndex = css.lastIndexOf('}');
  // Actually, let's just insert it after the first @import
  css = css.replace(/@import "tailwindcss";/, '@import "tailwindcss";\n' + fontFace);
} else {
  css = fontFace + css;
}

fs.writeFileSync('src/index.css', css);
console.log('CSS updated successfully.');
