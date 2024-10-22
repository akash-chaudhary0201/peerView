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
      <div className="">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : !user ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold">User not found</p>
          </div>
        ) : (
          <div className="px-[150px]">
            <div className="flex items-center justify-between">
              {" "}
              {/* Added justify-between here */}
              <div className="flex items-center">
                <div className="h-[150px] w-[150px] bg-red-100 rounded-full"></div>
                <div className="ml-4">
                  {" "}
                  {/* Added margin-left for spacing */}
                  <h1 className="text-[30px] font-semibold">{user.userName}</h1>
                  <h1>{user.email}</h1>
                </div>
              </div>
              <div>
                {" "}
                {/* This div is now aligned to the right */}
                <a target="_blank" href={user.linkedIn}>
                  LinkedIn Account
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSingle;

{
  /* <div className="mt-2 flex gap-5">
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
</div> */
}

{
  /* <h3 className="text-xl font-bold text-blue-600 mb-2">Skills:</h3>
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
            )} */
}
