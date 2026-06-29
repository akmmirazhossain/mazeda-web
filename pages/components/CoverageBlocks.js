import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const log = 0 ? console.log : () => {};

const CoverageBlocks = () => {
  const { locale } = useRouter();
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All districts");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/coverage?locale=${locale}&populate[districts][populate][0]=district_rel_area`,
    )
      .then((res) => res.json())
      .then((json) => {
        log("coverage:", json.data);
        const sorted = (json.data?.districts || [])
          .slice()
          .sort((a, b) => a.district_serial - b.district_serial)
          .map((district) => ({
            ...district,
            district_rel_area: [...(district.district_rel_area || [])].sort(
              (a, b) => a.area_serial - b.area_serial,
            ),
          }));
        setDistricts(sorted);
        setFilteredDistricts(sorted);
      })
      .catch((err) => console.error("Error fetching coverage:", err));
  }, [locale]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filtered = districts
      .map((district) => ({
        ...district,
        district_rel_area: district.district_rel_area.filter((area) =>
          area.area_name.toLowerCase().includes(value),
        ),
      }))
      .filter(
        (district) =>
          district.district_name.toLowerCase().includes(value) ||
          district.district_rel_area.length > 0,
      );

    setFilteredDistricts(filtered);
  };

  const handleDistrictSelect = (district, event) => {
    event.preventDefault();
    setSearchValue("");
    setIsOpen(false);

    if (district === "All districts") {
      setSelectedDistrict("All districts");
      setFilteredDistricts(districts);
    } else {
      setSelectedDistrict(district.district_name);
      setFilteredDistricts([district]);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <section className="page_body">
      <div className="grid grid-cols-1 md:grid-cols-3 box_round_shadow mb_akm gap_akm">
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
        <div className="relative w-full">
          <div
            className="flex items-center pr-3 cursor-pointer border rounded-2xl"
            onClick={toggleDropdown}
          >
            <input
              id="district"
              type="text"
              readOnly
              value={selectedDistrict}
              className="block px-4 py-2 w-full rounded-2xl cursor-pointer focus:outline-none"
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
                onClick={(e) => handleDistrictSelect("All districts", e)}
              >
                All districts
              </a>
              {districts.map((district) => (
                <a
                  key={district.id}
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={(e) => handleDistrictSelect(district, e)}
                >
                  {district.district_name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 box_round_shadow gap_akm">
        {filteredDistricts.map((district) => (
          <div key={district.id}>
            <h2 className="subheading_akm pad_akm">{district.district_name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {district.district_rel_area.map((area) => (
                <div
                  key={area.id}
                  className="green_gradient h-20 pad_akm rounded-2xl text-white flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="pr-2 text-lg text_red"
                    />
                    <p className="text-lg">{area.area_name}</p>
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
