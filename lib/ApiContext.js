import React, { createContext, useContext, useState } from "react";
import { apiUrl, apiUrl_en } from "../config/config";

// Create the context
const ApiContext = createContext();

// Create a provider component
export const ApiProvider = ({ children }) => {
  const [apiBaseUrl, setApiBaseUrl] = useState(apiUrl);

  const switchToBnApi = () => {
    setApiBaseUrl(apiUrl);
  };

  const switchToEnApi = () => {
    setApiBaseUrl(apiUrl_en);
  };

  return (
    <ApiContext.Provider value={{ apiBaseUrl, switchToEnApi, switchToBnApi }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => useContext(ApiContext);
