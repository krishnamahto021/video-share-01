import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import { FaPencilAlt, FaSave } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const handleEditClick = () => {
    setEdit(true);
  };
  const handleSaveClick = async () => {};
  return (
    <div className="flex w-full gap-2 pr-2">
      <Sidebar />
      <main className="flex-1 p-4 mt-3 ml-0 md:ml-64">
        <section className="p-4 bg-white shadow-lg rounded-lg ">
          <h1 className="text-center font-semibold text-xl text-gray-700 mb-5">
            Personal Details
          </h1>
          <div className="container flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="font-medium text-gray-600">
                  Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={"name"}
                    className={`w-full p-3 focus:outline-none border rounded-md ${
                      edit ? "border-blue-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 bg-gray-100`}
                    disabled={!edit}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() =>
                      edit ? handleSaveClick() : handleEditClick()
                    }
                  >
                    {edit ? (
                      <FaSave className="text-green-600 hover:text-green-800 duration-200" />
                    ) : (
                      <FaPencilAlt className="text-gray-600 hover:text-gray-800 duration-200" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-600">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={"email"}
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-7">
            <button
              type="button"
              className="bg-red-500 rounded-md p-3 text-white text-lg hover:bg-red-600 duration-300 w-1/2"
            >
              Log out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
