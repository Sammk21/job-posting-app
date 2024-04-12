"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
   

const columns = [
  { name: "Name", uid: "name" },
  { name: "Experience", uid: "experience" },
  { name: "Company name", uid: "companyName" },
  { name: "Required experience", uid: "requiredExp" },
  { name: "Resume", uid: "resume" },
  { name: "Action", uid: "Actions" },
];



const page = () => {

  const [applications, setApplication] = useState();

   const [showDialog, setShowDialog] = useState(false);
   const [selectedApplication, setSelectedApplication] = useState(null);

 const fetchApplicants = async () => {
   try {
     const response = await axios.get(`http://localhost:9000/applications`);
     setApplication(response.data);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };
 useEffect(() => {
   fetchApplicants();
 },[]);

 const handleStatusChange = async (applicationId, status) => {
   try {
     const response = await axios.put(
       `http://localhost:9000/applications/${applicationId}`,
       { status }
     );
     console.log("Application status updated:", response.data);
     alert("application status updated")
     // Optionally, you can update the state or perform any other action after updating the status
   } catch (error) {
     console.error("Error updating application status:", error);
     // Handle error
   }
 };

  const handleRejectWithReason = async (reason) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/applications/${selectedApplication}`,
        {
          status: "reject",
          reason: reason, // Store the reason in the database
        }
      );
      console.log("Application status updated:", response.data);
      setShowDialog(false);
      fetchApplicants(); // Refresh the application list
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

    
  return (
    <>
      <div className="text-[3vw] capitalize font-bold text-gray-500 pb-6">
        <h1>All applicants</h1>
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
            {applications?.data.map((application) => (
              <tr key={application._id} className="text-sm my-6">
                <td className="px-4 py-2">{application?.user?.name}</td>
                <td className="px-4 py-2">
                  {application?.personalDetails?.yearsOfExperience}
                </td>
                <td className="px-4 py-2">{application?.company?.title}</td>

                <td className="px-4 py-2">{application?.company?.details}</td>
                <td className="px-4 py-2">
                  <a
                    className="underline"
                    href={`http://localhost:9000/${application?.personalDetails?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-4 py-2 bg-black flex">
                  {!application.rejected && (
                    <>
                      <button
                        className="bg-black text-white rounded-lg px-2 py-1 mr-2"
                        onClick={() =>
                          handleStatusChange(application._id, "accept")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-white text-black rounded-lg px-2 py-1"
                        onClick={() => {
                          handleStatusChange(application._id, "reject");
                          
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDialog && (
        <ReasonDialog
          onClose={() => setShowDialog(false)}
          onSave={handleRejectWithReason}
        />
      )}
    </>
  );
}

export default page

const ReasonDialog = ({ onClose, onSave }) => {
  const [reason, setReason] = useState("");

  const handleSave = () => {
    onSave(reason);
    onClose();
  };

  return (
    <div className="dialog">
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};