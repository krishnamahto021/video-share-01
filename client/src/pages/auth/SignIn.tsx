import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signInUser } from "../../redux/reducers/auth/authReducer";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <Layout>
      <div className="flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Weclome back
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-opacity-95 transition duration-300 disabled:bg-gray-400"
            >
              Sign In
            </button>

            <div className="text-center mt-4 flex justify-center gap-2">
              <span className="text-sm text-gray-600">
                Create your account for free
              </span>{" "}
              <Link
                to="/"
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
