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
//import payBillData from "../../public/data/payBillData.json";

const PayBillSection = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    setCurrentMonthYear(`${month} ${year}`);
  }, []);

  return (
    <section className="section_akm">
      <div className="text-center pb-4 bg-[url('/images/pay-bill-cover.png')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96 flex items-center justify-center text-white ">
        <h1 className="heading_akm ">Seeking payment options?</h1>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 mb-4 md:mb-0">
          This page shows a comprehensive range of payment solutions, find your
          best suited option to make a safe online transection.
        </div>
        <div className="flex items-center justify-center flex-col text-center lg:text-right">
          <button className=" items-center mt-auto text-center text-white bg-[#03738C] border-0 py-2 px-4 focus:outline-none hover:bg-red-700 rounded-full">
            <Link
              href="https://isperp.mazedanetworks.net/ispcare"
              target="_blank"
            >
              {" "}
              Pay from online portal
            </Link>
          </button>
          <span className="text-xs mt-1">
            (Pay with Visa, Debit, or Credit cards.)
          </span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              1
            </div>

            <div className="my-2  rounded-2xl border-2  overflow-hidden">
              <img src="images/slider/bkash/b1.png" />
            </div>
            <p className="leading-relaxed">
              Select the <span className="font-bold"> Pay Bill </span> option.
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              2
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/bkash/b2.png" />
            </div>
            <p className="leading-relaxed">
              Search
              <span className="font-bold"> Mazeda Networks Ltd </span> and tap
              on it
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              3
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/bkash/b3.png" />
            </div>

            <p className="leading-relaxed">
              Choose <span className="font-bold"> current month </span> (e.g.{" "}
              {currentMonthYear}) and enter your
              <span className="font-bold"> Subscriber ID</span>
            </p>
            <div
              className="mt_akm bg-orange-100 border-l-4  border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p>
                No Subscriber ID? Please contact us
                <span className="font-bold"> 09666 334455</span>
              </p>
            </div>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              <FontAwesomeIcon icon={faCheck} />
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/bkash/b5.png" />
            </div>

            <p className="leading-relaxed">
              <span className="font-bold">Tap and hold for Pay Bill </span>
              untill the payment is successful.
            </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              1
            </div>

            <div className="my-2  rounded-2xl border-2  overflow-hidden">
              <img src="images/slider/nagad/n1.jpg" />
            </div>
            <p className="leading-relaxed">
              Select the <span className="font-bold"> Bill Pay</span> option.
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              2
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/nagad/n2.jpg" />
            </div>
            <p className="leading-relaxed">
              Search
              <span className="font-bold"> Mazeda Networks Ltd </span> and tap
              on it
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              3
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/nagad/n3.jpg" />
            </div>

            <p className="leading-relaxed">
              Type your <span className="font-bold"> Customer ID</span>, then
              tap on <span className="font-bold">NEXT</span>
            </p>
            <div
              className="mt_akm bg-orange-100 border-l-4  border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p>
                No Subscriber ID? Please contact us
                <span className="font-bold"> 09666 334455</span>
              </p>
            </div>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              <FontAwesomeIcon icon={faCheck} />
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/nagad/n4.png" />
            </div>

            <p className="leading-relaxed">
              Type your name on{" "}
              <span className="font-bold">Bill Reference Name</span> and tap
              <span className="font-bold"> NEXT </span>
              untill the payment is successful.
            </p>
          </div>
        </div>
      </div>

      <div className="box_round_shadow mb_akm">
        <div className="mb_akm flex items-center">
          <div className="rounded-full border mr-3 h-12 w-12">
            <img
              alt=""
              src="images/logos/user-portal.jpg"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">
              Steps for Visa, Debit, or Credit card payment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              1
            </div>

            <div className="my-2  rounded-2xl border-2  overflow-hidden">
              <img src="images/slider/user-portal/up1.jpg" />
            </div>
            <p className="leading-relaxed ">
              <Link
                href="https://isperp.mazedanetworks.net/ispcare"
                target="_blank"
                className="text-blue-700 font-bold"
              >
                Click here
              </Link>{" "}
              and login
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              2
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/user-portal/up2.jpg" />
            </div>
            <p className="leading-relaxed">
              Click on <span className="font-bold">PAY BILL</span>
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              3
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/user-portal/up3.jpg" />
            </div>

            <p className="leading-relaxed">
              Click on <span className="font-bold">PAY NOW - SSL GATEWAY</span>
            </p>
          </div>

          <div className=" pad_akm relative">
            <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl  font-bold">
              <FontAwesomeIcon icon={faCheck} />
            </div>

            <div className="my-2  rounded-2xl border-2 overflow-hidden">
              <img src="images/slider/user-portal/up4.jpg" />
            </div>

            <p className="leading-relaxed">
              Enter your card details and make a safe transaction.
            </p>
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
