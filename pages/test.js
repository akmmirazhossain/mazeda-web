// pages/[slug].js (or appropriate filename)

import React from "react";

const Page = ({ infoData }) => {
  if (!infoData) {
    return <div>Loading...</div>; // Add a loading state if needed
  }

  return (
    <div>
      <h1>{infoData.pages_title}</h1>
      <p>{infoData.pages_content}</p>
    </div>
  );
};
