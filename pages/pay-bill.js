import Navbar from "./components/Navbar";
import PayBillSection2 from "./components/PayBillSection2";
import Footer from "./components/Footer";

function PayBillPage() {
  return (
    <>
      <main>
        <Navbar />
        <div className="container_akm nav_space_akm">
          <PayBillSection2 />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default PayBillPage;
