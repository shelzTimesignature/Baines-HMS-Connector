import usePatients from "./usePatients";
import {useStatusContext} from "../providers/StatusProvider";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {searchFromHealth263} from "../services";
import toast from "react-hot-toast";
import ToastComponent from "../components/ToastComponent";

const useShared=(data)=>{

    const {suffix, member_number, bio_code}=data

    const {data:patients}=usePatients()

    const {setPatient,setStatus}=useStatusContext()


    const isFound=()=>{
        let found=false
        for(let i=0;i<patients.length;i++){
            let patient=patients[i]
            if(patient.Medical_Aid_Member_No.toLowerCase() === member_number.toLowerCase()){
                found=true
            }
        }
        return found
    }


    const navigate=useNavigate()
    const mutation=useMutation(value=>searchFromHealth263(value).then(res=>{
        return res
    }),{
        onSuccess:(data,variables)=>{

            console.log('member look up data',data)

            if(isFound()){
                toast.custom(()=>{
                    return (
                        <ToastComponent
                            description={'the patient with this medical aid number is saved in our systems'}
                            type={'success'}
                        />
                    )
                })

                setPatient({
                    ...data,
                    ...variables
                })
                setStatus('found')
            }
            else{
                setPatient({
                    ...data,
                    ...variables
                })
                setStatus('not_found')
            }

            navigate('/')
        },
        onError:(error)=>{
            toast.custom(()=>(
                <ToastComponent
                    description={'Member is not found'}
                    type={'warning'}

                />
            ))
            console.log(error)
        }
    })



    const searchPatient=()=>{
        if(member_number.length===0 || suffix.length===0 || bio_code.length===0){
            toast.custom(()=>(
                <ToastComponent
                    description={'member medical aid number is required'}
                    type={'success'}
                />
            ))
            return
        }


        mutation.mutate({
            bio_code,
            member_number,
            suffix
        })
    }


    return {mutation,patients,searchPatient}

}

export default useShared