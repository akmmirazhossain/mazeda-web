// Import Swiper React components
import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Link from "next/link";

const HeroSection = () => {
  return (
    <Swiper
      className="mySwiper nav_space_akm "
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      loop={true}
    >
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-600 "
          style={{
            backgroundImage: 'url("/images/slider/slide-bg-dhaka.webp")',
          }}
        >
          <div className=" mx-auto sm:px-5 md:px-6 lg:px-4  max-w-7xl text-white h-full">
            <div className="grid grid-rows-8 h-full">
              <div className="row-span-3 flex flex-col justify-end items-center text-[#03738C]  -skew-x-12">
                <div className="text-center font-semibold bg-white bg-opacity-70  py-1 px-3 lg:p-3  text-xl sm:text-3xl lg:text-5xl">
                  <p className="skew-x-12">Welcome to Mazeda Networks!</p>
                </div>
                <div className="text-center justify-center font-semibold bg-white bg-opacity-70  py-1 px-3 lg:p-3   text-md sm:text-2xl lg:text-3xl">
                  <p className="skew-x-12">
                    Your Gateway to Seamless Connectivity.
                  </p>

                  <Link
                    href="/about"
                    className="rounded-full green_gradient skew-x-12 my-4  text-white px-4 py-2 block lg:hidden w-fit mx-auto"
                  >
                    Know more
                  </Link>
                </div>
              </div>

              <div className="flex row-span-5 justify-center md:justify-between ">
                <div className="hidden md:flex xl:pl-8 justify-center items-center h-full">
                  <img
                    alt=""
                    src="/images/slider/girl_on_phone.webp"
                    className="transform -scale-x-100 pt-4 max-h-full max-w-full"
                  />
                </div>

                <div className=" h-fit  text-center text-[#03738C] hidden lg:inline-block -skew-x-12 bg-white lg:w-2/4 bg-opacity-70 p-2 lg:p-4 text-xl sm:text-lg">
                  <p className="skew-x-12">
                    We are one of the premier internet service providers in
                    Bangladesh, boasting an expert team with over 23 years of
                    experience. Our commitment to excellence ensures that we
                    consistently meet and exceed customer expectations with
                    agility and efficiency.
                  </p>
                  <Link
                    href="/about"
                    className="rounded-full skew-x-12 my-4 green_gradient text-white px-4 py-2 hidden lg:inline-block"
                  >
                    Know more
                  </Link>
                </div>

                <div className=" flex xl:pl-8 justify-center items-center ">
                  <img
                    alt=""
                    src="/images/slider/man_on_phone.webp"
                    className="pt-4 max-h-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="bg-secondary ">
        <div className="bg-cover bg-center relative bg-[url('/images/slider/ip-v6-narrow.jpg')] md:bg-[url('/images/slider/ip-v6-wide.jpg')]">
          <div className="container mx-auto sm:px-5 md:px-6 lg:px-4 max-w-7xl  h-full h-600 lg:h-600">
            <div className="grid grid-cols-1 md:grid-cols-9 h-full">
              <div className="md:col-span-4 flex justify-center items-start md:items-center">
                <div className="mt-20 md:mt-0 px-6 md:px-0">
                  <div className="font-semibold text-2xl sm:text-3xl lg:text-6xl">
                    IPv6 Ready
                  </div>
                  <div className="lg:p-3 text-md text-xl sm:text-2xl lg:text-3xl">
                    Connect & control your smart devices anywhere from the
                    world.
                  </div>
                  <div className="flex justify-center">
                    <div className="w-44">
                      <img
                        src="/images/slider/ipv6-ready-logo.png"
                        alt="IPv6 Ready Logo"
                        className="w-36"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5"></div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-cover bg-center  h-600"
          style={{
            backgroundImage: 'url("/images/slider/slider-3-bg.webp")',
          }}
        >
          <div className=" mx-auto sm:px-5 md:px-6 lg:px-4  max-w-7xl text-white h-full  ">
            <div className="grid grid-cols-1  lg:grid-cols-3 grid-rows-5 lg:grid-rows-1 h-full">
              <div className="col-span-1 lg:col-span-2 row-span-2 flex flex-col justify-center items-center text-[#03738C] ">
                <div className="text-center  ">
                  <div>
                    <p className="font-semibold text-xl sm:text-3xl lg:text-5xl">
                      What makes Mazeda stand out?{" "}
                    </p>
                  </div>
                  <div className="body_text_akm md:text-2xl">
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      99.99% Uptime
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      4k YouTube, Facebook Anytime
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      Multiple Local CDN Servers
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      10 Gbps BDIX
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      IPv6 Network
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      Available Real IPs
                    </button>
                    <button className="green_gradient hover:bg-red-500 text-white font-semibold py-1.5 px-4 rounded-full m-1">
                      Quick Doorstep Support
                    </button>
                  </div>
                </div>
              </div>

              <div className="row-span-3  flex xl:pl-8 justify-center items-center  h-full">
                <img
                  alt=""
                  src="/images/slider/girl-holding-cable.webp"
                  className="pt-4 max-h-full max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-cover bg-center  "
          style={{ backgroundImage: 'url("/images/slider/slider-bg.webp")' }}
        >
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-4  max-w-7xl text-white h-full h-600 lg:h-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              <div className="grid grid-rows-4 sm:grid-rows-6 p-4 items-center justify-center">
                <div className="flex items-end h-full text-slate-700 text-2xl sm:text-4xl text-left align-bottom row-span-2 sm:row-span-2 p-4 sm:p-0  shfont">
                  <p>
                    ঘরে বসেই ইন্টারনেট বিল পরিশোধ করুন, <br />
                    কোন অতিরিক্ত খরচ ছারাই।
                  </p>
                </div>

                <div className="grid justify-items-center sm:justify-items-start row-span-2 sm:row-span-4">
                  <div className="grid grid-rows-3 grid-flow-col gap-2 w-3/4 ">
                    <div className="">
                      <Image
                        src="/images/payment-gateways/bkash.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/master-c.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/amex.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/nagad.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/dbbl.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/takapay.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/visa.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/tap.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/union.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/upay.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <Image
                        src="/images/payment-gateways/diners.svg"
                        width={100}
                        height={100}
                        alt="Slider"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-9 items-start sm:items-end justify-center ">
                <div className="row-span-1"></div>
                <div className="row-span-8">
                  <img alt="" src="/images/slider/pay-bill.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
