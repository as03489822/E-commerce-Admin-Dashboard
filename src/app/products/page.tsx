"use client"
import GenericTable from '@/components/GenericTabel';
import LeftSidebar from '@/components/LeftSidebar';
import React, { useEffect, useState } from 'react';
// import stock from '../../../public/stock.json';
import { useRouter } from 'next/navigation';
import {useAuth} from '@/components/globleAuthentication'
import { makeApiRequest } from '@/utils/axios';
import { toast } from 'react-toastify';

interface Products {
        _id: string;
        productName:string;
        productDescription:string;
        productPrice:number;
        productCategory:string;
        productQuantity:number;
        image: {
          productImageUrl: string;
          productImagePublicId: string
        }
    }

    interface ProductData {
    headers: string[];
    data: Products[];
}

const Products = () => {
    const token = useAuth();
    const router = useRouter();
    const [productData, setProductData] = useState<ProductData>({
        headers: ['SNo' , 'productName' , 'productDescription' , 'productPrice' , 'productCategory' , 'productQuantity' , "image"],
        data:[]
    });

    const [showRows, setRowsToShow] = useState(5);
    const [filter, setFilter] = useState<Products[] | null>(null);
    const [searchQuery , setSearchQuery] = useState('');    
    const [initialCount , setInitialCount]  = useState(0);
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])
    const getProducts = async() => {
        const url = "/api/product";
        const response = await makeApiRequest({url});
        console.log(response)
        if (response.status === 200){
            setProductData((preData)=>{
                return {
                    ...preData,
                    data :response.data
                }
            })
        }else{
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        getProducts()
    } ,[])

    const handleEdit = (item:string) => {
      console.log(item)
    };

    const handleDelete = (item:string) => {
        console.log(item)
    };

     const handleShowChange = (e  : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(e.target.value, 10);
        console.log(selectedValue)
        setRowsToShow(selectedValue);
    }


    const handleSearchQuery = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    }
        const  filterData = productData.data.filter((product) => {
            return (
                product?.productName?.toLowerCase().includes(searchQuery)
            )
        })

     const showPrevious = () =>{
        if(initialCount - showRows >= 0)
            setInitialCount(initialCount -showRows)
     }

    const showNext = () =>{
        console.log(initialCount + showRows)
        if(initialCount + showRows < filterData.length)
            setInitialCount(initialCount + showRows)
    }

    const sorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if(value == '0') return setFilter(null);
        const sorted:Products[] = [...filterData].sort((a, b) => {
            const priceA = Number(a.productPrice);
            const priceB = Number(b.productPrice);
            return value === 'ascend' ? priceA - priceB : priceB - priceA ;
        });
        setFilter(sorted);
    };
    const baseData = filter || filterData;
    const displayData = baseData?.slice(initialCount, initialCount+showRows);

    if(isClient && !token) return null;
    return (
    <div className='flex w-full text-white'>
        <LeftSidebar />
        <div className='bg-[#383854] w-full h-screen pt-10 flex flex-col items-center gap-5'>
            <h1 className='w-[85%] text-[22px] font-bold'>Products</h1>

            <div className="info flex flex-col lg:flex-row justify-between items-center gap-2 w-[85%]">
                <div className='flex flex-col lg:flex-row gap-2 items-center w-full lg:w-[auto]'>
                    <div className={`flex items-center gap-2`}>
                        <span>Show :</span>
                        <select
                            className={`rounded-md px-4 py-1 focus:outline-none bg-[#2E2E48] focus:bg-[#525283]`}
                            onChange={handleShowChange}
                            value={showRows}
                        >
                            <option value={1}>01</option>
                            <option value={2}>02</option>
                            <option value={3}>03</option>
                            <option value={4}>04</option>
                            <option value={5}>05</option>
                            <option value={6}>06</option>
                            <option value={7}>07</option>
                            <option value={8}>08</option>
                            <option value={9}>09</option>
                        </select>
                    </div>
                    <div className={`flex items-center gap-2`}>

                        <span >Search :</span>
                        <input
                            type="text"
                            placeholder="search by name"
                            className={`rounded-md px-4 py-1 focus:outline-none bg-[#2E2E48] focus:bg-[#525283]`}
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <select
                        className={`rounded-md px-4 py-1 focus:outline-none bg-[#2E2E48] focus:bg-[#525283]`}
                        onChange={sorting}
                    >
                        <option value={0} >Filter By Price</option>
                        <option value='ascend'>low to high</option>
                        <option value='descend'>high to low</option>
                    </select>
                    <button onClick={()=> router.push('add-product')} className={`px-4 py-1 rounded bg-[#2E2E48] hover:bg-[#525283] cursor-pointer`}>
                        Add Product
                    </button>
                </div>
            </div>

            <div className='w-[85%] overflow-x-auto'>
                <GenericTable 
                headers={productData.headers}
                data={displayData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                />
            </div>


            <div className="pages flex justify-center gap-3 mt-4">
                <button onClick={showPrevious} className={`px-4 ${ initialCount - showRows >= 0?'block':'hidden'} py-1 rounded cursor-pointer  bg-[#2E2E48] hover:bg-[#525283]`}>
                    Previous
                </button>
                <button className={`px-4 py-1 rounded   bg-[#525283]`}>
                {Math.ceil((initialCount + showRows)/ (showRows))} of {Math.ceil((filterData.length)/showRows)}
                </button>
                <button onClick={showNext} className={`px-4 py-1 ${initialCount + showRows < filterData.length?'block': 'hidden'}   rounded  cursor-pointer  bg-[#2E2E48] hover:bg-[#525283]`}>
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default Products