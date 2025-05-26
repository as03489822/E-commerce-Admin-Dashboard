"use client"
import LeftSidebar from '@/components/LeftSidebar'
import React from 'react';


const Products = () => {

    return (
    <div className='flex w-full text-white'>
        <LeftSidebar />
        <div className='bg-[#383854] w-full h-screen pt-10 flex flex-col items-center gap-5'>
            <h1 className='w-[85%] text-[22px] font-bold'>Products</h1>
        </div>
    </div>
  )
}

export default Products