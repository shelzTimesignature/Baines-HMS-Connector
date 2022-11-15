import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function useMedicalAids(){
    return useQuery(['medical-aids'],()=>http.get('/MedicalAidList').then(res=>{
        return res.data.value
    }))
}