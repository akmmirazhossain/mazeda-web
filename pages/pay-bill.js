import Navbar from "./components/Navbar";
import PayBillSection from "./components/PayBillSection";
import Footer from "./components/Footer";
import Head from "next/head";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function PayBillPage() {
  return (
    <>
      <Head>
        <title>Pay Bill</title>
        <meta
          name="description"
          content="Experience hassle-free bill payment with Mazeda Networks ISP. Our intuitive online payment portal allows you to easily manage and settle your internet bills from the comfort of your home. Enjoy the convenience of secure transactions and multiple payment options, ensuring a seamless billing experience. Say goodbye to long queues and delays – with Mazeda Networks, paying your internet bill is quick, easy, and stress-free."
        />
      </Head>
      <main className="h-screen">
        <ScrollBar>
          <Navbar />

          <div className="banner_bg bg-[url('/images/pay-bill-cover.webp')] ">
            <h1 className="banner_title text_shadow_black">
              Seeking payment options?
            </h1>
          </div>
          <div className="container_akm ">
            <PayBillSection />
          </div>
          <Footer />
        </ScrollBar>
      </main>
    </>
  );
}

export default PayBillPage;
