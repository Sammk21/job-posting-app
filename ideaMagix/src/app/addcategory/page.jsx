"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

export default function JobForm() {
  const [formData, setFormData] = useState({
    jobCategories: [],
    jobTypes: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "jobCategories" || e.target.name === "jobTypes") {
      // Split the input string by commas to create an array
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/categories",
        formData
      );

   alert("category saved sucessfully")
   router.push("/admin")
      setFormData({
        jobCategories: [],
        jobTypes: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-500">
            Add Job Categories and Types
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-3">
              <label
                htmlFor="jobCategories"
                className="block text-sm font-medium leading-6 text-white"
              >
                Job Categories
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="jobCategories"
                  id="jobCategories"
                  autoComplete="off"
                  placeholder="Enter job categories separated by commas"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.jobCategories.join(", ")}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="jobTypes"
                className="block text-sm font-medium leading-6 text-white"
              >
                Job Types
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="jobTypes"
                  id="jobTypes"
                  autoComplete="off"
                  placeholder="Enter job types separated by commas"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.jobTypes.join(", ")}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="border-gray-500 bg-white text-black px-4 py-2 rounded-full"
        >
          Save
        </button>
      </div>
    </form>
  );
}
