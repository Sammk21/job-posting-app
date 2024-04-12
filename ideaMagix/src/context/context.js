
"use client"// userContext.js
import React, { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

   const logout = () => {
     setUserData(null);
     localStorage.removeItem("userData");

   };



  const updateUser = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  
  };

 

  return (
    <UserContext.Provider
      value={{ userData, updateUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

