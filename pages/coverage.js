// mazeda-web/pages/coverage.js

import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CoverageBlocks from "./components/CoverageBlocks";
import Head from "next/head";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

const CoveragePage = ({ districts }) => {
  const intl = useIntl();
  const coverageTitle = intl.messages.component.coverageTitle;
  const coverageSubtitle = intl.messages.component.coverageSubtitle;
  const { asPath } = useRouter();
  const canonicalUrl = `https://www.mazeda.net${asPath.split("?")[0]}`;
  return (
    <>
      <Head>
        <title>Coverage</title>
        <meta
          name="description"
          content="Discover Mazeda Networks' internet coverage areas in Dhaka, Gazipur, and Tangail. We currently provide reliable internet services in Dhanmondi, Uttara, Banani, Bashundhara, Mohammadpur, Nobodoy Housing Society, Salimullah Road, Chawk Bazar, Panthapath, Malibagh, Mirpur, Matikata, Rupnagar, Hazaribag, Khilgaon, Kallyanpur, Kamrangirchor, Ati Bazar, Rayer Bazar, Khilkhet, Jigatola, Bosila, Green Road Area, North Balur-Chor, Kolatia, Elephant Road, and more. Stay tuned as we expand to cover Aftab Nagar, Agargaon, Anondo Police Housing Society, Armanitola, Azampur, Azimpur, Bailey Road, Banani DOHS, Banasree, Bangabazar, Bangla Bazar, Baridhara, Baridhara DOHS, Basabo, Bashundhara Residential Area, Begun Bari, Birulia, Chandni Chowk, Chowk Bazaar, Chowkbazar Thana, Dholaikhal, Diabari, East Nakhalpara, Farashganj, Farmgate, Hatirpool, House Building in Uttara, Jhilmil Residential Area, Jolshiri Abashon, Kakrail, Kallyanpur, Kamalapur, Kawran Bazar, Lalbagh Thana, Lalmatia, Maghbazar, Matuail, Mohakhali, Mohakhali DOHS, Nakhalpara, Narinda, Nazirabazar, New Eskaton, New Market, New Paltan, Niketan, Nilkhet, Panthapath, Paribagh, Pilkhana, Rajarbagh, Rayer Bazaar, Rupayan City, Savar DOHS, Segunbagicha, Shahbag, Shahjadpur, Shankhari Bazaar, Shantinagar, Solmaid, Tejturi Bazar, Tikatuli, Uttara, and West Rajabazar."
        />
      </Head>
      <main>
        <Navbar />
        <div className="banner_bg bg-[url('/images/coverage-page.webp')] ">
          <h1 className="banner_title text_shadow_black">{coverageTitle}</h1>
          <p className="banner_subtitle text_shadow_black">
            {coverageSubtitle}
          </p>
        </div>
        <div className="container_akm  min-h-screen">
          <div>
            <CoverageBlocks initialDistricts={districts} />
          </div>
          <div></div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export async function getServerSideProps({ locale, res }) {
  try {
    const r = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/coverage?locale=${locale}&populate[districts][populate][0]=district_rel_area`,
    );
    const json = await r.json();
    const districts = (json.data?.districts || [])
      .slice()
      .sort((a, b) => a.district_serial - b.district_serial)
      .map((d) => ({
        ...d,
        district_rel_area: [...(d.district_rel_area || [])].sort(
          (a, b) => a.area_serial - b.area_serial,
        ),
      }));
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=3600",
    );
    return { props: { districts } };
  } catch {
    return { props: { districts: [] } };
  }
}

export default CoveragePage;
