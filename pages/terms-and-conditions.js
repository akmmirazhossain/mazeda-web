// mazeda-web/pages/terms-and-conditions.js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://www.mazeda.net";

const content = {
  en: {
    pageTitle: "Terms & Conditions",
    metaDescription:
      "Read the Terms & Conditions for using Mazeda Networks' internet services and website.",
    updated: "Last updated: September 23, 2026",
    intro:
      'These Terms & Conditions ("Terms") govern your use of Mazeda Networks Ltd.\'s ("Mazeda Networks", "we", "us") internet services and website. By subscribing to our service or using our website, you agree to these Terms.',
    sections: [
      {
        title: "1. Service Subscription",
        body: "Subscribing to a Mazeda Networks internet package requires accurate personal and address information. Service availability is subject to coverage in your area, which may change without prior notice.",
      },
      {
        title: "2. Billing & Payments",
        body: "Subscribers are responsible for paying their monthly bill by the due date via bKash, Nagad, SSLCommerz, or our customer portal. Non-payment may result in temporary suspension or termination of service in accordance with our billing policy.",
      },
      {
        title: "3. Acceptable Use",
        body: "You agree not to use our network for unlawful activities, including but not limited to hacking, distribution of malware, copyright infringement, or any activity that disrupts network service for other users. We reserve the right to suspend accounts found in violation of applicable law or these Terms.",
      },
      {
        title: "4. Service Availability",
        body: "While we strive for consistent uptime, Mazeda Networks does not guarantee uninterrupted service. Scheduled maintenance, weather, third-party infrastructure issues, or force majeure events may cause temporary outages.",
      },
      {
        title: "5. Equipment",
        body: "Any equipment provided by Mazeda Networks (routers, ONTs, etc.) remains our property unless otherwise stated and must be returned in working condition upon termination of service, subject to our equipment policy.",
      },
      {
        title: "6. Termination",
        body: "Either party may terminate the service agreement by providing notice as outlined in your subscription agreement. Mazeda Networks reserves the right to suspend or terminate service for violations of these Terms or non-payment.",
      },
      {
        title: "7. Limitation of Liability",
        body: "Mazeda Networks is not liable for indirect, incidental, or consequential damages arising from service interruptions or use of our network, to the extent permitted by applicable law.",
      },
      {
        title: "8. Changes to These Terms",
        body: "We may revise these Terms from time to time. Continued use of our service after changes take effect constitutes acceptance of the revised Terms.",
      },
    ],
    contactTitle: "9. Contact Us",
    contactBody: "Questions about these Terms can be directed to",
    contactTail: "or 09666 334455.",
  },
  bn: {
    pageTitle: "শর্তাবলী",
    metaDescription:
      "মাজেদা নেটওয়ার্কসের ইন্টারনেট সেবা ও ওয়েবসাইট ব্যবহারের শর্তাবলী পড়ুন।",
    updated: "সর্বশেষ আপডেট: ২৩ সেপ্টেম্বর, ২০২৬",
    intro:
      'এই শর্তাবলী মাজেদা নেটওয়ার্কস লিমিটেডের ("মাজেদা নেটওয়ার্কস", "আমরা") ইন্টারনেট সেবা ও ওয়েবসাইট ব্যবহারের নিয়ম নির্ধারণ করে। আমাদের সেবায় সাবস্ক্রাইব করে বা ওয়েবসাইট ব্যবহার করে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন।',
    sections: [
      {
        title: "১. সেবা সাবস্ক্রিপশন",
        body: "মাজেদা নেটওয়ার্কসের ইন্টারনেট প্যাকেজে সাবস্ক্রাইব করতে সঠিক ব্যক্তিগত তথ্য ও ঠিকানা প্রয়োজন। সেবার সহজলভ্যতা আপনার এলাকায় কভারেজের উপর নির্ভরশীল, যা পূর্ব নোটিশ ছাড়াই পরিবর্তিত হতে পারে।",
      },
      {
        title: "২. বিলিং ও পেমেন্ট",
        body: "গ্রাহকদের নির্ধারিত সময়ের মধ্যে বিকাশ, নগদ, এসএসএলকমার্জ বা আমাদের কাস্টমার পোর্টালের মাধ্যমে মাসিক বিল পরিশোধ করতে হবে। বিল পরিশোধ না করলে আমাদের বিলিং নীতি অনুযায়ী সাময়িকভাবে সংযোগ বন্ধ বা সেবা বাতিল হতে পারে।",
      },
      {
        title: "৩. গ্রহণযোগ্য ব্যবহার",
        body: "আপনি আমাদের নেটওয়ার্ক হ্যাকিং, ম্যালওয়্যার বিতরণ, কপিরাইট লঙ্ঘন, বা অন্য ব্যবহারকারীদের সেবা বিঘ্নিত করে এমন কোনো অবৈধ কার্যকলাপে ব্যবহার না করতে সম্মত হচ্ছেন। প্রযোজ্য আইন বা এই শর্তাবলী লঙ্ঘন করলে অ্যাকাউন্ট স্থগিত করার অধিকার আমরা সংরক্ষণ করি।",
      },
      {
        title: "৪. সেবার সহজলভ্যতা",
        body: "আমরা নিরবচ্ছিন্ন সংযোগ নিশ্চিত করার চেষ্টা করলেও, মাজেদা নেটওয়ার্কস অবিচ্ছিন্ন সেবার নিশ্চয়তা দেয় না। নির্ধারিত রক্ষণাবেক্ষণ, আবহাওয়া, তৃতীয় পক্ষের অবকাঠামো সমস্যা বা প্রাকৃতিক দুর্যোগের কারণে সাময়িক বিভ্রাট হতে পারে।",
      },
      {
        title: "৫. যন্ত্রপাতি",
        body: "মাজেদা নেটওয়ার্কস প্রদত্ত যেকোনো যন্ত্রপাতি (রাউটার, ওএনটি ইত্যাদি) অন্যথায় উল্লেখ না থাকলে আমাদের সম্পত্তি থেকে যায় এবং সেবা বাতিলের সময় আমাদের যন্ত্রপাতি নীতি অনুযায়ী কার্যকর অবস্থায় ফেরত দিতে হবে।",
      },
      {
        title: "৬. সেবা বাতিল",
        body: "আপনার সাবস্ক্রিপশন চুক্তিতে বর্ণিত পদ্ধতিতে নোটিশ প্রদান করে যেকোনো পক্ষ সেবা চুক্তি বাতিল করতে পারে। এই শর্তাবলী লঙ্ঘন বা বিল পরিশোধ না করার ক্ষেত্রে মাজেদা নেটওয়ার্কস সেবা স্থগিত বা বাতিল করার অধিকার সংরক্ষণ করে।",
      },
      {
        title: "৭. দায়ের সীমাবদ্ধতা",
        body: "প্রযোজ্য আইনের সীমার মধ্যে, সেবা বিঘ্ন বা আমাদের নেটওয়ার্ক ব্যবহারের ফলে সৃষ্ট পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য মাজেদা নেটওয়ার্কস দায়ী থাকবে না।",
      },
      {
        title: "৮. শর্তাবলীতে পরিবর্তন",
        body: "আমরা সময়ে সময়ে এই শর্তাবলী সংশোধন করতে পারি। পরিবর্তন কার্যকর হওয়ার পর আমাদের সেবা ব্যবহার অব্যাহত রাখা মানে সংশোধিত শর্তাবলী মেনে নেওয়া।",
      },
    ],
    contactTitle: "৯. যোগাযোগ করুন",
    contactBody: "এই শর্তাবলী সম্পর্কে প্রশ্ন থাকলে যোগাযোগ করুন",
    contactTail: "অথবা 09666 334455 নম্বরে।",
  },
};

const TermsPage = () => {
  const { asPath, locale } = useRouter();
  const canonicalUrl = `${SITE_URL}${asPath.split("?")[0]}`;
  const t = content[locale] || content.en;

  return (
    <>
      <Head>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main>
        <Navbar />

        <div className="container_akm nav_space_akm min-h-[60vh]">
          <section className="page_body">
            <div className="box_round_shadow mt-4 pt-4 sm:mt-0">
              <h1 className="subheading_akm border-b mb-3">{t.pageTitle}</h1>
              <p className="text-sm text_gray mb-6">{t.updated}</p>

              <div className="body_text_akm space-y-4 text-justify">
                <p>{t.intro}</p>

                {t.sections.map((section, idx) => (
                  <React.Fragment key={idx}>
                    <h2 className="font-semibold text-lg mt-6 mb-2">
                      {section.title}
                    </h2>
                    <p>{section.body}</p>
                  </React.Fragment>
                ))}

                <h2 className="font-semibold text-lg mt-6 mb-2">
                  {t.contactTitle}
                </h2>
                <p>
                  {t.contactBody}{" "}
                  <a
                    href="mailto:mazeda@mazeda.net"
                    className="text_green hover:underline"
                  >
                    mazeda@mazeda.net
                  </a>{" "}
                  {t.contactTail}
                </p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default TermsPage;
