"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";

const SignupPage = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    year: "",
    section: "",
    skills: "",
    phoneNumber: "",
    linkedIn: "",
    portFolio: "",
    resume: "",
    certifications: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signUp", {
        ...user,
        skills: user.skills.split(",").map((skill) => skill.trim()),
        certifications: user.certifications
          .split(",")
          .map((cert) => cert.trim()),
      });

      if (response.data.success) {
        mutate("/api/users/allProfiles");
        localStorage.setItem("email", response.data.newUser.email);
        router.push("/otp_verification");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during signup.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className={`bg-gray-800 shadow-md rounded-lg p-6 max-w-lg w-full ${
          loading ? "blur-sm" : ""
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Full Name"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full px-4 py-2 rounded-md shadow-sm text-black"
              required
            />
          </div>
          <div className="col-span-2">
            <input
              type="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 rounded-md shadow-sm text-black"
              required
            />
          </div>
          <div className="col-span-2">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 rounded-md shadow-sm text-black"
              required
            />
          </div>
          <input
            type="number"
            placeholder="Year"
            value={user.year}
            onChange={(e) => setUser({ ...user, year: e.target.value })}
            className="px-4 py-2 rounded-md shadow-sm text-black"
            required
          />
          <input
            type="text"
            placeholder="Section"
            value={user.section}
            onChange={(e) => setUser({ ...user, section: e.target.value })}
            className="px-4 py-2 rounded-md shadow-sm text-black"
            required
          />
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={user.skills}
              onChange={(e) => setUser({ ...user, skills: e.target.value })}
              className="w-full px-4 py-2 rounded-md shadow-sm text-black"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            className="px-4 py-2 rounded-md shadow-sm text-black"
            required
          />
          <input
            type="url"
            placeholder="LinkedIn Profile"
            value={user.linkedIn}
            onChange={(e) => setUser({ ...user, linkedIn: e.target.value })}
            className="px-4 py-2 rounded-md shadow-sm text-black"
            required
          />
          <input
            type="url"
            placeholder="Portfolio URL"
            value={user.portFolio}
            onChange={(e) => setUser({ ...user, portFolio: e.target.value })}
            className="px-4 py-2 rounded-md shadow-sm text-black"
            required
          />
          <input
            type="text"
            placeholder="Certifications (comma separated)"
            value={user.certifications}
            onChange={(e) =>
              setUser({ ...user, certifications: e.target.value })
            }
            className="px-4 py-2 rounded-md shadow-sm text-black"
          />
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Resume URL"
              value={user.resume}
              onChange={(e) => setUser({ ...user, resume: e.target.value })}
              className="w-full px-4 py-2 rounded-md shadow-sm text-black"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              {loading ? "Please Wait..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default SignupPage;
