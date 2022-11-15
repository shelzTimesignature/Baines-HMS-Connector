import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function usePatient(id){
    //this is a list of patients with medical aids
    return useQuery(['patient',id],()=>http.get(`/PatientList?$filter=Medical_Aid_Member_No ne '' and No eq ${id}`).then(res=>{
        return res.data
    }))
}