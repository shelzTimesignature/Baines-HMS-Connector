import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function useTariffs(val){
    return useQuery(['tariffs'],()=>http.get(`/MedicalAidClaimLine`).then(res=>{
        return res.data.value
    }))
}