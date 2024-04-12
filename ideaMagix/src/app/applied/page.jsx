"use client";
import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";

import { Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useUser } from "@/context/context";

const columns = [
  { name: "Company name", uid: "c" },
  { name: "Technologies", uid: "technologies" },
  { name: "Required", uid: "required" },
  { name: "Your exp", uid: "yourexp" },
  { name: "Status", uid: "actions" },
];

const page = () => {
  const [applied, setAppplied] = useState({ data: [] });

  const { userData } = useUser();

  const fetchAppied = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/applications/user/${userData.id}`
      );
      setAppplied(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAppied();
  }, []);

  console.log(applied);

  return (
    <>
      <div className="text-[3vw] capitalize font-bold text-gray-500 pb-6 w-full">
        <h1>Your Dashboard</h1>
      </div>
      <div></div>
      <div className="overflow-x-auto w-[100vh]">
        <table className="table-auto w-full">
          <thead>
            <tr className="">
              {columns.map((column) => (
                <th key={column.uid} className="px-4 py-2 text-left">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applied.data &&
              applied.data.map((application, i) => (
                <tr key={i} className="text-sm my-6">
                  <td className="px-4 py-2">{application.company.title}</td>
                 
                  <td className="px-4 py-2">
                    {application.personalDetails.preferredTechnologies.join(
                      ", "
                    )}
                  </td>
                  <td className="px-4 py-2">{application.company.details}</td>
                  <td className="px-4 py-2">
                    {application.personalDetails.yearsOfExperience}
                  </td>
                  <td className="px-4 py-2">
                    {application.applicationStatus === "reject" && (
                      <span className="text-xs text-white cursor-pointer active:opacity-50 flex font-bold">
                        <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
                        <span>Rejected</span>
                      </span>
                    )}
                    {application.applicationStatus === "accept" && (
                      <span className="text-xs text-white cursor-pointer active:opacity-50 flex font-bold">
                        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                        <span>Viewed</span>
                      </span>
                    )}
                    {application.applicationStatus === "pending" && (
                      <span className="text-xs text-white cursor-pointer active:opacity-50 flex font-bold">
                        <span className="flex w-3 h-3 me-3 bg-gray-500 rounded-full"></span>
                        <span>pending</span>
                      </span>
                    )}
                  </td>
                  {/* Add more relevant fields here */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;

<span
  className="text-xs text-white cursor-pointer active:opacity-50 flex font-bold"
>
  <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
  <span>Rejected</span>
</span>;
