// mazeda-web/pages/sitemap.xml.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const SITE_URL = "https://www.mazeda.net";

const STATIC_PATHS = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "/packages", changefreq: "weekly", priority: 0.9 },
  { path: "/offers", changefreq: "daily", priority: 0.8 },
  { path: "/coverage", changefreq: "weekly", priority: 0.7 },
  { path: "/news-and-blogs", changefreq: "daily", priority: 0.7 },
  { path: "/pay-bill", changefreq: "monthly", priority: 0.6 },
  { path: "/support", changefreq: "monthly", priority: 0.6 },
  { path: "/about", changefreq: "monthly", priority: 0.5 },
  { path: "/contact", changefreq: "monthly", priority: 0.5 },
];

async function fetchEntries(endpoint, fields) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/${endpoint}?locale=en&fields=${fields.join(
        ",",
      )}&pagination[pageSize]=100`,
    );
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error(`sitemap: failed to fetch ${endpoint}`, err);
    return [];
  }
}

const urlEntry = (loc, lastmod, changefreq, priority) => `  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export async function getServerSideProps({ res }) {
  // NOTE: offers are routed by documentId (see pages/offers/[offerLink].js,
  // which fetches /api/offers/{documentId} — NOT by the offer's `slug` field).
  const [offers, articles] = await Promise.all([
    fetchEntries("offers", ["updatedAt"]),
    fetchEntries("articles", ["slug", "updatedAt"]),
  ]);

  const entries = [
    ...STATIC_PATHS.map((p) =>
      urlEntry(`${SITE_URL}${p.path}`, null, p.changefreq, p.priority),
    ),
    ...offers.map((o) =>
      urlEntry(
        `${SITE_URL}/offers/${o.documentId}`,
        o.updatedAt,
        "weekly",
        0.6,
      ),
    ),
    ...articles
      .filter((a) => a.slug)
      .map((a) =>
        urlEntry(
          `${SITE_URL}/news-and-blogs/${a.slug}`,
          a.updatedAt,
          "weekly",
          0.6,
        ),
      ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
