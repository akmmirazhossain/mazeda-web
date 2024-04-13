import React from "react";
import Image from "next/image";
import phoneNumbers from "../../../public/data/phoneNumbers.json";

const PhoneNumbers = () => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap_akm">
        {phoneNumbers.phoneNumbers.map((contact, index) => (
          <div key={index} className="text-center border pad_akm rounded-2xl">
            <p className="font-bold body_text_akm">{contact.title}</p>
            <img src={contact.image} alt="" className="p-4" />
            <p className="font-bold body_text_akm">{contact.number}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PhoneNumbers;
