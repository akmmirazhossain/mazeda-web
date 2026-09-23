// mazeda-web/pages/privacy-policy.js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://www.mazeda.net";

const content = {
  en: {
    pageTitle: "Privacy Policy",
    metaDescription:
      "Read Mazeda Networks' Privacy Policy to understand how we collect, use, and protect your personal information.",
    updated: "Last updated: September 23, 2026",
    intro:
      'Mazeda Networks Ltd. ("Mazeda Networks", "we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us as a subscriber, website visitor, or user of our services. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
    sections: [
      {
        title: "1. Information We Collect",
        body: "We may collect information such as your name, phone number, email address, NID/billing address, and connection details when you subscribe to our internet service, contact support, or use our website (including our AI chat assistant). We also collect technical information like IP address, browser type, and usage data through cookies and similar technologies.",
      },
      {
        title: "2. How We Use Your Information",
        list: [
          "To provision, maintain, and bill for your internet connection",
          "To respond to support requests and customer inquiries",
          "To process payments made via bKash, Nagad, SSLCommerz, or our billing portal",
          "To send service updates, offers, or maintenance notices",
          "To improve our website, network, and customer support quality",
          "To comply with legal and regulatory obligations, including those under BTRC",
        ],
      },
      {
        title: "3. Sharing of Information",
        body: "We do not sell your personal information. We may share limited data with trusted third parties who help us operate our business — such as payment gateways (bKash, Nagad, SSLCommerz), hosting providers, and regulatory bodies where required by law.",
      },
      {
        title: "4. Cookies",
        body: "Our website uses cookies to remember your session (for example, our live chat assistant) and improve your browsing experience. You can disable cookies in your browser settings, though some features may not work correctly as a result.",
      },
      {
        title: "5. Data Security",
        body: "We take reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.",
      },
      {
        title: "6. Your Rights",
        body: "You may request access to, correction of, or deletion of your personal information by contacting us using the details below, subject to our legal and contractual obligations (e.g., billing records).",
      },
      {
        title: "7. Changes to This Policy",
        body: 'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision.',
      },
    ],
    contactTitle: "8. Contact Us",
    contactBody:
      "If you have questions about this Privacy Policy, contact us at",
    contactTail: "or call 09666 334455.",
  },
  bn: {
    pageTitle: "গোপনীয়তা নীতি",
    metaDescription:
      "মাজেদা নেটওয়ার্কস আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষা করে তা জানতে আমাদের গোপনীয়তা নীতি পড়ুন।",
    updated: "সর্বশেষ আপডেট: ২৩ সেপ্টেম্বর, ২০২৬",
    intro:
      'মাজেদা নেটওয়ার্কস লিমিটেড ("মাজেদা নেটওয়ার্কস", "আমরা") আপনার গোপনীয়তাকে সম্মান করে এবং একজন গ্রাহক, ওয়েবসাইট ভিজিটর বা আমাদের সেবার ব্যবহারকারী হিসেবে আপনি আমাদের সাথে যে ব্যক্তিগত তথ্য শেয়ার করেন তা সুরক্ষিত রাখতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিতে আমরা কী তথ্য সংগ্রহ করি, তা কীভাবে ব্যবহার করি এবং আপনার কী কী অধিকার রয়েছে তা ব্যাখ্যা করা হয়েছে।',
    sections: [
      {
        title: "১. আমরা যে তথ্য সংগ্রহ করি",
        body: "আপনি যখন আমাদের ইন্টারনেট সেবায় সাবস্ক্রাইব করেন, সাপোর্টে যোগাযোগ করেন, বা আমাদের ওয়েবসাইট (আমাদের এআই চ্যাট সহকারী সহ) ব্যবহার করেন, তখন আমরা আপনার নাম, ফোন নম্বর, ইমেইল ঠিকানা, এনআইডি/বিলিং ঠিকানা এবং সংযোগ সংক্রান্ত তথ্য সংগ্রহ করতে পারি। এছাড়াও কুকি ও অনুরূপ প্রযুক্তির মাধ্যমে আইপি অ্যাড্রেস, ব্রাউজার টাইপ এবং ব্যবহারের ডেটার মতো কারিগরি তথ্যও সংগ্রহ করা হয়।",
      },
      {
        title: "২. আমরা কীভাবে আপনার তথ্য ব্যবহার করি",
        list: [
          "আপনার ইন্টারনেট সংযোগ প্রদান, রক্ষণাবেক্ষণ এবং বিল করার জন্য",
          "সাপোর্ট রিকোয়েস্ট ও গ্রাহকের প্রশ্নের উত্তর দিতে",
          "বিকাশ, নগদ, এসএসএলকমার্জ বা আমাদের বিলিং পোর্টালের মাধ্যমে করা পেমেন্ট প্রসেস করতে",
          "সার্ভিস আপডেট, অফার বা রক্ষণাবেক্ষণ সংক্রান্ত নোটিশ পাঠাতে",
          "আমাদের ওয়েবসাইট, নেটওয়ার্ক ও কাস্টমার সাপোর্টের মান উন্নত করতে",
          "বিটিআরসি সহ আইনি ও নিয়ন্ত্রক বাধ্যবাধকতা মেনে চলতে",
        ],
      },
      {
        title: "৩. তথ্য শেয়ার করা",
        body: "আমরা আপনার ব্যক্তিগত তথ্য বিক্রি করি না। ব্যবসা পরিচালনায় সহায়তাকারী নির্ভরযোগ্য তৃতীয় পক্ষের সাথে সীমিত তথ্য শেয়ার করা হতে পারে — যেমন পেমেন্ট গেটওয়ে (বিকাশ, নগদ, এসএসএলকমার্জ), হোস্টিং প্রোভাইডার, এবং আইন অনুযায়ী প্রয়োজনীয় ক্ষেত্রে নিয়ন্ত্রক সংস্থা।",
      },
      {
        title: "৪. কুকি",
        body: "আমাদের ওয়েবসাইট আপনার সেশন মনে রাখতে (যেমন আমাদের লাইভ চ্যাট সহকারী) এবং ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকি ব্যবহার করে। আপনি আপনার ব্রাউজার সেটিংসে কুকি বন্ধ করতে পারেন, তবে এর ফলে কিছু ফিচার সঠিকভাবে কাজ নাও করতে পারে।",
      },
      {
        title: "৫. তথ্য সুরক্ষা",
        body: "আপনার তথ্য অননুমোদিত অ্যাক্সেস, ক্ষতি বা অপব্যবহার থেকে রক্ষা করতে আমরা যুক্তিসঙ্গত কারিগরি ও প্রাতিষ্ঠানিক ব্যবস্থা গ্রহণ করি। তবে ইন্টারনেটে তথ্য আদান-প্রদানের কোনো পদ্ধতিই ১০০% নিরাপদ নয়।",
      },
      {
        title: "৬. আপনার অধিকার",
        body: "নিচের ঠিকানায় যোগাযোগ করে আপনি আপনার ব্যক্তিগত তথ্যে প্রবেশ, সংশোধন বা মুছে ফেলার অনুরোধ জানাতে পারেন, তবে তা আমাদের আইনি ও চুক্তিগত বাধ্যবাধকতা (যেমন বিলিং রেকর্ড) সাপেক্ষে।",
      },
      {
        title: "৭. এই নীতিতে পরিবর্তন",
        body: 'আমরা সময়ে সময়ে এই গোপনীয়তা নীতি হালনাগাদ করতে পারি। পৃষ্ঠার উপরে থাকা "সর্বশেষ আপডেট" তারিখটি সর্বশেষ সংশোধন নির্দেশ করে।',
      },
    ],
    contactTitle: "৮. যোগাযোগ করুন",
    contactBody:
      "এই গোপনীয়তা নীতি সম্পর্কে প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন",
    contactTail: "অথবা কল করুন 09666 334455 নম্বরে।",
  },
};

const PrivacyPolicyPage = () => {
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
                    {section.body && <p>{section.body}</p>}
                    {section.list && (
                      <ul className="list-disc pl-6 space-y-1">
                        {section.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
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

export default PrivacyPolicyPage;
