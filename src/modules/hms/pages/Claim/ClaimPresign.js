import {useMutation} from "@tanstack/react-query";
import {sendClaimPresignRequest, sendRealtimePresign} from "../../services";
import InputComponent from "../../components/InputComponent";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ToastComponent from "../../components/ToastComponent";
import LookupComponent from "./LookupComponent";


export default function ClaimPresign({cardHolder,claims,claim}){


    const [finger,setFinger]=useState({
        bio:null,
    })



    const [auth,setAuth]=useState('')

    const m=useMutation(values=>axios.post(`/SGIFPCapture`).then(res=>res.data),{
        onSuccess:async(d,variables)=>{
            console.log(d)
            setFinger(prev=>({...prev,bio:d}))
        },
        onError:async(error)=>{
            console.log(error)
        }
    })

    const _getFinger=()=>{
        m.mutate({})
    }


    const mutation=useMutation(values=>sendClaimPresignRequest(values).then(res=>res),{
        onSuccess:async(data)=>{
            setAuth(data)
        },
        onError:(e)=>{
            console.log(e)
        }
    })

    const bioMutation=useMutation(values=>sendRealtimePresign(values).then(res=>res),{
        onSuccess:async(data)=>{
            console.log(data)
        },
        onError:(e)=>{
            console.log(e)
        }
    })

    const _submit=()=>{

        if(finger.bio===null){
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={'Sorry biometric are not loaded!!!'}
                        type={'warning'}
                    />
                )
            })
            return
        }


        mutation.mutate({
            cardHolder,
            finger:finger?.bio?.TemplateBase64
        })
    }

    const _bioSubmit=()=>{
        bioMutation.mutate({
            cardHolder,
            claim,
            auth,
            claims
        })
    }


    return (
        <div className='mt-12'>

            <div>
                <span className="block text-xl uppercase tracking-[4px]">Realtime Presign Claim</span>
            </div>


            <div className="mt-10">
                <div onClick={_getFinger} className="w-1/3 cursor-pointer h-32 bg-yellow-100 rounded">
                    <span className="block text-[10px] tracking-[2px] font-bold uppercase p-2">Select Finger</span>
                    {
                        finger?.bio && (
                            <img
                                src={`data:image/bmp;base64,${finger?.bio?.BMPBase64}`}
                                alt=""
                                className='w-full h-full object-cover'
                            />
                        )
                    }
                </div>
            </div>

            <div className="mt-10 w-1/2 grid grid-cols-2 gap-5 mt-12">
               <div className="col-span-2">
                   <InputComponent
                       title={'Authorization Key'}
                       value={auth}
                       readOnly
                   />
               </div>
                <div>
                    <InputComponent
                        title={'Suffix'}
                        value={cardHolder.suffix}
                        readOnly
                    />
                </div>

                <div>
                    <InputComponent
                        title={'Bio Code'}
                        value={cardHolder.bio_code}
                        readOnly
                    />
                </div>
            </div>

            <div className="mt-12 flex items-center space-x-4">

                <button onClick={_submit} className="focus:outline-none text-xs px-7 py-4 rounded bg-fuchsia-600 text-white">
                    {
                        mutation.isLoading ? '. . . Getting Authorization Key' : 'Get Authorization Key'
                    }
                </button>

                <LookupComponent
                    suffix={cardHolder.suffix}
                    member_number={cardHolder.member_number}
                    bio_code={cardHolder.bio_code}
                />


                {
                    auth && (
                        <button onClick={_bioSubmit} className="focus:outline-none text-xs px-7 py-4 rounded bg-indigo-600 text-white">
                            {
                                bioMutation.isLoading ? '. . . Sending Realtime Presign Request' : 'Send Realtime Presign Request'
                            }
                        </button>
                    )
                }


            </div>
        </div>
    )
}