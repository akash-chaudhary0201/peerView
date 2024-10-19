"use client";

import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [yearFilter, setYearFilter] = useState(null);
  const [sectionFilter, setSectionFilter] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/api/users/allProfiles");
        setUsers(response.data.users);
        setIsDataFetched(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const fetchUsers = (year) => {
    const filtered = users.filter((user) => user.year === year);
    setFilteredUsers(filtered);
    setYearFilter(year);
    setSectionFilter(null);
    setIsDataFetched(true);
  };

  const fetchUsersBySection = (section) => {
    const filtered = users.filter(
      (user) => user.year === yearFilter && user.section === section
    );
    setFilteredUsers(filtered);
    setSectionFilter(section);
  };

  const changePage = (userId) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-[40px]">
        <div className="flex justify-center items-center">
          <h1 className="text-[30px] font-bold">
            Student Profiles: Discover Your Peers
          </h1>
        </div>

        <div className="flex mt-[40px] ">
          <div className="w-[25%] pl-[40px]  shadow-lg rounded-lg mr-[30px] ">
            <div>
              <h1 className="text-orange-600 text-[22px] mb-[10px]">Year</h1>
              <div className="flex gap-[10px] flex-wrap">
                <button
                  onClick={() => fetchUsers(1)}
                  className={`py-2 px-4 rounded ${
                    yearFilter === 1 ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  1st Year
                </button>
                <button
                  onClick={() => fetchUsers(2)}
                  className={`py-2 px-4 rounded ${
                    yearFilter === 2 ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  2nd Year
                </button>
              </div>
            </div>

            <div className="mt-[20px]">
              <h1 className="text-orange-600 text-[22px] mb-[10px]">Section</h1>
              <div className="flex flex-wrap gap-[10px]">
                <button
                  onClick={() => fetchUsersBySection("A")}
                  className={`py-2 px-4 rounded ${
                    sectionFilter === "A" ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  Section A
                </button>
                <button
                  onClick={() => fetchUsersBySection("B")}
                  className={`py-2 px-4 rounded ${
                    sectionFilter === "B" ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  Section B
                </button>
                <button
                  onClick={() => fetchUsersBySection("C")}
                  className={`py-2 px-4 rounded ${
                    sectionFilter === "C" ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  Section C
                </button>
                <button
                  onClick={() => fetchUsersBySection("D")}
                  className={`py-2 px-4 rounded ${
                    sectionFilter === "D" ? "bg-orange-500" : "bg-blue-500"
                  } text-white w-[100px]`}
                >
                  Section D
                </button>
              </div>
            </div>
          </div>

          {/* Profiles Display */}
          <div className="w-[75%] flex pr-[10px] flex-wrap gap-[20px]">
            {isLoading ? (
              <p className="text-gray-500">Fetching Details...</p>
            ) : isDataFetched && filteredUsers.length === 0 ? (
              <p className="text-gray-500">No students available.</p>
            ) : (
              filteredUsers.map((usr) => (
                <div
                  key={usr._id}
                  className="card bg-gray-800 rounded-lg shadow-lg p-[20px] w-[200px] flex flex-col items-center"
                >
                  <div className="w-[100px] h-[100px] bg-blue-500 rounded-full mb-[15px]"></div>
                  <span className="block text-white text-center text-[20px]">
                    {usr.userName}
                  </span>
                  <p className="job font-light text-gray-400 text-[16px] text-center ">
                    {usr.phoneNumber}
                  </p>
                  <button
                    onClick={() => changePage(usr._id)}
                    className="mt-[20px] py-[6px] px-[20px] rounded-lg bg-blue-700 text-white"
                  >
                    See Profile
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
