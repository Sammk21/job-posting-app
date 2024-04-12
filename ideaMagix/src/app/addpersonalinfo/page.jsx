"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/context";

const Page = () => {

    const {userData} = useUser()


  const [formData, setFormData] = useState({
    userId:userData.id,
    yearsOfExperience: "",
    preferredTechnologies: "",
    resume: null,
  });

  console.log(formData)

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", formData.userId)
      formDataToSend.append("yearsOfExperience", formData.yearsOfExperience);
      formDataToSend.append(
        "preferredTechnologies",
        formData.preferredTechnologies
      );
      formDataToSend.append("resume", formData.resume);

      const response = await axios.post(
        "http://localhost:9000/personalInfo",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/");
      console.log("Personal info added:", response.data);
      alert("Personal info added successfully");

      // Reset form data
      setFormData({
        yearsOfExperience: "",
        preferredTechnologies: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add personal info");
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Add Personal Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="yearsOfExperience"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Years Of Experience
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="yearsOfExperience"
                    id="yearsOfExperience"
                    className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black px-3"
                    onChange={handleChange}
                    value={formData.yearsOfExperience}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="preferredTechnologies"
                  className="block text-sm font-medium leading-6 "
                >
                  Preferred Technologies
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="preferredTechnologies"
                    id="preferredTechnologies"
                    className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black px-3 "
                    onChange={handleChange}
                    value={formData.preferredTechnologies}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Resume
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/75 px-6 py-10 flex-col items-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-black font-semibold text-white   flex flex-col items-center"
                  >
                    <span className="pb-4">Upload your resume</span>
                    <input
                      className=""
                      type="file"
                      id="resume"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pt-4">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/"
            type="button"
            className="text-sm font-semibold leading-6 text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className=" border-gray-500 bg-white text-black px-4 py-2 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default Page;
