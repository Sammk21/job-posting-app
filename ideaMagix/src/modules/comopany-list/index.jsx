
"use client"
import React, { useEffect, useState } from 'react'
import Companycard from './companies-card'
import axios from "axios";

const CompanyListing = () => {

   const [companies, setCompanies] = useState();

    const fetchData = async () => {
      try {
        // Make the GET request using Axios
        const response = await axios.get("http://localhost:9000/companies");
        setCompanies(response.data)
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };
    useEffect(()=>{
   fetchData();
    },[])

  
  return (
    <main>
      {companies?.map((company, i) => (
        <Companycard key={i} company={company} />
      ))}
    </main>
  );
}

export default CompanyListing