// pages/login.js
"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/context";

export default function Login() {

   const { updateUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOTP] = useState("");
  const [showNewPasswordDialog, setShowNewPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router  = useRouter();

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await axios.post("http://localhost:9000/api/auth/login", {
       email,
       password,
     });

     if (response.status === 200) {
       const { token, user } = response.data;
       localStorage.setItem("token", token);
        updateUser(user);
       alert("login successful")

       router.push("/")

       console.log("User data:", user);
     } else {
       setError("Login failed");
     }
   } catch (error) {
     console.error("Error:", error);
     setError("Invalid credentials");
   }
 };


 const handleForgotPassword = async () => {

  setLoading(true)
   try {
     const response = await axios.post(
       "http://localhost:9000/api/auth/forgotpassword",
       {
         forgotPasswordEmail,
       }
     );

     if (response.status === 200) {
       setLoading(false);
       setMessage("Password reset OTP sent to your email.");
       setShowForgotPassword(false);
       setShowOTPVerification(true) // Close the dialog after sending the OTP
      
     }
   } catch (error) {
     console.error("Error:", error);
     setError("Failed to send password reset OTP.");
   }
 };

 const handleOTPVerification = async () => {
  setLoading(true)
   try {
     const response = await axios.post(
       "http://localhost:9000/api/auth/checkotp",
       {
         email: forgotPasswordEmail,
         otp,
       }
     );

     if (response.status === 200) {
      setLoading(false)
       setMessage("OTP is valid");
       // You can reset the password or perform any other action here
       setShowOTPVerification(false);
       setShowNewPasswordDialog(true)
     }
   } catch (error) {
     console.error("Error:", error);
     setError("Invalid OTP");
   }
 };

 const handleSetNewPassword = async () => {
  setLoading(true)
   try {
     const response = await axios.post(
       "http://localhost:9000/api/auth/setpassword",
       {
         email: forgotPasswordEmail,
         newPassword,
       }
     );

     if (response.status === 200) {
      setLoading(false);
       setMessage("Password updated successfully");
       alert("new password has been updated successfully")
       setShowNewPasswordDialog(false);
     }
   } catch (error) {
     console.error("Error:", error);
     setError("Failed to update password");
   }
 };



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="text-gray-500">
          <p>if youre admin sign in with your provided credentials</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0  text-black py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="font-semibold text-gray-300 hover:text-gray-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0  text-black py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 "
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
              >
                Sign in
              </button>
            </div>
          </form>
          {error && (
            <div className="block text-sm font-medium leading-6 text-[#ff0404] my-4">
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className="block text-sm font-medium leading-6 text-gray-600 text-red my-4">
              <p>{message}</p>
            </div>
          )}
          <div className="block text-sm font-medium leading-6 text-white my-4">
            <p>
              Don't have an account?{" "}
              <a className="underline hover:text-gray" href="/register">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <div className="mb-4">
              <label
                htmlFor="forgot-email"
                className="block text-white font-semibold mb-1"
              >
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                value={forgotPasswordEmail} // Use forgotPasswordEmail state here
                onChange={(e) => setForgotPasswordEmail(e.target.value)} // Update forgotPasswordEmail state
                className="w-full px-3  border border-gray-300 rounded-md text-black py-3"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleForgotPassword}
                className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-600 ${
                  loading && "pointer-events-none"
                }`}
              >
                {loading ? "loading.." : "Send Otp"}
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showOTPVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">OTP Verification</h2>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-white font-semibold mb-1"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp} // Use otp state here
                onChange={(e) => setOTP(e.target.value)} // Update otp state
                className="w-full px-3  border border-gray-300 rounded-md text-black py-3"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleOTPVerification}
                className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-600 ${
                  loading && "pointer-events-none"
                }`}
              >
                {loading ? "loading.." : "  Verify OTP"}
              </button>
              <button
                onClick={() => setShowOTPVerification(false)}
                className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showNewPasswordDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">Set New Password</h2>
            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-white font-semibold mb-1"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3  border border-gray-300 rounded-md text-black py-3"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSetNewPassword}
                className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-600 ${
                  loading && "pointer-events-none"
                }`}
              >
                {loading ? "loading.." : "Set Password"}
              </button>
            </div>
          </div>
          {message && (
            <div className="block text-gray-600 text-sm font-medium leading-6 text-red my-4">
              <p>{message}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
