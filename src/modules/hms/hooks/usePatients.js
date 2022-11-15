import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function usePatients(){
    //this is a list of patients with medical aids
    return useQuery(['patients'],()=>http.get(`/PatientList`).then(res=>{
        return res.data.value
    }))
}