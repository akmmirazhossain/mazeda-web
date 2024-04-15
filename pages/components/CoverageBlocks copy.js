import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSpinner,
  faSearch,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const initialData = [
  {
    region: "Dhaka",
    area: "Dhanmondi",
  },

  {
    region: "Dhaka",
    area: "Uttara ",
  },
  {
    region: "Dhaka",
    area: "Banani ",
  },
  {
    region: "Dhaka",
    area: "Bashundhara",
  },
  {
    region: "Dhaka",
    area: "Sher-e-Bangla Nagor",
  },
  {
    region: "Dhaka",
    area: "Mohammadpur ",
  },
  {
    region: "Dhaka",
    area: "Kallyanpur",
  },
  {
    region: "Dhaka",
    area: "Kamrangirchor",
  },
  {
    region: "Dhaka",
    area: "Ati Bazar",
  },
  {
    region: "Dhaka",
    area: "Rayer Bazar",
  },
  {
    region: "Dhaka",
    area: "Khilkhet",
  },
  {
    region: "Dhaka",
    area: "Jigatola",
  },
  {
    region: "Dhaka",
    area: "Bosila",
  },
  {
    region: "Dhaka",
    area: "Green Road Area",
  },
  {
    region: "Dhaka",
    area: "North Balur-Chor",
  },
  {
    region: "Dhaka",
    area: "Kolatia",
  },
  {
    region: "Dhaka",
    area: "Chakbazar",
  },
  {
    region: "Dhaka",
    area: "Elephant Road",
  },
  {
    region: "Tangail",
    area: "Tangail Main City",
  },
];

const CoverageBlocks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select a region");
  const [filteredData, setFilteredData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setLoading(true); // Show loading spinner

    setTimeout(() => {
      let filtered;
      if (option === "All over Bangladesh") {
        // Show all data if "All over Bangladesh" is selected
        filtered = initialData;
      } else {
        // Filter data based on the selected region
        filtered = initialData.filter((item) => item.region === option);
      }
      setFilteredData(filtered);
      setLoading(false); // Hide loading spinner
    }, 500); // Wait for 0.5 seconds before updating data
  };

  const handleSearchChange = (e) => {
    const updatedSearchValue = e.target.value.toLowerCase();
    setSearchValue(updatedSearchValue);

    // Filter data based on updated search value
    const filtered = initialData.filter((item) =>
      item.area.toLowerCase().includes(updatedSearchValue)
    );
    setFilteredData(filtered);
  };

  const groupedData = {};
  filteredData.forEach((item) => {
    if (!groupedData[item.region]) {
      groupedData[item.region] = [];
    }
    groupedData[item.region].push(item);
  });

  return (
    <section className="section_akm">
      <div className="text-center pb_akm">
        <h1 className="heading_akm">Our coverage</h1>
        <p className="subheading_akm">
          Our network grows daily, so stay tuned for updates here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3  box_round_shadow mb_akm gap_akm sticky ">
        <div className="w-full flex items-center pr-3 cursor-pointer border rounded-2xl">
          <input
            type="text"
            placeholder="Search a location"
            value={searchValue}
            onChange={handleSearchChange}
            className="block px-4 py-2 w-full rounded-2xl cursor-pointer focus:outline-none"
            onClick={() => setSearchValue("")} // Clear placeholder text on click
          />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2" />
        </div>
        <div className="relative w-full">
          <div
            className="flex items-center  pr-3 cursor-pointer border rounded-2xl"
            onClick={toggleDropdown}
          >
            <input
              id="region"
              type="text"
              readOnly
              value={selectedOption}
              className="block px-4 py-2 w-full rounded-2xl cursor-pointer focus:outline-none "
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-400 ml-2 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {isOpen && (
            <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleOptionSelect("All over Bangladesh")}
              >
                All over Bangladesh
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleOptionSelect("Dhaka")}
              >
                Dhaka
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => handleOptionSelect("Tangail")}
              >
                Tangail
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1  gap-4">
        {Object.keys(groupedData).map((region, regionIndex) => (
          <div key={regionIndex} className="">
            <h2 className="subheading_akm pad_akm">{region}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {groupedData[region].map((item, index) => (
                <div
                  key={index}
                  className="box_round_shadow_small flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="pr-2 text-lg text-red-500"
                    />
                    <p className="text-md">{item.area}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoverageBlocks;
