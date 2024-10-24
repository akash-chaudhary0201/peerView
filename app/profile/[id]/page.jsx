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
          <div className="flex  px-[150px] py-[20px]">
            <div>
              <div className="bg-white h-[250px] w-[250px]"></div>
              <div className="mt-[20px]">
                <h1 className="text-[25px]">Skills :- </h1>
                <ul className="list-disc ml-[20px]">
                  {user.skills.map((skill) => (
                    <li className="text-[20px]">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-[20px] w-full">
              <div>
                <div>
                  <h1 className="text-[35px]">{user.userName}</h1>
                  <h1 className="text-[20px] text-blue-600">
                    Software Engineer
                  </h1>
                </div>
                <div className="pt-[20px]">
                  <ul className="flex gap-[20px] flex-wrap">
                    <li>
                      {" "}
                      Year :- &nbsp;
                      <span>{user.year}</span>
                    </li>
                    <li>
                      Section :- &nbsp;
                      <span className="uppercase">{user.section}</span>
                    </li>
                    <li>
                      Phone :- &nbsp; <span>{user.phoneNumber}</span>
                    </li>
                    <li>
                      Email :- &nbsp; <span>{user.email}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap mt-[20px] gap-[20px]">
                  <a
                    className="bg-blue-600 px-[20px] rounded-sm text-[20px] py-[6px] font-semibold"
                    href={user.linkedIn}
                  >
                    LinkedIn
                  </a>
                  <a
                    className="bg-blue-600 rounded-sm px-[20px] text-[20px] py-[6px] font-semibold"
                    href={user.portFolio}
                  >
                    Portfolio
                  </a>
                </div>
                <hr className="w-full mt-[20px] ml-[10px]" />
                <div className="mt-[20px]">
                  <h1 className="text-[30px]">Projects</h1>
                  <div>
                    <h1 className="text-blue-600 text-[50px]">
                      Soon You will be able to add your projects to your
                      profile.... Thank You
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSingle;
