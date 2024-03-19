import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faLightbulb,
  faCalendarDays,
  faCirclePlay,
  faCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const PayBillSection = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    setCurrentMonthYear(`${month} ${year}`);
  }, []);

  const [isBkashModalOpen, setIsBkashModalOpen] = useState(false);
  const [isNagadModalOpen, setIsNagadModalOpen] = useState(false);

  const openBkashModal = () => {
    setIsBkashModalOpen(true);
  };

  const closeBkashModal = () => {
    setIsBkashModalOpen(false);
  };

  const openNagadModal = () => {
    setIsNagadModalOpen(true);
  };

  const closeNagadModal = () => {
    setIsNagadModalOpen(false);
  };

  return (
    <section className="section_akm">
      <div className="text-center pb-4">
        <h1 className="heading_akm">Seeking payment options?</h1>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 mb-4 md:mb-0">
          This page shows a comprehensive range of payment solutions, find your
          best suited option to make a safe online transection.
        </div>
        <div className="text-center lg:text-right">
          <button className=" items-center mt-auto text-center text-white bg-[#03738C] border-0 py-2 px-4 focus:outline-none hover:bg-red-700 rounded-full">
            <Link
              href="https://isperp.mazedanetworks.net/ispcare"
              target="_blank"
            >
              {" "}
              Pay from online portal
            </Link>
          </button>
        </div>
      </div>

      <div className="box_round_shadow mb_akm">
        <div className="mb_akm flex items-center">
          <div className="rounded-full border mr-3 h-12 w-12">
            <img
              alt=""
              src="images/logos/bkash-logo.png"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">Steps for Bkash app payment</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9 gap_akm">
          <div className="md:col-span-3 lg:col-span-7">
            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faRightToBracket} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 1
                </h2>
                <p className="leading-relaxed">
                  Sign in to your bKash account using your account PIN, then
                  select the <span className="font-bold"> Pay Bill </span>{" "}
                  option.
                </p>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 2
                </h2>
                <p className="leading-relaxed">
                  In the <span className="font-bold"> Pay Bill </span> section
                  under <span className="font-bold"> Search Organization</span>,
                  type Mazeda and look for{" "}
                  <span className="font-bold"> Mazeda Networks Ltd. </span> to
                  proceed.
                </p>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 3
                </h2>
                <p className="leading-relaxed">
                  From the <span className="font-bold">Bill Period</span>{" "}
                  dropdown choose the{" "}
                  <span className="font-bold"> current month </span> (e.g.{" "}
                  {currentMonthYear}) for which you wish to pay your bill and
                  enter your
                  <span className="font-bold"> Subscriber ID</span>, then tap on{" "}
                  <span className="font-bold"> Proceed to pay</span>.
                </p>
                <div
                  className="mt_akm bg-orange-100 border-l-4  border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p>
                    If you don&apos;t have the Subscriber ID, you may contact
                    our support{" "}
                    <span className="font-bold">
                      {" "}
                      09613 334455, 09666 334455
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex relative">
              <div className="flex-shrink-0 w-12 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                <div className="steps_circle_akm">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  FINISH
                </h2>
                <p className="leading-relaxed">
                  Upon completion, a payment successful message will confirm
                  that all steps were executed correctly.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-2  pad_akm">
            <div
              className="relative h-96 md:h-full transition duration-300 transform hover:scale-105 cursor-pointer"
              onClick={openBkashModal}
            >
              <img
                src="images/slider/bkash/b1.jpg"
                className=" w-full h-full object-contain rounded-2xl brightness-90"
                alt="Background Image"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex justify-center items-center flex-col">
                  <FontAwesomeIcon
                    className="text-6xl text-slate-900"
                    icon={faCirclePlay}
                  />
                  <p className="bg-slate-900 text-white pad_akm rounded-full text-xs mt-1">
                    Watch tutorial
                  </p>
                </div>
              </div>
            </div>

            {/* Modal */}
            {isBkashModalOpen && (
              <div
                onClick={() => closeBkashModal(true)}
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
              >
                <div className="relative bg-white w-5/6 sm:w-2/3 md:w-1/4 lg:w-1/5 rounded-2xl">
                  <div
                    className="absolute z-40 -right-2 -top-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="" onClick={() => closeBkashModal(true)}>
                      <FontAwesomeIcon
                        className="text-4xl  text-white"
                        icon={faCircleXmark}
                      />
                    </button>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Swiper
                      className="mySwiper rounded-2xl"
                      effect="c"
                      slidesPerView={1}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                      }}
                      modules={[EffectCoverflow, Pagination, Autoplay]}
                      loop={true}
                    >
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/bkash/b1.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/bkash/b2.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/bkash/b3.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/bkash/b4.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/bkash/b5.jpg" />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="box_round_shadow mb_akm">
        <div className="mb_akm flex items-center">
          <div className="rounded-full border mr-3 h-12 w-12">
            <img
              alt=""
              src="images/logos/nagad.jpg"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">Steps for Nagad app payment</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-9 gap_akm">
          <div className="md:col-span-3 lg:col-span-7">
            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faRightToBracket} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 1
                </h2>
                <p className="leading-relaxed">
                  Sign in to your Nagad account using your account PIN, then
                  select the <span className="font-bold"> Bill Pay</span>{" "}
                  option.
                </p>
              </div>
            </div>

            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 2
                </h2>
                <p className="leading-relaxed">
                  In the <span className="font-bold"> Biller </span> section,
                  type Mazeda and search{" "}
                  <span className="font-bold"> Mazeda Networks Ltd.</span> to
                  proceed.
                </p>
              </div>
            </div>

            <div className="flex relative pb-12">
              <div className="h-full w-12 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none" />
              </div>
              <div className="steps_circle_akm">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  STEP 3
                </h2>
                <p className="leading-relaxed">
                  Type your <span className="font-bold"> Customer ID</span>,
                  then tap on <span className="font-bold">NEXT</span>.
                </p>
                <div
                  className="mt_akm bg-orange-100 border-l-4  border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p>
                    If you don&apos;t have the Customer ID, you may contact our
                    support{" "}
                    <span className="font-bold">
                      09613 334455, 09666 334455
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex relative">
              <div className="flex-shrink-0 w-12 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                <div className="steps_circle_akm">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                  FINISH
                </h2>
                <p className="leading-relaxed">
                  Upon completion, a payment successful message will confirm
                  that all steps were executed correctly.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-2 pad_akm">
            <div
              className="relative h-96 md:h-full transition duration-300 transform hover:scale-105 cursor-pointer "
              onClick={openNagadModal}
            >
              <img
                src="images/slider/nagad/n1.jpg"
                className="w-full h-full object-contain rounded-2xl brightness-90"
                alt="Background Image"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex justify-center items-center flex-col">
                  <FontAwesomeIcon
                    className="text-6xl text-slate-900"
                    icon={faCirclePlay}
                  />
                  <p className="bg-slate-900 text-white pad_akm rounded-full text-xs mt-1">
                    Watch tutorial
                  </p>
                </div>
              </div>
            </div>

            {isNagadModalOpen && (
              <div
                onClick={() => closeNagadModal(true)}
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
              >
                <div className="relative bg-white w-5/6 sm:w-2/3 md:w-1/4 lg:w-1/5 rounded-2xl">
                  <div className="absolute z-40 -right-2 -top-3">
                    <button className="" onClick={() => closeNagadModal(true)}>
                      <FontAwesomeIcon
                        className="text-4xl  text-white"
                        icon={faCircleXmark}
                      />
                    </button>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Swiper
                      className="mySwiper rounded-2xl"
                      effect="c"
                      slidesPerView={1}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                      }}
                      modules={[EffectCoverflow, Pagination, Autoplay]}
                      loop={true}
                    >
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/nagad/n1.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/nagad/n2.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/nagad/n3.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/nagad/n4.jpg" />
                      </SwiperSlide>
                      <SwiperSlide className="">
                        <img alt="" src="images/slider/nagad/n5.jpg" />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 lg:grid-cols-2">
        <div className="mb_akm">
          <p className="subheading_akm">Other Payment Options</p>
          <p className="body_text_akm">
            Bill payment on Mazeda Networks is doable in all sorts of ways, but
            for these payment portals, you need to call our office and confirm
            our billing team about it.
          </p>
        </div>
        <div className="">
          <img alt="" src="/images/more-payment-options-part1.png" />
          <img alt="" src="/images/more-payment-options-part2.png" />
        </div>
      </div>
    </section>
  );
};

export default PayBillSection;
