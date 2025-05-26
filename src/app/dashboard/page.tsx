"use client"
import LeftSidebar from '@/components/LeftSidebar'
import React from 'react';
import CompanyGraph from '@/components/CompanyGraph';
import TotalRevenueChart from '@/components/TotalRevenueChart';


const Dashboard = () => {
const salesArr = [
    {
        name : "Todays Sales",
        total : "$20.4k",
        details : "We have sold 123 items",
        color: "#475BE8"
    },
    {
        name : "Todays Revenue",
        total : "$20.4k",
        details : "Availabale to payout",
        color: "#4CE13F"
    },
    {
        name : "In Escrow",
        total : "$20.4k",
        details : "Availabale to payout",
        color: "#F29A2E"
    }
]
    return (
    <div className='flex w-full text-white'>
        <LeftSidebar />
        <div className='bg-[#383854] w-full h-screen pt-10 flex flex-col items-center gap-5'>
            <h1 className='w-[85%] text-[22px] font-bold'>Dashboard</h1>
            <div className=' w-[85%]'>
                {/* total sales  total revenue  pending order*/}
                <div className='flex gap-5'>
                    {salesArr.map((el , idx) => 
                    <div key={idx} className='flex justify-between px-3 rounded-md items-center w-[33%] bg-[#2E2E48] h-[125px] '>
                        <div className='flex flex-col gap-2'>  
                            <h3 className='text-[14px] font-semibold text-[#F3F3F3]'>{el.name}</h3>
                            <h2 className='text-[24px] font-semibold text-[#F3F3F3]'>{el.total}</h2>
                            <h3 className='text-[14px] font-semibold text-[#F3F3F3]'>{el.details}</h3>
                        </div>
                        <div className='h-[80px] w-[80px]'> 
                        <CompanyGraph
                            registeredCompanies={20000}
                            totalCompanies={100000}
                            color={el.color}
                    />
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className='w-[85%] flex gap-5'>
                <div className='w-[100%]'>
                    <TotalRevenueChart />
                </div>
                <div className='bg-[#2E2E48] w-[47%] rounded-md p-4'>
                    <h2 className='text-[18px] font-semibold'>Revenue By Category</h2>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard