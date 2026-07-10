// Import Swiper React components
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import Link from "next/link";

const HeroSectionDesktop = () => {
  const videoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <Swiper
      className="mySwiper nav_space_akm  h-[600px] w-full "
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      loop={true}
      speed={1200}
      onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
    >
      <SwiperSlide>
        <div className="relative flex flex-row items-center justify-center h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden ">
            <video
              className="object-cover w-full h-full opacity-20"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/phone_gaming_racing.webm" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-white/70" />
          </div>
          <div className="relative flex flex-col justify-center w-1/2 h-full px-12">
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white/100 via-white/40 to-transparent z-[2]" />

            <div className="relative z-20 w-full pl-0 md:pl-20">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-3 text-4xl font-bold md:text-7xl md:mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">LOW LATENCY</span>
                  <span className="block text_red">GAMING</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl text_green md:mb-6"
                >
                  Online Gaming at Lightning Speed
                </h2>
              </motion.div>

              <motion.p
                key={`desc-${activeSlide}`}
                style={{ fontFamily: "PoppinsRegular" }}
                className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg md:mb-6"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience ultra-low latency gaming with our fiber-optic
                network.
              </motion.p>

              <motion.div
                key={`button-${activeSlide}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <Link href={"/packages"}>
                  <motion.button
                    className="relative px-5 py-2.5 md:px-8 md:py-4 text-white font-bold text-sm md:text-lg rounded-full overflow-hidden group"
                    style={{
                      background: "linear-gradient(to right, #03738c, #0296b8)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">View Packages</span>
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #e6242d, #fc323c)",
                      }}
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="relative w-1/2 h-full">
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white/100 via-white/40 to-transparent z-[2]" />

            <video
              className="object-cover h-full "
              src="/videos/phone_gaming_racing.webm"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </SwiperSlide>

      {/*FEATURES*/}
      <SwiperSlide className="flex items-center justify-center h-full ">
        <div className="flex items-center justify-center h-full mx-auto ">
          <div className="flex flex-col w-1/2 h-full ">
            <div className="relative flex w-full h-1/2 ">
              <div className="absolute inset-0 overflow-hidden ">
                <video
                  className="object-cover w-full h-full opacity-20"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/4k_streaming.webm" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-white/70" />
              </div>
              <div className="relative z-20 flex flex-col items-center justify-center w-full gap-2">
                <motion.div
                  key={`title-${activeSlide}`}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    key={`h1-${activeSlide}`}
                    style={{ fontFamily: "Montserrat" }}
                    className="font-bold"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="flex flex-row items-center gap-2 text-2xl md:text-4xl">
                      <span className="block text_green">STREAM</span>
                      <span className="block text_red"> 4K</span>
                    </div>
                  </motion.h1>
                </motion.div>

                <motion.div
                  key={`subtitle-${activeSlide}`}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    style={{ fontFamily: "PoppinsMedium" }}
                    className="text-lg font-bold sm:text-xl md:text-2xl text_gray"
                  >
                    Zero Buffer, Pure Speed
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="flex w-full h-1/2 ">
              <video
                className="object-cover w-full h-full "
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/4k_streaming.webm" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full ">
            <div className="flex flex-row w-full h-1/2 ">
              <div className="flex flex-col w-1/2 ">
                {" "}
                <video
                  className="object-cover w-full h-full "
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/communicate.webm" type="video/mp4" />
                </video>
              </div>
              <div className="relative flex flex-col items-center justify-center w-1/2 ">
                <div className="absolute inset-0 overflow-hidden ">
                  <video
                    className="object-cover w-full h-full opacity-20"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/communicate.webm" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-white/70" />
                </div>
                <div className="z-10 flex flex-col items-center justify-center gap-2">
                  {" "}
                  <motion.div
                    key={`title-${activeSlide}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.h1
                      key={`h1-${activeSlide}`}
                      style={{ fontFamily: "Montserrat" }}
                      className="font-bold"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex flex-col items-center gap-2 text-2xl md:text-4xl">
                        <span className="block text_green">CRYSTAL </span>
                        <span className="block text_red"> CLEAR</span>
                      </div>
                    </motion.h1>
                  </motion.div>
                  <motion.div
                    key={`subtitle-${activeSlide}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div
                      style={{ fontFamily: "PoppinsMedium" }}
                      className="text-lg font-bold sm:text-xl md:text-2xl text_gray"
                    >
                      Conversations
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full h-1/2 ">
              <div className="relative flex flex-col items-center justify-center w-1/2">
                <div className="absolute inset-0 overflow-hidden ">
                  <video
                    className="object-cover w-full h-full opacity-20"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/go_live.webm" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-white/70" />
                </div>
                <div className="z-10 flex flex-col items-center justify-center">
                  <motion.div
                    key={`title-${activeSlide}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.h1
                      key={`h1-${activeSlide}`}
                      style={{ fontFamily: "Montserrat" }}
                      className="font-bold"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex flex-row items-center gap-2 text-2xl md:text-4xl">
                        <span className="block text_green">GO</span>
                        <span className="block text_red">LIVE</span>
                      </div>
                    </motion.h1>
                  </motion.div>

                  <motion.div
                    key={`subtitle-${activeSlide}`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div
                      style={{ fontFamily: "PoppinsMedium" }}
                      className="text-lg font-bold sm:text-xl md:text-2xl text_gray"
                    >
                      Stay Connected,
                      <br /> Always
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 0">
                {" "}
                <video
                  className="object-cover w-full h-full "
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/go_live.webm" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative flex flex-row items-center justify-center h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/pay_bill.webp"
              alt="pay bill"
              className="object-cover w-full h-full opacity-20"
            />
            <div className="absolute inset-0 bg-white/70" />
          </div>
          <div className="relative flex flex-col justify-center w-1/2 h-full px-12">
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white/100 via-white/40 to-transparent z-[2]" />

            <div className="relative z-20 w-full pl-0 md:pl-20">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-3 text-4xl font-bold md:text-7xl md:mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">PAY BILL</span>
                  <span className="block text_red">FROM HOME</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl text_green md:mb-6"
                >
                  Pay from home via MFS or SSLCommerz
                </h2>
              </motion.div>

              <motion.div
                key={`button-${activeSlide}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <Link href="/pay-bill" passHref>
                  <motion.button
                    className="relative px-5 py-2.5 md:px-8 md:py-4 text-white font-bold text-sm md:text-lg rounded-full overflow-hidden group"
                    style={{
                      background: "linear-gradient(to right, #03738c, #0296b8)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Explore How to Pay</span>
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #e6242d, #fc323c)",
                      }}
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>

                <Link href="https://isperp.mazedanetworks.net/ispcare" passHref>
                  <motion.button
                    key={`button-${activeSlide}`}
                    className="relative px-5 py-2.5 md:px-8 md:py-4 text-white font-bold text-sm md:text-lg rounded-full overflow-hidden group"
                    style={{
                      background: "linear-gradient(to right, #03738c, #0296b8)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Make a Quick Payment</span>
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #e6242d, #fc323c)",
                      }}
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="relative w-1/2 h-full">
            {/* Gradient overlay */}
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white/100 via-white/40 to-transparent z-[2]" />

            {/* Background image */}
            <div
              className="absolute inset-0 object-cover bg-center bg-cover"
              style={{
                backgroundImage: "url('/images/pay_bill.webp')",
              }}
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative flex flex-row items-center justify-center h-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/smart_home.webp"
              alt="Gaming background"
              className="object-cover w-full h-full opacity-20"
            />
            <div className="absolute inset-0 bg-white/70" />
          </div>
          <div className="relative flex flex-col justify-center w-1/2 h-full px-12">
            <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white/100 via-white/40 to-transparent z-[2]" />

            <div className="relative z-20 w-full pl-0 md:pl-20">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-3 text-4xl font-bold md:text-7xl md:mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">IPv6</span>
                  <span className="block text_red">ENABLED</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl text_green md:mb-6"
                >
                  Control Your Smart Home from Anywhere
                </h2>
              </motion.div>
            </div>
          </div>
          <div className="relative w-1/2 h-full">
            {/* Gradient overlay */}
            <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white/100 via-white/40 to-transparent z-[2]" />

            {/* Background image */}
            <div
              className="absolute inset-0 object-cover bg-center bg-cover"
              style={{
                backgroundImage: "url('/images/smart_home.webp')",
              }}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSectionDesktop;
