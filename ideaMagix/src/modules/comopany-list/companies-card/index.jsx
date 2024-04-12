"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useUser } from '@/context/context';

const Companycard = ({company}) => {

   const [loading, setLoading] = useState(false);
     const { userData } = useUser();

   const [showDialog, setShowDialog] = useState(false);
  const [userInfo, setUserInfo] = useState();




   const handleApply = async () => {
     setLoading(true);
      try {
        await axios.post("http://localhost:9000/applications", {
          userId: userData.id,
          companyId: company._id,
          personalDetailsId: userInfo[0]._id,
        });
       alert("Application sent successfully to hr");
       setLoading(false);
       setShowDialog(false)
      } catch (error) {
        console.error("Error sending application:", error);
        setLoading(false);
        alert("Failed to send application. Please try again later.");
      }
   }

   const fetchUserInfo = async () =>{
   
     try {
        const response = await  axios.get(`http://localhost:9000/personalInfo/${userData.id}`);
        setUserInfo(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 

    useEffect(()=>{
fetchUserInfo();
    },[])

    console.log(userInfo)

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative flex w-full max-w-[70rem] flex-col rounded-xl bg-transparent bg-clip-border text-white shadow-none border-[0.5px] p-5 mb-4">
          <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-white bg-transparent shadow-none rounded-xl bg-clip-border">
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Name: {company.title}
                </h5>
                <div className="flex items-center gap-0 5"></div>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                <span className="font-bold">Role: </span>
                {company.details}
              </p>
            </div>
          </div>
          <div className="p-0 ">
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              <span className="font-bold">Description:</span>{" "}
              {company.description}
            </p>
          </div>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
            <span className="font-bold">Experience:</span> {company.exp}
          </p>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
            <span className="font-bold">Salary:</span> {company.salary}
          </p>
          <div className="mt-3 flex items-center justify-center gap-x-6">
            <button
              onClick={()=> setShowDialog(true)}
              className={`rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-600 ${
                loading && "pointer-events-none"
              }`}
            >
              {loading ? "loading.." : "apply"}
            </button>
          </div>
        </div>
      </div>
      {showDialog && userInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-black rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <p>Name: {company.title}</p>
            <p>Role: {company.details}</p>
            <p>Description: {company.description}</p>
            <div className="my-4 flex flex-col">
              <h1 className="mb-3 font-semibold text-base">Apply with following records ? </h1>
            
              <p>Years of experience: {userInfo[0]?.yearsOfExperience}</p>
              <p>
                Preferred Technologies: {userInfo[0]?.preferredTechnologies}
              </p>
              <a
              className='text-sm underline'
                href={`http://localhost:9000/${userInfo[0]?.resume}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                See Resume
              </a>
            </div>
            <div className="flex justify-end mt-4 text-black">
              <button
                className="bg-white hover:bg-gray-400  px-4 py-2 rounded-lg mr-2 "
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
              <button
                className="bg-white hover:bg-gray-400  px-4 py-2 rounded-lg"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Companycard