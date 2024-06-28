import Navbar from "./components/Navbar";
import PayBillSection from "./components/PayBillSection";
import Footer from "./components/Footer";
import Head from "next/head";
import { useIntl } from "react-intl";

function PayBillPage() {
  const intl = useIntl();
  const paybillTitle = intl.messages.component.paybillTitle;

  return (
    <>
      <Head>
        <title>Pay Bill</title>
        <meta
          name="description"
          content="Experience hassle-free bill payment with Mazeda Networks ISP. Our intuitive online payment portal allows you to easily manage and settle your internet bills from the comfort of your home. Enjoy the convenience of secure transactions and multiple payment options, ensuring a seamless billing experience. Say goodbye to long queues and delays – with Mazeda Networks, paying your internet bill is quick, easy, and stress-free."
        />
      </Head>
      <main>
        <Navbar />

        <div className="banner_bg bg-[url('/images/pay-bill-cover.webp')] ">
          <h1 className="banner_title text_shadow_black">{paybillTitle}</h1>
        </div>
        <div className="container_akm ">
          <PayBillSection />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default PayBillPage;
