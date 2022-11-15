import {useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {sendBiometricEnrollment} from "../../services";
import toast from "react-hot-toast";
import ToastComponent from "../../components/ToastComponent";
import {useStatusContext} from "../../providers/StatusProvider";
import UseShared from "../../hooks/useShared";

export default function BiometricEnrollment(){


    const {patient,fingers}=useStatusContext()



    const findFing=()=>{
        let m=0
        fingers.forEach(f=>{
            if(f.bio===null){
                m+=1
            }
        })
        return m
    }

    const mutation=useMutation(values=>axios.post(`/SGIFPCapture`).then(res=>res.data),{
        onSuccess:async(d,variables)=>{
            updateFingers(variables.id,d)
        },
        onError:async(error)=>{
            console.log(error)
        }
    })

    const getBio=(d)=>{
        mutation.mutate(d)
    }

    const updateFingers=(id,d)=>{
        fingers.map((f)=>{
            if(f.id===id){
                f.bio=d;
            }
            return f
        })
    }

    const {searchPatient}=UseShared({
        bio_code:patient.bio_code,
        member_number:patient.member_number,
        suffix:patient.suffix,
    })

    const bioMutation=useMutation(values=>sendBiometricEnrollment(values).then(res=>res),{
        onSuccess:async(data)=>{
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={data}
                        type={'success'}
                    />
                )
            })

            searchPatient()

        },
        onError:(e)=>{
            console.log(e)
        }
    })

    const _submit=()=>{
        if(findFing()>0){
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={'you need to fill all fingers'}
                        type={'warning'}
                    />
                )
            })

            return
        }
        bioMutation.mutate({
            bio_code:patient.bio_code,
            member_number:patient.member_number,
            suffix:patient.suffix,
            fingers
        })
    }


    return (
        <div className='mt-20'>
            {/*<span className="block text-3xl uppercase tracking-[2px] font-bold">BiometricEnrollment Registration</span>*/}

            <span className="block text-xs uppercase tracking-[3px]">Biometric Enrollment</span>
            <div className="mt-10">

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-5">
                    {
                        fingers.map((f,i)=>(
                            <div key={i} onClick={()=>getBio(f)} className="h-20 bg-yellow-200 rounded overflow-hidden">
                                <span className="block text-[10px] tracking-[2px] font-bold uppercase p-2">{f.name}</span>
                                {
                                    f.bio && (
                                        <img
                                            src={`data:image/bmp;base64,${f.bio.BMPBase64}`}
                                            alt=""
                                            className='w-full h-full object-cover'
                                        />
                                    )
                                }
                            </div>
                        )).reverse()
                    }
                </div>

            </div>
            <div className="mt-10">
                <button
                    onClick={_submit}
                    className="px-7 py-4 bg-purple-600 text-white rounded focus:outline-none uppercase text-[9px] font-semibold tracking-wide"
                >
                    {
                        bioMutation.isLoading ? '...Saving Biometrics' : 'Save Biometrics'
                    }
                </button>
            </div>
        </div>
    )
}