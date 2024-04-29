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
        <div className="container_akm nav_space_akm">
          <PayBillSection />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default PayBillPage;
