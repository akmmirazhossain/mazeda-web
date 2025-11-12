"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SlideWindow({
  items = ["Div 1", "Div 2", "Div 3", "Div 4", "Div 5", "Div 6", "Div 7"],
}) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2} // show two items at once
        slidesPerGroup={1} // advance by one item each swipe
        spaceBetween={16}
        loop={true}
        loopedSlides={items.length} // helps loop correctness
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        grabCursor={true}
      >
        {items.map((label, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex items-center justify-center h-40 text-lg font-semibold bg-gray-100 rounded-lg">
              {label}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
