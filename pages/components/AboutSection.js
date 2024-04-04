// Navbar.js
import Link from "next/link";
import Image from "next/image";

function AboutSection() {
  return (
    <section className="section_akm">
      <div className="text-center pb-4 bg-[url('/images/servers.jpg')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96 flex items-center justify-center text-white ">
        <h1 className="heading_akm ">About Us</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap_akm mt_akm">
        <div
          className="col-span-2 text-center pad_akm box_round_shadow min-h-48 max-h-[600px] hidden md:block"
          style={{
            backgroundImage: `url('/images/slide-bg-internet.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content */}
        </div>
        <div className="col-span-4 pad_akm    mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <div className="box_round_shadow">
            <h1 className="subheading_akm mb_akm pb-1 border-b">
              About Mazeda Networks
            </h1>
            <p className="text-lg leading-relaxed mb-8">
              Mazeda Networks Limited, a top-tier ISP based in Dhanmondi,
              Dhaka-1209, Bangladesh, has been serving customers since 2003,
              offering high-speed internet for both residential and corporate
              needs. With branches strategically located, we provide fast,
              tailored services to over 8000+ home users across various regions,
              including Uttara, Banani, and beyond.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              Our dedicated support team ensures swift resolution of broadband
              issues within 30 minutes, and our commitment to innovation means
              we offer unrestricted internet access, eliminating bandwidth caps
              and traffic shaping. With IPv6 routing and best path routing, we
              guarantee optimal performance.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              Our customer service operates round-the-clock, offering
              personalized assistance via phone, chat, or email. At Mazeda,
              we&apos;re committed to staying ahead of the competition and
              empowering users with seamless, reliable internet experiences.
            </p>
          </div>

          <div className="grid grid-col-1 md:grid-col-2 mt_akm">
            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Mission
              </h1>
              <p>
                Our mission is to provide reliable, high-speed internet
                connectivity to individuals, businesses, and communities,
                empowering them to connect, communicate, and thrive in the
                digital age.{" "}
              </p>
            </div>

            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Vision
              </h1>
              <p>
                Our vision is to revolutionize connectivity, making high-speed
                internet accessible to every corner of Bangladesh.
              </p>
            </div>

            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Partnered With
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-5 gap_akm">
                <div className="bg-slate-400 w-full h-20 rounded-2xl"></div>
                <div className="bg-slate-400 w-full h-20 rounded-2xl"></div>
                <div className="bg-slate-400 w-full h-20 rounded-2xl"></div>
                <div className="bg-slate-400 w-full h-20 rounded-2xl"></div>
                <div className="bg-slate-400 w-full h-20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
