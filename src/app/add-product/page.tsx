"use client"
import LeftSidebar from '@/components/LeftSidebar';
import React, { useState } from 'react';
import Image from 'next/image';
import defaultProduct from '../../../public/defaultProduct.png';
import type { StaticImageData } from 'next/image';


const AddProduct = () => {
  const [previewUrl , setPreviewUrl] = useState<StaticImageData | string>(defaultProduct)  
    const [formData, setFormData] = useState({
    productName: "",
    productDescription:"",
    productPrice: "",
    productQuantity:"",
    productCategory:"",
    productSubCategory:"",
    productImage:"",
    productTag:"", 
    rating:""
  });

  const categroies = ["Beauty And Skincare" , "Kitchen" , 'Accessories' , "Laptop And Mobile" , "Home Decore"]

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target;
  console.log(target)

  if (target instanceof HTMLInputElement && target.type === "file") {
    const { name, files } = target;

    if (files && files.length > 0) {
      const file = files[0];
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };

      reader.readAsDataURL(file);

      setFormData({ ...formData, [name]: file });
    }
  } else {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }
};

    return (
    <div className='flex w-full text-white'>
        <LeftSidebar />
        <div className='bg-[#383854] w-full h-screen pt-10 flex flex-col items-center gap-5'>
            <h1 className='w-[85%] text-[22px] font-bold'>Add Product</h1>
            {/* <div className={`flex flex-col items-center lg:ml-10 w-full lg:w-[1000px] h-screen`}> */}
          <form
            // onSubmit={handleSubmit}
            className={` mt-4 shadow-lg rounded-md p-6 bg-[#2E2E48] w-[85%] `}
          >  
            {/* form  fields */}
            <div className="flex flex-col lg:flex-row gap-5 mt-3 ">
              <div className="w-[30%] ">
                <label htmlFor="productName" className="block text-sm font-medium">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 rounded-md focus:outline-none  bg-[#383854] focus:bg-[#525283]`}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="w-full ">
                <label htmlFor="productDescription" className="block text-sm font-medium">
                  Description
                </label>
                <input
                  name="productDescription"
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2  rounded-md focus:outline-none bg-[#383854] focus:bg-[#525283]`}
                  placeholder="Enter product description"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-3">
              <div className="w-full">
                <label htmlFor="productPrice" className="block text-sm font-medium">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 rounded-md focus:outline-none bg-[#383854] focus:bg-[#525283]  `}
                  placeholder="Enter product price"
                  step="1"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="productQuantity" className="block text-sm font-medium">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  value={formData.productQuantity}
                  onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 rounded-md focus:outline-none  bg-[#383854] focus:bg-[#525283]`}
                  placeholder="Enter product quantity"
                  required
                />
              </div>
                            <div className="w-full ">
                <label htmlFor="productCategory" className="block text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="productCategory"
                  id="productCategory"
                //   placeholder="Enter product Category"
                //   value={formData.productCategory}
                //   onChange={handleChange}
                  className={`w-full mt-2 px-4 py-2 rounded-md focus:outline-none bg-[#383854] focus:bg-[#525283]`}
                  required
                >
                  <option value="">Select category</option>
                  {categroies?.map((el , idx) =>
                    <option value={el.split(" ").join("")} key={idx} >{el}</option>
                )}
                </select>
              </div>

            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-3 items-end">
              <div className="w-[500px]">
                <label htmlFor="productImage" className="block text-sm font-medium">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex justify-between items-center">
                  <label
                    htmlFor="productImage"
                    className={`cursor-pointer flex items-center px-2 rounded-md  h-[40px]  focus:outline-none  bg-[#383854] focus:bg-[#525283]`}
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  <Image className="h-[120px] w-[120px] rounded-full "   width={120}
                    height={120} src={previewUrl} alt="user" />
                </div>
              </div>

            <div className="w-full flex justify-end mt-1">
              <button
                type="submit"
                className={`h-[40px] px-4 py-1 rounded border border-gray-300`}
              >
                Register Product
              </button>
            </div>
            </div>


          </form>
        </div>
        </div>
    // </div>
  )
}

export default AddProduct