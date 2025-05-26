"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    router.push('/dashboard');
  };

  return (
    <>

      <div className={`flex flex-col items-center justify-center min-h-screen bg-[#F0FFF8] px-4 text-black`}>
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg relative">
          <h1 className="flex justify-center mb-6  text-[30px] font-bold">
            login
          </h1>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    onChange={handleOnChange}
                    required

                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleOnChange}
                    className="relative w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                    onClick={passwordVisibility}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#F0FFF8] py-2 rounded-md font-semibold transition "
                >
                  Login
                </button>
          </form>
        </div>
      </div>
    </>
  );
}
