import InputComponent from "../../components/InputComponent";
import {useStatusContext} from "../../providers/StatusProvider";
import BiometricEnrollment from "./BiometricEnrollment";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastComponent from "../../components/ToastComponent";
import http from "../../../../http";
import BiometricVerification from "./BiometricVerification";
import {useNavigate} from "react-router-dom";
import useMedical from "../../hooks/useMedical";
import useRegisteredPatient from "../../hooks/useRegisteredPatient";

export default function Registration(){
    const {patient,setPatient,setStatus,status}=useStatusContext()
    const {data:pt,isError,refetch}=useRegisteredPatient({
        suffix: patient.suffix,
        member_number:patient?.MemberShipNumber
    })


    const {data:medicals}=useMedical(patient.bio_code)


    const navigate=useNavigate()


    const formatGender=(val)=>{
        if(val.toLowerCase()==='f'){
            return 'Female'
        }else{
            return 'Male'
        }
    }

    const formatNationalID=(val)=>{
        if(val.length>0){
            let m='082178428C47'
            const p=val?.slice(0,2)+'-'+val?.slice(2,val?.length-3)+'-'+val?.slice(val?.length-3)
            console.log(p)
            return p
        }
        return ''

    }


    const formatDOB=(val)=>{
        if(val.length>0){
            return val.slice(0,4)+'-'+val.slice(4,6)+'-'+val.slice(6,8)
        }
        return ''
    }



    const mutation=useMutation(values=>{
        return http.post('/RegistrationCard',values).then(res=>res.data)
    },{
        onSuccess:async(data)=>{


            refetch()
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={'patient has been successfully saved'}
                        type={'success'}
                    />
                )
            })
        },
        onError:(error)=>{
            console.log(error)
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={error.toString()}
                        type={'error'}
                    />
                )
            })
        }
    })


    const _savePatient=()=>{

        if(pt.length > 0){
            toast.custom(()=>{
                return (
                    <ToastComponent
                        description={'the patient with this medical aid number is saved in our systems'}
                        type={'warning'}
                    />
                )
            })

            return
        }

        mutation.mutate({
            Surname: patient?.Surname,
            Name: patient?.FirstName,
            Date_of_Birth: formatDOB(patient.DateOfBirth),
            // Country_Region_Code: "263",
            National_ID: patient?.NationalIDNumber,
            Title: patient?.Title,
            Initials:patient.Initials,
            Gender: formatGender(patient?.Gender),
            Religion: "Christian",
            Language: patient?.Language,
            Patient_Suffix:patient.suffix,
            Address: patient?.Address[0]?.Line1.toString(),
            Phone_No: patient?.MobilePrimary,
            Business_Phone_No: patient?.Work,
            Medical_Aid_Member_No: patient?.MemberShipNumber,
            Medical_Aid_No:medicals.No
        })


    }


    const upMutation=useMutation(values=>http.post('/').then(res=>res.data),{
        onSuccess:async(data)=>{},
        onError:(e)=>{}
    })


    const _updatePatient=()=>{}

    return (
        <div>
            {
                medicals ? (
                    <div className="min-h-screen">
                        <div className='p-20'>
                            <div>
                                <span className="block text-xl uppercase tracking-[4px]">Medical Aid Member Registration</span>
                            </div>

                            <div className="w-full lg:w-3/4 xl:1/2 mt-14">
                                <div className="">
                                    <div>
                                        <span className="block text-xs uppercase tracking-[3px]">Details</span>
                                        <div className="mt-10">
                                            <div className="mt-10 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">

                                                <div>
                                                    <InputComponent
                                                        title={'First Name'}
                                                        value={patient.FirstName}
                                                        readOnly
                                                    />
                                                </div>

                                                <div>
                                                    <InputComponent
                                                        title={'Last Name'}
                                                        value={patient.Surname}
                                                        readOnly
                                                    />
                                                </div>


                                                <div>
                                                    <InputComponent
                                                        title={'Initials'}
                                                        value={patient.Initials}
                                                        readOnly
                                                    />
                                                </div>


                                                <div>
                                                    <InputComponent
                                                        title={'Title'}
                                                        value={patient.Title}
                                                        readOnly
                                                    />
                                                </div>

                                                <div>
                                                    <InputComponent
                                                        title={'Gender'}
                                                        value={patient.Gender}
                                                        readOnly
                                                    />
                                                </div>


                                                <div>
                                                    <InputComponent
                                                        title={'National Id Number'}
                                                        value={patient.NationalIDNumber}
                                                        readOnly
                                                    />
                                                </div>



                                                <div>
                                                    <InputComponent
                                                        title={'DOB'}
                                                        value={patient.DateOfBirth}
                                                        readOnly
                                                    />
                                                </div>


                                                <div>
                                                    <InputComponent
                                                        title={'Language'}
                                                        value={patient.Language}
                                                        readOnly
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20">
                                        <span className="block text-xs uppercase tracking-[3px]">Member Contacts</span>

                                        <div className="mt-10 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                            <div>
                                                <InputComponent
                                                    title={'Phone Number'}
                                                    value={patient.MobilePrimary}
                                                    readOnly
                                                />
                                            </div>

                                            <div>
                                                <InputComponent
                                                    title={'Work'}
                                                    value={patient.Work}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20">
                                <span className="block text-xs uppercase tracking-[3px]">
                                    Member Address
                                </span>
                                        <div className="mt-10 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">

                                            <div>
                                                <InputComponent
                                                    title={'Address'}
                                                    value={patient?.Address[0]?.Line1}
                                                    readOnly
                                                />
                                            </div>


                                            <div>
                                                <InputComponent
                                                    title={'City'}
                                                    value={patient?.Address[0]?.Line2}
                                                    readOnly
                                                />
                                            </div>


                                            <div>
                                                <InputComponent
                                                    title={'Country'}
                                                    value={patient?.Address[0]?.Country}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-20">
                                <span className="block text-xs uppercase tracking-[3px]">
                                    Member Status
                                </span>
                                        <div className="mt-10 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">

                                            <div>
                                                <InputComponent
                                                    title={'Status'}
                                                    value={patient?.Status==='A'  ? 'Active' : 'Not Active'}
                                                    readOnly
                                                />
                                            </div>


                                            <div>
                                                <InputComponent
                                                    title={'Biometric'}
                                                    value={patient?.BiometricEnrolmentStatus==='N'? 'Not Registered' : 'Registered'}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-20">
                                <span className="block text-xs uppercase tracking-[3px]">
                                    Medical Aid Information
                                </span>
                                        <div className="mt-10 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">

                                            <div>
                                                <InputComponent
                                                    title={'Medical Aid'}
                                                    value={patient.bio_code}
                                                    readOnly
                                                />
                                            </div>

                                            <div>
                                                <InputComponent
                                                    title={'Member Number'}
                                                    value={patient.MemberShipNumber}
                                                    readOnly
                                                />
                                                {
                                                    patient.member_number!==patient.MemberShipNumber && (
                                                        <span className="block mt-2 text-xs text-red-600">No has been changed from {patient.member_number} to {patient.MemberShipNumber}</span>
                                                    )
                                                }

                                            </div>

                                            <div>
                                                <InputComponent
                                                    title={'Suffix'}
                                                    value={patient.suffix}
                                                    readOnly
                                                />
                                            </div>



                                        </div>
                                    </div>

                                    <div className="mt-20 flex items-center space-x-3">
                                        {
                                            status==='not_found' ? (
                                                <button onClick={()=>mutation.isLoading ? null : _savePatient()} className="px-5 text-xs h-12 rounded bg-purple-600 text-white">
                                                    {
                                                        mutation.isLoading ? '... Saving Patient' : 'Save Patient'
                                                    }
                                                </button>
                                            ) : (
                                                <button onClick={()=>upMutation.isLoading ? null : _updatePatient()} className="px-5 text-xs h-12 rounded bg-red-600 text-white">
                                                    {
                                                        upMutation.isLoading ? '... Updating Patient' : 'Update Patient'
                                                    }
                                                </button>
                                            )
                                        }

                                        <button onClick={()=>{
                                            setPatient(null)
                                            setStatus('default')
                                            navigate(-1)

                                        }} className="px-5 text-xs h-12 rounded bg-zinc-50 border border-zinc-300 text-zinc-800">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                <div className="">
                                    {
                                        patient.BiometricEnrolmentStatus==='N' ? (
                                            <BiometricEnrollment/>
                                        ) : (
                                            <BiometricVerification/>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span className="block text-sm uppercase tracking-[4px]">Medical Aid Not Found</span>
                    </div>
                )
            }
        </div>
    )
}