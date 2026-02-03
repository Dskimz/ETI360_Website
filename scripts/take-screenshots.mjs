import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'

import {chromium} from 'playwright'

const siteUrl = (process.env.SITE_URL || 'https://eti-360-website-web.vercel.app').replace(/\/+$/, '')

const routes = [
  '/',
  '/approach',
  '/what-we-do',
  '/triprisk360',
  '/insights',
  '/insights/preparation-and-review',
  '/about',
  '/contact',
]

const viewports = [
  {name: 'desktop', width: 1440, height: 900},
  {name: 'mobile', width: 390, height: 844},
]

function slugifyRoute(route) {
  if (route === '/') return 'home'
  return route.replace(/^\//, '').replaceAll('/', '__')
}

async function main() {
  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const outDir = path.join(process.cwd(), 'screenshots', ts)
  await mkdir(outDir, {recursive: true})

  const browser = await chromium.launch()

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({viewport: {width: viewport.width, height: viewport.height}})
      const page = await context.newPage()

      for (const route of routes) {
        const url = `${siteUrl}${route}`
        const name = `${viewport.name}-${slugifyRoute(route)}.png`
        const outPath = path.join(outDir, name)

        // Navigate + wait for layout to settle
        await page.goto(url, {waitUntil: 'networkidle'})
        await page.waitForTimeout(500)

        await page.screenshot({path: outPath, fullPage: true})
        // eslint-disable-next-line no-console
        console.log(`Saved ${outPath}`)
      }

      await context.close()
    }

    const manifest = {
      siteUrl,
      createdAt: new Date().toISOString(),
      routes,
      viewports,
    }
    await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
