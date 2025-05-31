"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { makeApiRequest } from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { toast } from "react-toastify";
export default function LogIn() {
  const dispatch = useDispatch();
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
    const url = '/api/login'
    const method = 'POST';
    const response = await makeApiRequest({url , method ,data:form});
    if(response.status === 200 ){ 
      const token = response.data.token;
      dispatch(setToken(token));
      toast.success(response.data.message);
      router.push('/dashboard');
    }else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen bg-[#2E2E48]  px-4 text-white`}>
        <div className="w-full max-w-sm p-6 rounded-lg shadow-lg relative bg-[#383854]" >
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
                    placeholder="email"
                    autoComplete="off"
                    name="email"
                    className="w-full mt-1 px-4 py-2 bg-[#2E2E48] hover:bg-[#525283] focus:bg-[#525283] rounded-md focus:outline-none "
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
                    autoComplete="new-password"
                    placeholder="password"
                    onChange={handleOnChange}
                    className="relative w-full mt-1 px-4 py-2 bg-[#2E2E48] hover:bg-[#525283] focus:bg-[#525283] rounded-md focus:outline-none "
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
                  className="w-full cursor-pointer  bg-[#2E2E48] hover:bg-[#525283]  py-2 rounded-md font-semibold transition "
                >
                  Login
                </button>
          </form>
        </div>
      </div>
    </>
  );
}
