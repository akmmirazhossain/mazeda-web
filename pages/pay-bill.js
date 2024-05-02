import Navbar from "./components/Navbar";
import PayBillSection from "./components/PayBillSection";
import Footer from "./components/Footer";
import Head from "next/head";

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
      <main>
        <Navbar />

        <div className="text-center pb-4 bg-[url('/images/pay-bill-cover.webp')] bg-cover  bg-center h-36 sm:h-52 md:h-64 lg:h-96 flex items-center justify-center text-white ">
          <h1 className="heading_akm text_shadow_black">
            Seeking payment options?
          </h1>
        </div>
        <div className="container_akm nav_space_akm">
          <PayBillSection />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default PayBillPage;
