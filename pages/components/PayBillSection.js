import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useIntl } from "react-intl";
import payBillData from "../../public/data/payBillData.json";

const PayBillSection = () => {
  const intl = useIntl();
  const paybillSubtitle = intl.messages.component.paybillSubtitle;
  const paybillPortalButton = intl.messages.component.paybillPortalButton;
  const paybillPortalButtonText =
    intl.messages.component.paybillPortalButtonText;

  const paybillBkashTitle = intl.messages.component.paybillBkashTitle;
  const paybillBkashSteps = intl.messages.component.paybillBkashSteps;
  const paybillNagadTitle = intl.messages.component.paybillNagadTitle;
  const paybillNagadSteps = intl.messages.component.paybillNagadSteps;

  const paybillPortalTitle = intl.messages.component.paybillPortalTitle;
  const paybillPortalSteps = intl.messages.component.paybillPortalSteps;

  const paybillOtherTitle = intl.messages.component.paybillOtherTitle;
  const paybillOtherSubtitle = intl.messages.component.paybillOtherSubtitle;

  const paybillNoSubId = intl.messages.component.paybillNoSubId;

  return (
    <section className="page_body">
      <div className="box_round_shadow mb_akm grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 mb-4 md:mb-0">{paybillSubtitle}</div>
        <div className="flex items-center justify-center flex-col text-center lg:text-right">
          <button className=" items-center mt-auto text-center rounded-full text-white green_gradient hover:red_gradient  border-0 py-2 px-4 focus:outline-nonerounded-full">
            <Link
              href="https://isperp.mazedanetworks.net/ispcare"
              target="_blank"
            >
              {" "}
              {paybillPortalButton}
            </Link>
          </button>
          <span className="text-xs mt-1">{paybillPortalButtonText}</span>
        </div>
      </div>

      <div className="box_round_shadow mb_akm">
        <div className="mb_akm flex items-center">
          <div className="rounded-full border mr-3 h-12 w-12">
            <img
              alt=""
              src="/images/logos/bkash-logo.png"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">{paybillBkashTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          {paybillBkashSteps.map((item, index) => (
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
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paybillNoSubId }}
                  ></p>
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
              src="/images/logos/nagad.jpg"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">{paybillNagadTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          {paybillNagadSteps.map((item, index) => (
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
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paybillNoSubId }}
                  ></p>
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
              src="/images/logos/user-portal.jpg"
              className=" rounded-full"
            />
          </div>
          <div>
            <p className="subheading_akm">{paybillPortalTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap_akm">
          {paybillPortalSteps.map((step, index) => (
            <div className="pad_akm relative" key={index}>
              <div className="absolute flex items-center justify-center -right-2 -top-1 bg-[#03738c] text-white w-10 h-10 rounded-full text-2xl font-bold">
                {index + 1}
              </div>
              <div className="my-2 rounded-2xl border-2 overflow-hidden">
                <img src={step.image} alt="" />
              </div>
              <div className="leading-relaxed">
                <p
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.step }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box_round_shadow mb_akm grid grid-cols-1 lg:grid-cols-2">
        <div className="mb_akm">
          <p className="subheading_akm">{paybillOtherTitle}</p>
          <p className="body_text_akm">{paybillOtherSubtitle}</p>
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
