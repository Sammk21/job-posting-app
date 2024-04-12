"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import axios from "axios"

const page = () => {

      const [formData, setFormData] = useState({
        title: "",
        companyDetails: "",
        description: "",
        skills: "",
        experience:"",
       salary:"",
       jobCategory:"",
       jobType:"",
      });


        const [categories, setCategories] = useState([]);
        const [types, setTypes] = useState([]);

       useEffect(() => {
         // Fetch data from the API using Axios
         axios
           .get("http://localhost:9000/categories")
           .then((response) => {
             // Extract job categories and types from the API response
             const data = response.data.data;
             const categories = data.map((item) => item.jobCategories).flat();
             const types = data.map((item) => item.jobTypes).flat();
             // Remove duplicates
             const uniqueCategories = [...new Set(categories)];
             const uniqueTypes = [...new Set(types)];
             // Set the state with unique categories and types
             setCategories(uniqueCategories);
             setTypes(uniqueTypes);
           })
           .catch((error) => console.error("Error fetching data:", error));
       }, []);




      const router = useRouter();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:9000/companies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            alert("Sucess company added")
            router.push("/admin"); // Redirect to admin page after successful submission
          } else {
            throw new Error("Failed to add company");
          }
        } catch (error) {
          console.error("Error adding company:", error);
        }
      };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Add company
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-white"
              >
                Company name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="companyDetails"
                className="block text-sm font-medium leading-6 "
              >
                Company details
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="companyDetails"
                  id="companyDetails"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 "
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="skills"
                className="block text-sm font-medium leading-6 "
              >
                Skills
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="experience"
                className="block text-sm font-medium leading-6 "
              >
                Experience
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 "
              >
                Salary
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="jobCategory"
                className="block text-sm font-medium leading-6"
              >
                Job category
              </label>
              <div className="mt-2">
                <select
                  id="jobCategory"
                  name="jobCategory"
                  autoComplete="levels"
                  className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="jobType"
                className="block text-sm font-medium leading-6"
              >
                Job type
              </label>
              <div className="mt-2">
                <select
                  id="jobType"
                  name="jobType"
                  autoComplete="levels"
                  className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleChange}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/admin"
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
  );
}

export default page