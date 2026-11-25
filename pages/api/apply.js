import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const hits = new Map(); // in-memory rate limit, resets on restart

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  if (recent.length >= 5)
    return res.status(429).json({ error: "Too many requests" });
  hits.set(ip, [...recent, now]);

  try {
    const form = formidable({ maxFileSize: 5 * 1024 * 1024, maxFiles: 1 });
    const [fields, files] = await form.parse(req);
    const f = (k) => (fields[k]?.[0] || "").trim();

    if (f("website")) return res.status(200).json({ ok: true }); // honeypot
    if (!f("full_name") || !f("email") || !f("phone"))
      return res.status(400).json({ error: "Missing fields" });

    const cv = files.cv?.[0];
    if (!cv || !ALLOWED.includes(cv.mimetype))
      return res
        .status(400)
        .json({ error: "CV must be PDF/DOC/DOCX, max 5MB" });

    const fd = new FormData();
    fd.append(
      "files",
      new Blob([fs.readFileSync(cv.filepath)], { type: cv.mimetype }),
      cv.originalFilename,
    );
    const up = await fetch(`${STRAPI}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: fd,
    });
    if (!up.ok) throw new Error(`upload ${up.status}`);
    const [uploaded] = await up.json();

    const create = await fetch(`${STRAPI}/api/job-applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          full_name: f("full_name"),
          email: f("email"),
          phone: f("phone"),
          position: f("position"),
          job_slug: f("job_slug"),
          message: f("message"),
          cv: uploaded.id,
        },
      }),
    });
    if (!create.ok) throw new Error(`create ${create.status}`);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("apply error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
