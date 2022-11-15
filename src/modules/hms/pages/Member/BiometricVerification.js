import {useState} from "react";
import InputComponent from "../../components/InputComponent";
import {useStatusContext} from "../../providers/StatusProvider";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import ToastComponent from "../../components/ToastComponent";
import {sendBiometricVerification} from "../../services";

export default function BiometricVerification(){



    const {fingers,patient}=useStatusContext()


    const getName=(val)=>{
        let n=null
        fingers.forEach(f=>{
            if(val?.toUpperCase()===f?.code?.toUpperCase()){
                n=f?.name
            }
        })
        return n
    }

    const [finger,setFinger]=useState({
        bio:null,
    })


    const bioMutation=useMutation(values=>sendBiometricVerification(values).then(res=>res),{
        onSuccess:async(data)=>{
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={data}
                        type={'success'}
                    />
                )
            })
        },
        onError:(e)=>{
            console.log(e)
        }
    })


    const _submit=()=>{
        bioMutation.mutate({
            bio_code:patient.bio_code,
            member_number:patient.member_number,
            suffix:patient.suffix,
            finger
        })
    }




    const mutation=useMutation(values=>axios.post(`/SGIFPCapture`).then(res=>res.data),{
        onSuccess:async(d,variables)=>{
            setFinger(prev=>({...prev,bio:d}))
        },
        onError:async(error)=>{
            console.log(error)
        }
    })


    const _getFinger=()=>{
        mutation.mutate({})
    }





    return (
        <div>
            <div className="mt-20">
                <span className="block text-xs uppercase tracking-[3px]">Biometric Verification</span>
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

                <div className="mt-10">
                    <button onClick={_submit} className="focus:outline-none text-white px-5 py-4 text-xs rounded bg-purple-600">
                        Verify Biometrics
                    </button>
                </div>
            </div>
        </div>
    )
}