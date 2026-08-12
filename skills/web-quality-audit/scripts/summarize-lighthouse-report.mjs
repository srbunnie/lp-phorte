import fs from "node:fs"
import path from "node:path"

const reportArg = process.argv[2]

if (!reportArg) {
  console.error("Usage: node summarize-lighthouse-report.mjs <report.json>")
  process.exit(1)
}

const reportPath = path.resolve(process.cwd(), reportArg)

if (!fs.existsSync(reportPath)) {
  console.error(`Report not found: ${reportPath}`)
  process.exit(1)
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))

function scoreToPercent(value) {
  return typeof value === "number" ? Math.round(value * 100) : null
}

function pickAudit(id) {
  const audit = report.audits?.[id]
  if (!audit) return null

  return {
    id,
    title: audit.title ?? id,
    score: scoreToPercent(audit.score),
    displayValue: audit.displayValue ?? null,
  }
}

function topRequests(limit = 10) {
  const items = report.audits?.["network-requests"]?.details?.items ?? []

  return items
    .filter((item) => typeof item.transferSize === "number")
    .sort((a, b) => b.transferSize - a.transferSize)
    .slice(0, limit)
    .map((item) => ({
      url: item.url,
      resourceType: item.resourceType,
      transferKB: Math.round((item.transferSize / 1024) * 10) / 10,
    }))
}

function thirdParties(limit = 10) {
  const items = report.audits?.["third-parties-insight"]?.details?.items ?? []

  return items
    .sort((a, b) => (b.transferSize ?? 0) - (a.transferSize ?? 0))
    .slice(0, limit)
    .map((item) => ({
      entity: item.entity,
      transferKB: Math.round(((item.transferSize ?? 0) / 1024) * 10) / 10,
      mainThreadMs: Math.round((item.mainThreadTime ?? 0) * 10) / 10,
    }))
}

const categoryScores = Object.entries(report.categories ?? {}).map(([name, value]) => ({
  category: name,
  score: scoreToPercent(value.score),
}))

const focusAudits = [
  "largest-contentful-paint",
  "first-contentful-paint",
  "interactive",
  "total-blocking-time",
  "cumulative-layout-shift",
  "unused-javascript",
  "unused-css-rules",
  "render-blocking-resources",
  "font-display",
  "uses-rel-preconnect",
]
  .map(pickAudit)
  .filter(Boolean)

const summary = {
  requestedUrl: report.requestedUrl,
  fetchTime: report.fetchTime,
  lighthouseVersion: report.lighthouseVersion,
  runWarnings: report.runWarnings ?? [],
  categoryScores,
  focusAudits,
  topRequests: topRequests(),
  thirdParties: thirdParties(),
}

console.log(JSON.stringify(summary, null, 2))
