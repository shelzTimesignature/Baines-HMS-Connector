import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function useRegisteredPatient(data){
    //this is a list of patients with medical aids

    return useQuery(['registered-patients',data.suffix,data.member_number],()=>http.get(`/RegistrationList?$filter=Medical_Aid_Member_No eq '${data.member_number}' and Patient_Suffix eq '${data.suffix}'`).then(res=>{
        console.log(res.data.value)
        return res.data.value
    }))
}