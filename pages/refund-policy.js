// mazeda-web/pages/refund-policy.js
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://www.mazeda.net";

const content = {
  en: {
    pageTitle: "Refund Policy",
    metaDescription:
      "Learn about Mazeda Networks' refund policy for internet service payments and installation fees.",
    updated: "Last updated: September 23, 2026",
    intro:
      "This Refund Policy explains how Mazeda Networks Ltd. handles refund requests for internet service payments, installation charges, and related fees.",
    sections: [
      {
        title: "1. Monthly Subscription Fees",
        body: "Monthly internet subscription fees are generally non-refundable once the billing cycle has started, as the fee covers bandwidth and network resources already allocated for that period.",
      },
      {
        title: "2. Installation & Setup Fees",
        body: "If installation could not be completed due to a fault on our end (for example, lack of coverage discovered after payment), any installation fee already paid will be refunded in full. If installation is cancelled by the customer after a technician visit or equipment has already been deployed, the fee may be non-refundable or partially refundable depending on work completed.",
      },
      {
        title: "3. Duplicate or Erroneous Payments",
        body: "If you accidentally make a duplicate payment or an incorrect payment via bKash, Nagad, SSLCommerz, or our billing portal, please contact our support team within 7 days with your transaction details. Verified duplicate or erroneous payments will be refunded or credited to your next bill.",
      },
      {
        title: "4. Service Disconnection",
        body: "If you cancel your subscription mid-cycle, any unused portion of a prepaid period may be refunded or credited at Mazeda Networks' discretion, in accordance with your subscription agreement.",
      },
    ],
    requestTitle: "5. How to Request a Refund",
    requestBody: "To request a refund, contact our support team at",
    requestMid:
      "or call 09666 334455 with your subscriber ID, transaction reference, and reason for the request. Approved refunds are typically processed within 7–14 business days via the original payment method or bank/MFS transfer.",
    changesTitle: "6. Changes to This Policy",
    changesBody:
      'Mazeda Networks may update this Refund Policy from time to time. The "Last updated" date above reflects the most recent revision.',
  },
  bn: {
    pageTitle: "রিফান্ড নীতি",
    metaDescription:
      "ইন্টারনেট সেবার পেমেন্ট ও ইনস্টলেশন ফি সংক্রান্ত মাজেদা নেটওয়ার্কসের রিফান্ড নীতি সম্পর্কে জানুন।",
    updated: "সর্বশেষ আপডেট: ২৩ সেপ্টেম্বর, ২০২৬",
    intro:
      "এই রিফান্ড নীতিতে ব্যাখ্যা করা হয়েছে যে মাজেদা নেটওয়ার্কস লিমিটেড ইন্টারনেট সেবার পেমেন্ট, ইনস্টলেশন চার্জ এবং সংশ্লিষ্ট ফি-এর রিফান্ড রিকোয়েস্ট কীভাবে পরিচালনা করে।",
    sections: [
      {
        title: "১. মাসিক সাবস্ক্রিপশন ফি",
        body: "বিলিং সাইকেল শুরু হয়ে গেলে মাসিক ইন্টারনেট সাবস্ক্রিপশন ফি সাধারণত ফেরতযোগ্য নয়, কারণ এই ফি ইতিমধ্যে বরাদ্দকৃত ব্যান্ডউইথ ও নেটওয়ার্ক রিসোর্স কভার করে।",
      },
      {
        title: "২. ইনস্টলেশন ও সেটআপ ফি",
        body: "আমাদের পক্ষের কোনো ত্রুটির কারণে (যেমন পেমেন্টের পরে কভারেজ না থাকার বিষয়টি জানা গেলে) ইনস্টলেশন সম্পন্ন করা সম্ভব না হলে, ইতিমধ্যে পরিশোধিত ইনস্টলেশন ফি সম্পূর্ণভাবে ফেরত দেওয়া হবে। টেকনিশিয়ান ভিজিট বা যন্ত্রপাতি স্থাপনের পর গ্রাহক নিজে ইনস্টলেশন বাতিল করলে, সম্পাদিত কাজের উপর ভিত্তি করে ফি আংশিক ফেরতযোগ্য বা অ-ফেরতযোগ্য হতে পারে।",
      },
      {
        title: "৩. ডুপ্লিকেট বা ভুল পেমেন্ট",
        body: "বিকাশ, নগদ, এসএসএলকমার্জ বা আমাদের বিলিং পোর্টালের মাধ্যমে ভুলবশত ডুপ্লিকেট বা ভুল পেমেন্ট হয়ে গেলে, ৭ দিনের মধ্যে লেনদেনের বিবরণসহ আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন। যাচাইকৃত ডুপ্লিকেট বা ভুল পেমেন্ট ফেরত দেওয়া হবে বা পরবর্তী বিলে সমন্বয় করা হবে।",
      },
      {
        title: "৪. সেবা বিচ্ছিন্নকরণ",
        body: "বিলিং সাইকেলের মাঝপথে সাবস্ক্রিপশন বাতিল করলে, আপনার সাবস্ক্রিপশন চুক্তি অনুযায়ী প্রি-পেইড সময়ের অব্যবহৃত অংশ মাজেদা নেটওয়ার্কসের বিবেচনায় ফেরত বা সমন্বয় করা হতে পারে।",
      },
    ],
    requestTitle: "৫. রিফান্ডের জন্য কীভাবে অনুরোধ করবেন",
    requestBody:
      "রিফান্ডের জন্য, আপনার সাবস্ক্রাইবার আইডি, লেনদেনের রেফারেন্স ও অনুরোধের কারণসহ আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন",
    requestMid:
      "অথবা 09666 334455 নম্বরে কল করুন। অনুমোদিত রিফান্ড সাধারণত মূল পেমেন্ট পদ্ধতি বা ব্যাংক/এমএফএস ট্রান্সফারের মাধ্যমে ৭–১৪ কার্যদিবসের মধ্যে প্রক্রিয়া করা হয়।",
    changesTitle: "৬. এই নীতিতে পরিবর্তন",
    changesBody:
      'মাজেদা নেটওয়ার্কস সময়ে সময়ে এই রিফান্ড নীতি হালনাগাদ করতে পারে। উপরে থাকা "সর্বশেষ আপডেট" তারিখটি সর্বশেষ সংশোধন নির্দেশ করে।',
  },
};

const RefundPolicyPage = () => {
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
                  {t.requestTitle}
                </h2>
                <p>
                  {t.requestBody}{" "}
                  <a
                    href="mailto:mazeda@mazeda.net"
                    className="text_green hover:underline"
                  >
                    mazeda@mazeda.net
                  </a>{" "}
                  {t.requestMid}
                </p>

                <h2 className="font-semibold text-lg mt-6 mb-2">
                  {t.changesTitle}
                </h2>
                <p>{t.changesBody}</p>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default RefundPolicyPage;
