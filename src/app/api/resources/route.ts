import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import { SCRAPE_TARGETS, STATIC_RESOURCES } from "@/lib/resources/static";
import type { StateCode } from "@/lib/eligibility/types";

export const runtime = "nodejs";
export const revalidate = 60 * 60 * 6;

interface ScrapedHeadline {
  source: string;
  url: string;
  title: string;
  excerpt: string;
}

async function scrapeHeadlines(url: string): Promise<ScrapedHeadline[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "EduHelpBot/1.0 (+https://github.com/AaronGrace978/EduHelp)",
      },
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const $ = load(html);
    const host = new URL(url).host;
    const headlines: ScrapedHeadline[] = [];
    const seen = new Set<string>();

    $("h1, h2, h3, h4").each((_, el) => {
      const $el = $(el);
      const title = $el.text().replace(/\s+/g, " ").trim();
      if (title.length < 12 || title.length > 180) return;
      const href = $el.find("a").attr("href") ?? $el.parent("a").attr("href");
      const link = href ? new URL(href, url).toString() : url;
      if (seen.has(title)) return;
      seen.add(title);
      const next = $el.next("p").text().replace(/\s+/g, " ").trim();
      headlines.push({
        source: host,
        url: link,
        title,
        excerpt: next.slice(0, 220),
      });
    });

    return headlines.slice(0, 6);
  } catch (err) {
    console.warn(`[EduHelp] scrape failed for ${url}:`, err);
    return [];
  }
}

export async function GET(req: NextRequest) {
  const stateRaw = (req.nextUrl.searchParams.get("state") ?? "CO").toUpperCase();
  if (stateRaw !== "CO" && stateRaw !== "CA") {
    return NextResponse.json(
      { error: "state must be CO or CA" },
      { status: 400 },
    );
  }
  const state = stateRaw as StateCode;
  const enableScrape =
    (process.env.ENABLE_WEB_SCRAPING ?? "true").toLowerCase() !== "false";

  let live: ScrapedHeadline[] = [];
  if (enableScrape) {
    const all = await Promise.all(
      SCRAPE_TARGETS[state].map((u) => scrapeHeadlines(u)),
    );
    live = all.flat().slice(0, 10);
  }

  return NextResponse.json({
    state,
    static: STATIC_RESOURCES[state],
    live,
    scraped: enableScrape,
  });
}
