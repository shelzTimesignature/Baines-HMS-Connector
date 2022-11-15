import {useQuery} from "@tanstack/react-query";
import http from "../../../http";


export default function useClaim(id){
    return useQuery(['claim',id],()=>http.get(`/MedicalAidClaimList('${id}')`)
        .then(res=>{
            // console.log(res.data)
            return res.data
        }))
}