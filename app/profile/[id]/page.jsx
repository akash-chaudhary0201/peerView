"use client";

import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ProfileSingle = ({ params }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = params.id;

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data.user);
      console.log(response.data.user);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : !user ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold">User not found</p>
          </div>
        ) : (
          <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden shadow-lg"></div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.userName}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdEmail /> {user.email}
                    <FaPhoneAlt /> {user.phoneNumber}
                  </div>
                  <div className="mt-2 flex gap-5">
                    <a
                      href={user.linkedIn}
                      className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={user.portFolio}
                      className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-blue-600 mb-2">Skills:</h3>
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full border border-blue-300 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p>No skills listed.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSingle;
