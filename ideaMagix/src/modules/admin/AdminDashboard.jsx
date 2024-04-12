"use client"
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ClassicButton from "../common/Button";
import { columns } from "../dummydata/data";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/context";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Admin() {
  const [companies, setCompanies] = useState([]);

  const router = useRouter()

    const { userData } = useUser();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

     useLayoutEffect(() => {
       userData.role === "admin" ? null : router.push("/")
       fetchData()
     }, []);



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/companies/${id}`
      );
      if (response.status === 204) {
        // Remove the deleted company from the state
        setCompanies(companies.filter((company) => company._id !== id));
        alert("Company deleted successfully");
      } 
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log("Editing company with ID:", id);
  };

  return (
    <>
      <div className="text-[3vw] capitalize font-bold text-gray-500 pb-6">
        <h1>All the companies</h1>
      </div>
      <div className="flex gap-x-3">
        <Link href="/addcompany">
          <ClassicButton label={"Add Company"} />
        </Link>
        <Link href="/addcategory">
          <ClassicButton label={"Add categories"} />
        </Link>
        <Link href="/applicants">
          <ClassicButton label={"Show Applicants"} />
        </Link>
      </div>

      <div>
        <h5 className="text-gray-400">
          click ( <span className="text-white font-bold">pencil</span> ) icon to
          Edit <span className="font-bold text-white">Company details</span>{" "}
        </h5>
      </div>
      <div className="overflow-x-auto">
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
            {companies?.map((company) => (
              <tr key={company._id} className="text-sm my-6">
                <td className="px-4 py-2">{company?.title}</td>
                <td className="px-4 py-2">{company?.details}</td>
                <td className="px-4 py-2">{company?.skills}</td>
                <td className="px-4 py-2">{company?.exp}</td>
                <td className="px-4 py-2">{company?.description}</td>
                <td className="px-4 py-2">{company?.salary}</td>
                <td className="px-4 py-2">
                  <div className="relative flex items-center gap-2">
                    <div className="flex w-full justify-center">
                      <Tooltip color="danger" content="Delete company">
                        <span
                          className="text-lg text-[#ff1d1d] cursor-pointer active:opacity-50"
                          onClick={() => handleDelete(company._id)}
                        >
                          <MdDeleteOutline />
                        </span>
                      </Tooltip>
                    
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
