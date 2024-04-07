import Navbar from "./components/Navbar";
import PayBillSection from "./components/PayBillSection";
import Footer from "./components/Footer";

function PayBillPage() {
  return (
    <>
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
