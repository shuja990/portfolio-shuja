/**
 * This is a script to generate icons for your PWA
 * You can run this with: npx tsx scripts/generate-icons.tsx
 *
 * Requirements:
 * - npm install sharp
 * - npm install tsx
 */

const fs = require('fs');
const path = require('path');
const sharp = require("sharp");

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
const SOURCE_SVG = path.join(process.cwd(), "public/favicon.svg")
const OUTPUT_DIR = path.join(process.cwd(), "public/icons")

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function generateIcons() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(SOURCE_SVG)

    // Generate icons for each size
    for (const size of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`)

      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath)

      console.log(`Generated: ${outputPath}`)
    }

    // Generate favicon.ico (16x16, 32x32, 48x48)
    await sharp(svgBuffer).resize(32, 32).toFile(path.join(process.cwd(), "public/favicon.ico"))

    console.log("Generated: favicon.ico")

    // Generate Apple touch icon
    await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(process.cwd(), "public/apple-touch-icon.png"))

    console.log("Generated: apple-touch-icon.png")

    console.log("All icons generated successfully!")
  } catch (error) {
    console.error("Error generating icons:", error)
  }
}

generateIcons()

