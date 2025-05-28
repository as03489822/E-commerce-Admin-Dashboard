"use client";
import React from 'react'
import logo from '../../public/Group 302.png'
import Image from 'next/image'
import dashboardIcon from '../../public/dashboard.png';
import analysis from '../../public/analysis.png';
import products from '../../public/products.png';
import logout from '../../public/logout.png'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const LeftSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const list = [
    {
      text:"Dashboard",
      icon: dashboardIcon,
      path:"/dashboard"
    },
    {
      text:"Revenue Analysis",
      icon: analysis,
      path:"/revenue-analysis"
    },
    {
      text:"Porducts",
      icon: products,
      path:"/products"
    },
    {
      text:"Add Product",
      icon: products,
      path:"/add-product"
    }
  ];

  const handleNavigation = (path:string)=>{
    router.push(path);
  }


  return (
    <div className='h-screen bg-[#2E2E48] w-[20%] flex  flex-col gap-5 py-5 px-5 '>
      <h1 className='flex  font-bold  text-white'>
        <Image src={logo} alt='logo' className=' w-[30px] h-[30px] leading-[0px]'/>
        E-COMMERCE
      </h1>
      <ul className='flex-1 flex flex-col gap-1' >
        {list.map((el ,idx)=>
        <li onClick={()=> handleNavigation(el.path)} key={idx} className={`${pathName === el.path && 'bg-[#475BE8]'} flex items-center gap-3 hover:bg-[#475BE8] w-full px-3 py-[10px] rounded-md font-semibold text-[#E1E1E1] hover:text-white cursor-pointer`}>
          <Image src={el.icon} alt='logo' className='opacity-[90%] hover:optional-[100%] w-[15px] h-[15px] leading-[0px]'/>
          {el.text}
        </li>
        )}
      </ul>
      <button className='flex text-white items-center gap-3 hover:bg-[#475BE8] rounded-md px-3 py-[10px]'>
          <Image src={logout} alt='logo' className='opacity-[90%] hover:optional-[100%] w-[15px] h-[15px] leading-[0px]'/>
        LOGOUT
        </button>
    </div>
  )
}

export default LeftSidebar