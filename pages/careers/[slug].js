import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chip } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RichText from "../components/RichText";
import ApplyForm from "../components/ApplyForm";

const formatDate = (d, locale) =>
  new Date(d + "T00:00:00").toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

const fetchJob = async (slug, loc, today) => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs?locale=${loc}` +
      `&filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&filters[is_open][$eq]=true` +
      `&filters[$or][0][deadline][$null]=true` +
      `&filters[$or][1][deadline][$gte]=${today}`,
  );
  if (!r.ok) throw new Error(`Strapi responded ${r.status}`);
  return (await r.json()).data?.[0] || null;
};

export async function getServerSideProps({ params, locale, res }) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const job =
      (await fetchJob(params.slug, locale, today)) ||
      (locale !== "en" ? await fetchJob(params.slug, "en", today) : null); // English fallback
    if (!job) return { notFound: true };

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );
    return { props: { job } };
  } catch (err) {
    console.error("Error fetching job:", err);
    return { notFound: true };
  }
}

export default function JobPage({ job }) {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>{`${job.title} | Careers`}</title>
        <meta
          name="description"
          content={`Apply for ${job.title} at Mazeda Networks.`}
        />
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm min-h-[60vh]">
          <section className="page_body">
            <div className="box_round_shadow">
              <h1 className="subheading_akm border-b mb-3">{job.title}</h1>
              <div className="flex flex-wrap gap-2">
                {[job.department, job.location, job.job_type]
                  .filter(Boolean)
                  .map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      className="text-white capitalize green_gradient"
                    >
                      {tag}
                    </Chip>
                  ))}
              </div>
              {job.deadline && (
                <p className="text-xs mt-2 text_gray">
                  Apply by {formatDate(job.deadline, locale)}
                </p>
              )}
              <div className="pt_akm">
                <RichText content={job.description} />
              </div>
            </div>

            <div className="box_round_shadow max-w-xl mx-auto mt_akm">
              <h2 className="subheading_akm border-b mb-3">
                Apply for this role
              </h2>
              <ApplyForm jobTitle={job.title} jobSlug={job.slug} />
            </div>

            <div className="mt_akm text-center">
              <Link href="/careers" className="text_green hover:underline">
                ← All openings
              </Link>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
