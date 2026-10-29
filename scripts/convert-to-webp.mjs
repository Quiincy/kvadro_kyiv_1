import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const DIRS_TO_CONVERT = [
  'public/assets',
  'public/assets/gallery',
  'public/media',
]

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return

  const dir = path.dirname(filePath)
  const baseName = path.basename(filePath, ext)
  const webpPath = path.join(dir, `${baseName}.webp`)

  const beforeStat = fs.statSync(filePath)
  
  const instance = sharp(filePath)
  const meta = await instance.metadata()

  // For very large photos (> 1920px), scale down proportionally to 1920px max dimension
  if (meta.width && meta.height && (meta.width > 1920 || meta.height > 1920)) {
    instance.resize({
      width: meta.width >= meta.height ? 1920 : undefined,
      height: meta.height > meta.width ? 1920 : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Optimize WebP compression
  await instance
    .webp({
      quality: 80,
      alphaQuality: 85,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(webpPath)

  const afterStat = fs.statSync(webpPath)
  const saved = (((beforeStat.size - afterStat.size) / beforeStat.size) * 100).toFixed(1)
  console.log(`✓ ${path.basename(filePath)} (${(beforeStat.size / 1024).toFixed(0)}KB) -> ${baseName}.webp (${(afterStat.size / 1024).toFixed(0)}KB) [-${saved}%]`)
}

async function convertDir(dirPath) {
  const fullPath = path.resolve(process.cwd(), dirPath)
  if (!fs.existsSync(fullPath)) return

  const entries = fs.readdirSync(fullPath, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile()) {
      await convertFile(path.join(fullPath, entry.name))
    }
  }
}

async function main() {
  console.log('=== Starting Smart WebP Conversion ===\n')
  for (const dir of DIRS_TO_CONVERT) {
    console.log(`Directory: ${dir}`)
    await convertDir(dir)
    console.log('')
  }
  console.log('=== WebP Conversion Complete ===')
}

main().catch(console.error)
