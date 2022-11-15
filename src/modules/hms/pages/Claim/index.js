import useClaims from "../../hooks/useClaims";
import {Link} from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import {useState} from "react";
import {BiGridAlt} from "react-icons/bi";
import {BsList} from "react-icons/bs";

export default function Claim(){


    const [search,setSearch]=useState('')

    const {data:claims,isLoading,isError}=useClaims()


    const ConditionalRenderer=()=>{
        if(isLoading){
            return (
                <LoadingComponent/>
            )
        }


        if(isError){
            return (
                <ErrorComponent/>
            )
        }
        return claims && (
            <div className={'grid sm:grid-cols-2 xl:grid-cols-3 gap-10'}>
                {
                    claims.filter(item=>{
                        return search==='' ? item : item.Patient_Name.toLocaleLowerCase().includes(search.toLowerCase())
                    }).map((claim,i)=>(
                        <Link to={`/claim/${claim.Claim_No}/details`} key={i}>
                            <div className="flex flex-col bg-white hover:shadow-lg" >
                                <div className="w-full p-3 bg-gray-50" >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-[60px] h-[60px] bg-zinc-100"></div>
                                        <div className="flex-1">
                                            <span className="block text-sm tracking-wide">{claim.Patient_Name}</span>
                                            <span className="block text-xs tracking-wide mt-1">{claim.Patient_DOB_DDMMYYYY}</span>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                    <span className="block text-xs tracking-wide mt-1">
                                        <span>Episode ID : </span>
                                        <span>{claim.Episode_ID}</span>
                                    </span>

                                        <span className="block text-xs tracking-wide mt-1">
                                        <span>Claim No.</span>
                                        <span>{claim.Claim_No}</span>
                                    </span>
                                    </div>
                                </div>
                                <div className="p-3 flex items-center space-x-5">
                                    <div className="flex items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 p-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        <span className="block text-xs">{claim.Account_Date}</span>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <div className={`w-3 h-3 ${claim.Status==='Released' ? 'bg-green-600' : claim.Status==='Cancelled' ? 'bg-orange-600' : 'bg-yellow-600'} rounded-full`}></div>
                                        <span className={`block text-xs ${claim.Status==='Released' ? 'text-green-600' : claim.Status==='Cancelled' ? 'text-orange-600' : 'text-yellow-600'}`}>{claim.Status}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }


    return (
        <div className='min-h-screen font-ny bg-white'>
            <div className="container mx-auto py-20 px-5">

                <span className="block text-xl tracking-widest uppercase">Claim Listings</span>

                <div className="mt-10 flex items-center justify-between">
                    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <div className="w-full bg-gray-50 flex items-center">
                            <div className="w-12 h-12 flex items-center justify-center text-zinc-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={val=>setSearch(val?.target?.value)}
                                placeholder={'Search Claim'}
                                className="flex-1 pr-3 bg-transparent focus:outline-none text-xs"
                            />

                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-zinc-500">
                        <div className="w-10 h-10 cursor-pointer bg-zinc-200 flex items-center justify-center">
                            <BiGridAlt size={20}/>
                        </div>
                        <div className="w-10 h-10 cursor-pointer bg-zinc-200 flex items-center justify-center">
                            <BsList size={20}/>
                        </div>
                    </div>
                </div>

               <div className="mt-10">
                   <div>
                       <ConditionalRenderer/>
                   </div>
               </div>

            </div>
        </div>
    )
}