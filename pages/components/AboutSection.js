import { useEffect, useState } from "react";
import aboutData from "../../public/data/aboutData.json"; // Import JSON data

function AboutSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Set the JSON data to state
    setData(aboutData);
  }, []);

  return (
    <section className="section_akm">
      {/* Render title and background image */}
      <div className="text-center pb-4 bg-[url('/images/servers.jpg')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96 flex items-center justify-center text-white ">
        <h1 className="heading_akm ">About Us</h1>
      </div>

      {/* Render description */}
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
              {data && data.title}
            </h1>
            {data &&
              data.description.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed mb-8">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Render mission and vision */}
          <div className="grid grid-col-1 md:grid-col-2 mt_akm">
            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Mission
              </h1>
              <p>{data && data.mission}</p>
            </div>

            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Vision
              </h1>
              <p>{data && data.vision}</p>
            </div>

            {/* Render partners */}
            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Partnered With
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-5 gap_akm">
                {data &&
                  data.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="bg-slate-400 w-full h-20 rounded-2xl"
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
