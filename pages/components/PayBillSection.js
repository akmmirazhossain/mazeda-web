import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import payBillData from "../../public/data/payBillData.json";

const PayBillSection = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  return (
    <section className="section_akm">
      <div className="text-center pb-4 bg-[url('/images/pay-bill-cover.webp')] bg-cover bg-center h-36 sm:h-52 md:h-64 lg:h-96 flex items-center justify-center text-white ">
        <h1 className="heading_akm text_shadow_black">
          Seeking payment options?
        </h1>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 mb-4 md:mb-0">
          This page shows a comprehensive range of payment solutions, find your
          best suited option to make a safe online transection.
        </div>
        <div className="flex items-center justify-center flex-col text-center lg:text-right">
          <button className=" items-center mt-auto text-center rounded-full text-white green_gradient hover:red_gradient  border-0 py-2 px-4 focus:outline-nonerounded-full">
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
          {payBillData.bkash.map((item, index) => (
            <div className="pad_akm relative" key={index}>
              <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl font-bold">
                {index + 1}
              </div>
              <div className="my-2 rounded-2xl border-2 overflow-hidden">
                <img src={item.image} alt={`Step ${index + 1}`} />
              </div>
              <p
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.step }}
              ></p>
              {item.note && (
                <div
                  className="mt_akm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p>
                    No Subscriber ID? Please contact us{" "}
                    <span className="font-bold">09666 334455</span>
                  </p>
                </div>
              )}
            </div>
          ))}
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
          {payBillData.nagad.map((item, index) => (
            <div className="pad_akm relative" key={index}>
              <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl font-bold">
                {index + 1}
              </div>
              <div className="my-2 rounded-2xl border-2 overflow-hidden">
                <img src={item.image} alt={`Step ${index + 1}`} />
              </div>
              <p
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.step }}
              ></p>
              {item.note && (
                <div
                  className="mt_akm bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p>
                    No Subscriber ID? Please contact us{" "}
                    <span className="font-bold">09666 334455</span>
                  </p>
                </div>
              )}
            </div>
          ))}
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
          {payBillData.userPortal.map((step, index) => (
            <div className="pad_akm relative" key={index}>
              <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl font-bold">
                {index + 1}
              </div>
              <div className="my-2 rounded-2xl border-2 overflow-hidden">
                <img src={step.image} alt="" />
              </div>
              <div className="leading-relaxed">
                {step.link ? (
                  <>
                    <Link
                      href={step.link}
                      target="_blank"
                      className="text-blue-700 font-bold"
                      dangerouslySetInnerHTML={{ __html: step.linkText }}
                    />
                    and login.
                  </>
                ) : (
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.step }}
                  ></p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 lg:grid-cols-2">
        {payBillData.option.map((option, index) => (
          <div className="mb_akm" key={index}>
            <p className="subheading_akm">{option.title}</p>
            <p className="body_text_akm">{option.description}</p>
          </div>
        ))}
        <div className="">
          <img alt="" src="/images/more-payment-options-part1.png" />
          <img alt="" src="/images/more-payment-options-part2.png" />
        </div>
      </div>
    </section>
  );
};

export default PayBillSection;
