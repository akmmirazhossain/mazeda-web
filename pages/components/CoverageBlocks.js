import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSpinner,
  faSearch,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import coverageData from "../../public/data/coverageData.json";

const CoverageBlocks = () => {
  const [initialData, setInitialData] = useState([]);
  const [regionData, setRegionData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState({ regions: [], areas: {} });
  const [selectedRegion, setSelectedRegion] = useState("All regions");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInitialData(coverageData);
  }, []);

  useEffect(() => {
    const updatedRegionData = {};
    initialData.forEach((item) => {
      if (!updatedRegionData[item.region]) {
        updatedRegionData[item.region] = [];
      }
      if (item.areas) {
        const areas = item.areas.split(",");
        updatedRegionData[item.region].push(...areas);
      } else {
        updatedRegionData[item.region].push(item.area);
      }
    });
    setRegionData(updatedRegionData);

    if (searchValue === "") {
      setFilteredData({
        regions: Object.keys(updatedRegionData),
        areas: updatedRegionData,
      });
    }
  }, [initialData, searchValue]);

  const handleSearchChange = (e) => {
    const updatedSearchValue = e.target.value.toLowerCase();
    setSearchValue(updatedSearchValue);

    const filteredRegions = Object.keys(regionData).filter((region) =>
      region.toLowerCase().includes(updatedSearchValue)
    );

    const filteredAreas = {};
    Object.keys(regionData).forEach((region) => {
      const filteredAreasInRegion = regionData[region].filter((area) =>
        area.toLowerCase().includes(updatedSearchValue)
      );
      if (filteredAreasInRegion.length > 0) {
        filteredAreas[region] = filteredAreasInRegion;
      }
    });

    setFilteredData({ regions: filteredRegions, areas: filteredAreas });
  };

  const handleRegionSelect = (region, event) => {
    setSelectedRegion(region);
    setSearchValue("");

    if (region === "All regions") {
      setFilteredData({ regions: Object.keys(regionData), areas: regionData });
    } else {
      setFilteredData({
        regions: [region],
        areas: { [region]: regionData[region] },
      });
    }

    setIsOpen(false); // Close dropdown after selecting a region

    // Prevent default behavior (page scrolling to top) when clicking on dropdown item
    event.preventDefault();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="section_akm">
      <div className="flex items-center justify-center flex-col text-center   bg-[url('/images/coverage-page.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96  text-white ">
        <h1 className="heading_akm text_shadow_black">Our coverage</h1>
        <p className="subheading_akm text_shadow_black">
          Our network grows daily, so stay tuned for updates here.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  box_round_shadow mb_akm gap_akm  ">
        <div className="flex items-center pr-3 cursor-pointer border rounded-2xl">
          <input
            type="text"
            placeholder="Search a location"
            value={searchValue}
            onChange={handleSearchChange}
            className="block px-4 py-2 w-full rounded-2xl cursor-pointer focus:outline-none"
            onClick={() => setSearchValue("")}
          />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-2" />
        </div>
        <div className="relative w-full ">
          <div
            className="flex items-center pr-3 cursor-pointer border rounded-2xl"
            onClick={toggleDropdown}
          >
            <input
              id="region"
              type="text"
              readOnly
              value={selectedRegion}
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
                onClick={(e) => handleRegionSelect("All regions", e)}
              >
                All regions
              </a>
              {Object.keys(regionData).map((region) => (
                <a
                  key={region}
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={(e) => handleRegionSelect(region, e)}
                >
                  {region}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 box_round_shadow gap_akm">
        {Object.keys(filteredData.areas).map((region, regionIndex) => (
          <div key={regionIndex} className="">
            <h2 className="subheading_akm pad_akm">{region}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredData.areas[region].map((area, index) => (
                <div
                  key={index}
                  className="green_gradient pad_akm rounded-2xl text-white  flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="pr-2 text-lg text_red"
                    />
                    <p className="text-lg ">{area}</p>
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
