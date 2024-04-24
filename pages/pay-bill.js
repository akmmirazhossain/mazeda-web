import Navbar from "./components/Navbar";
import PayBillSection from "./components/PayBillSection";
import Footer from "./components/Footer";
import Head from "next/head";

function PayBillPage() {
  return (
    <>
      <Head>
        <title>Pay Bill</title>
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
