import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiUrl, imgUrl } from "../../../config/config";
import { useIntl } from "react-intl";
import Cookies from "js-cookie";

const PhoneNumbers = () => {
  const [phoneData, setPhoneData] = useState(null);

  const intl = useIntl();
  const aiChat = intl.messages.component.phoneNumbers.aiChat;
  const aiChatComingSoon =
    intl.messages.component.phoneNumbers.aiChatComingSoon;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = Cookies.get("baseApi");
        const response = await fetch(`${apiUrl}/phone.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch phone data");
        }
        const data = await response.json();
        setPhoneData(data);
      } catch (error) {
        console.error("Error fetching phone data:", error);
      }
    };
    fetchData();
  }, []);

  if (!phoneData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap_akm">
        {phoneData.map((phone) => (
          <div
            key={phone.phone_id}
            className="text-center border pad_akm_sm rounded-2xl  shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)]"
          >
            <p className="font-bold body_text_akm">{phone.title}</p>
            <img
              src={`${imgUrl}${phone.image}`}
              alt={phone.title}
              className="p-6"
            />
            <p className="font-bold body_text_akm">{phone.number}</p>
          </div>
        ))}

        <div className="text-center border pad_akm_sm rounded-2xl  shadow-[inset_0_-12px_8px_rgba(0,0,0,0.06)]">
          <p className="font-bold body_text_akm">{aiChat}</p>
          <img src="/images/chat-bot.png" alt="" className="p-6" />
          <p className=" text_gray italic">{aiChatComingSoon}</p>
        </div>
      </div>
    </>
  );
};

export default PhoneNumbers;
