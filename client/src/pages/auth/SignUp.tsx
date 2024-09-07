import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // data -> data (this data will have all the details)
    e.preventDefault();
    console.log("hi");

    const data = await axios.post("http://localhost:8000/api/v1/auth/sign-up", {
      email,
      password,
    });
    console.log(data);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Join Us Today
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-opacity-95 transition duration-300 disabled:bg-gray-400"
            >
              Sign Up
            </button>

            <div className="text-center mt-4 flex justify-center gap-2">
              <span className="text-sm text-gray-600">
                Already have an account?
              </span>{" "}
              <Link
                to="/sign-in"
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
