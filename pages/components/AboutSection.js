import { useEffect, useState } from "react";
import aboutData from "../../public/data/aboutData.json"; // Import JSON data

function AboutSection() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Set the JSON data to state
  //   setData(aboutData);
  // }, []);

  return (
    <section className="page_body">
      {/* Render description */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap_akm ">
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

        <div className="col-span-4     sm:mt-0 text-center sm:text-left">
          <div className="box_round_shadow">
            <h1 className="subheading_akm mb_akm pb-1 border-b">
              {aboutData.title}
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: aboutData.description,
              }}
            ></p>
          </div>

          {/* Render mission and vision */}
          <div className="grid grid-col-1 md:grid-col-2 mt_akm">
            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Mission
              </h1>
              <p>{aboutData.mission}</p>
            </div>

            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Our Vision
              </h1>
              <p>{aboutData.vision}</p>
            </div>

            {/* Render partners */}
            <div className="mb_akm box_round_shadow">
              <h1 className="subheading_akm mb_akm pb-1 border-b">
                Partnered With
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap_akm ">
                {aboutData.partners.map((partner, index) => (
                  <img
                    key={index}
                    src={`/images/logos/partners-logo/${partner}`} // Assuming the images are located in the /images directory
                    alt={`${partner} logo`} // Assuming the file name serves as the alt text for the logo
                    className="rounded-2xl border shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)] py-4 px-2" // Adjust styling as needed
                  />
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
