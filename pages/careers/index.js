import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chip } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formatDate = (d, locale) =>
  new Date(d + "T00:00:00").toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

const fetchJobs = async (loc, today) => {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs?locale=${loc}` +
      `&filters[is_open][$eq]=true` +
      `&filters[$or][0][deadline][$null]=true` +
      `&filters[$or][1][deadline][$gte]=${today}` +
      `&sort=createdAt:desc`,
  );
  return (await r.json()).data || [];
};

export async function getServerSideProps({ locale, res }) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const en = await fetchJobs("en", today);
    const local = locale === "en" ? [] : await fetchJobs(locale, today);

    // translated version wins; English fills the gaps
    const byDoc = new Map(en.map((j) => [j.documentId, j]));
    local.forEach((j) => byDoc.set(j.documentId, j));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );
    return { props: { jobs: [...byDoc.values()] } };
  } catch {
    return { props: { jobs: [] } };
  }
}

export default function Careers({ jobs }) {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Careers</title>
        <meta
          name="description"
          content="Join Mazeda Networks. Browse open positions and apply online."
        />
      </Head>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm min-h-[60vh]">
          <section className="page_body">
            <h1 className="heading_akm">Careers</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap_akm">
              {jobs.map((job) => (
                <Link href={`/careers/${job.slug}`} key={job.id}>
                  <div className="box_round_shadow h-full hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                    <p className="subheading_akm">{job.title}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
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
                    <p className="mt-3 font-semibold text_green">
                      View & Apply →
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {jobs.length === 0 && (
              <p className="text-center text_gray">
                No open positions right now. Please check back soon.
              </p>
            )}
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
