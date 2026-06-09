// mazeda-web/pages/components/HeroSectionMobile.js
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

const HeroSectionMobile = () => {
  const videoRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Force play all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((e) => {
          console.log("Autoplay prevented:", e);
          // Optionally show a play button overlay here
        });
      }
    });
  }, [activeSlide]);

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
        <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
          {/* Background video section - top half */}
          <div className="relative w-full h-1/2">
            <div className="absolute inset-0 overflow-hidden">
              <video
                ref={(el) => videoRefs.current.push(el)}
                preload="auto"
                className="object-cover w-full h-full opacity-5"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="/videos/phone_gaming_racing.webm"
                  type="video/webm"
                />
              </video>
            </div>

            {/* Gradient fade to video below */}
            {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/40 to-white/100 z-[2]" /> */}

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-2 text-3xl font-bold sm:text-4xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">LOW LATENCY</span>
                  <span className="block text_red">GAMING</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-2 text-lg font-bold sm:text-xl text_green"
                >
                  Online Gaming at Lightning Speed
                </h2>
              </motion.div>

              <motion.p
                key={`desc-${activeSlide}`}
                style={{ fontFamily: "PoppinsRegular" }}
                className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience ultra-low latency gaming with our fiber-optic
                network.
              </motion.p>

              <motion.div
                key={`button-${activeSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href={"/contact"}>
                  <motion.button
                    className="relative px-6 py-3 overflow-hidden text-sm font-bold text-white rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: "linear-gradient(to right, #03738c, #0296b8)",
                    }}
                  >
                    <span className="relative z-10">Starting from ৳500</span>
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

          {/* Full video section - bottom half */}
          <div className="relative w-full h-1/2">
            {/* <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-white/40 to-white/100 z-[2]" /> */}

            <video
              ref={(el) => videoRefs.current.push(el)}
              preload="auto"
              className="object-cover w-full h-full"
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
      <SwiperSlide className="flex items-center justify-center h-full">
        <div className="flex flex-col w-full h-full">
          {/* STREAM 4K - Text Left, Video Right */}
          <div className="relative flex flex-row w-full h-1/3">
            {/* Text Section */}
            <div className="relative flex flex-col items-center justify-center w-1/2 h-full">
              <div className="absolute inset-0 overflow-hidden">
                <video
                  ref={(el) => videoRefs.current.push(el)}
                  preload="auto"
                  className="object-cover w-full h-full opacity-5"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/4k_streaming.webm" type="video/webm" />
                </video>
              </div>

              <div className="relative z-20 flex flex-col items-center justify-center gap-1 px-4">
                <motion.div
                  key={`title-4k-${activeSlide}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    key={`h1-4k-${activeSlide}`}
                    style={{ fontFamily: "Montserrat" }}
                    className="font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="flex flex-row items-center justify-center gap-1 text-xl sm:text-2xl">
                      <span className="block text_green">STREAM</span>
                      <span className="block text_red">4K</span>
                    </div>
                  </motion.h1>
                </motion.div>

                <motion.div
                  key={`subtitle-4k-${activeSlide}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    style={{ fontFamily: "PoppinsMedium" }}
                    className="text-xs font-bold text-center sm:text-sm text_gray"
                  >
                    Zero Buffer, Pure Speed
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Video Section */}
            <div className="relative flex w-1/2 h-full">
              <video
                ref={(el) => videoRefs.current.push(el)}
                preload="auto"
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/4k_streaming.webm" type="video/webm" />
              </video>
            </div>
          </div>

          {/* CRYSTAL CLEAR - Video Left, Text Right */}
          <div className="relative flex flex-row w-full h-1/3">
            {/* Video Section */}
            <div className="relative flex w-1/2 h-full">
              <video
                ref={(el) => videoRefs.current.push(el)}
                preload="auto"
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/communicate.webm" type="video/webm" />
              </video>
            </div>

            {/* Text Section */}
            <div className="relative flex flex-col items-center justify-center w-1/2 h-full">
              <div className="absolute inset-0 overflow-hidden">
                <video
                  ref={(el) => videoRefs.current.push(el)}
                  preload="auto"
                  className="object-cover w-full h-full opacity-5"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/communicate.webm" type="video/webm" />
                </video>
              </div>

              <div className="relative z-20 flex flex-col items-center justify-center gap-1 px-4">
                <motion.div
                  key={`title-crystal-${activeSlide}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    key={`h1-crystal-${activeSlide}`}
                    style={{ fontFamily: "Montserrat" }}
                    className="font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="flex flex-col items-center justify-center text-xl sm:text-2xl">
                      <span className="block text_green">CRYSTAL</span>
                      <span className="block text_red">CLEAR</span>
                    </div>
                  </motion.h1>
                </motion.div>

                <motion.div
                  key={`subtitle-crystal-${activeSlide}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    style={{ fontFamily: "PoppinsMedium" }}
                    className="text-xs font-bold text-center sm:text-sm text_gray"
                  >
                    Conversations
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* GO LIVE - Video Right, Text Left */}
          <div className="relative flex flex-row w-full h-1/3">
            {/* Text Section */}
            <div className="relative flex flex-col items-center justify-center w-1/2 h-full">
              <div className="absolute inset-0 overflow-hidden">
                <video
                  ref={(el) => videoRefs.current.push(el)}
                  preload="auto"
                  className="object-cover w-full h-full opacity-5"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/go_live.webm" type="video/webm" />
                </video>
              </div>

              <div className="relative z-20 flex flex-col items-center justify-center gap-1 px-4">
                <motion.div
                  key={`title-live-${activeSlide}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    key={`h1-live-${activeSlide}`}
                    style={{ fontFamily: "Montserrat" }}
                    className="font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="flex flex-row items-center justify-center gap-1 text-xl sm:text-2xl">
                      <span className="block text_green">GO</span>
                      <span className="block text_red">LIVE</span>
                    </div>
                  </motion.h1>
                </motion.div>

                <motion.div
                  key={`subtitle-live-${activeSlide}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    style={{ fontFamily: "PoppinsMedium" }}
                    className="text-xs font-bold text-center sm:text-sm text_gray"
                  >
                    Stay Connected, Always
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Video Section */}
            <div className="relative flex w-1/2 h-full">
              <video
                ref={(el) => videoRefs.current.push(el)}
                preload="auto"
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/go_live.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
          {/* Background image section - top half */}
          <div className="relative w-full h-1/2">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/pay_bill.webp"
                alt="pay bill"
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Gradient fade to image below */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/40 to-white/100 z-[2]" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-2 text-3xl font-bold sm:text-4xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">PAY BILL</span>
                  <span className="block text_red">FROM HOME</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-4 text-base font-bold sm:text-lg text_green"
                >
                  Pay from home via MFS or SSLCommerz
                </h2>
              </motion.div>

              <motion.div
                key={`button-${activeSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center justify-center w-full gap-2"
              >
                <Link href="/pay-bill" passHref>
                  <motion.button
                    className="relative w-full px-5 py-2.5 text-white font-bold text-xs sm:text-sm rounded-full overflow-hidden"
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
                    className="relative w-full px-5 py-2.5 text-white font-bold text-xs sm:text-sm rounded-full overflow-hidden"
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

          {/* Full image section - bottom half */}
          <div className="relative w-full h-1/2">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-white/40 to-white/100 z-[2]" />

            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: "url('/images/pay_bill.webp')",
              }}
            />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
          {/* Background image section - top half */}
          <div className="relative w-full h-1/2">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/smart_home.webp"
                alt="Smart Home"
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Gradient fade to image below */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/40 to-white/100 z-[2]" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
              <motion.div
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  key={`h1-${activeSlide}`}
                  style={{ fontFamily: "Montserrat" }}
                  className="mb-2 text-3xl font-bold sm:text-4xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text_green">IPv6</span>
                  <span className="block text_red">ENABLED</span>
                </motion.h1>
              </motion.div>

              <motion.div
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="mb-2 text-base font-bold sm:text-lg text_green"
                >
                  Control Your Smart Home from Anywhere
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Full image section - bottom half */}
          <div className="relative w-full h-1/2">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-white/40 to-white/100 z-[2]" />

            <div
              className="absolute inset-0 bg-center bg-cover"
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

export default HeroSectionMobile;
