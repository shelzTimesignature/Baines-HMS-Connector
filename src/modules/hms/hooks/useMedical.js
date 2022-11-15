import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function useMedical(code){
    return useQuery(['medical',code],()=>http.get(`/MedicalAidList?$filter=Bio_Code eq '${code}'`).then(res=>{
        // console.log(res.data.value[0])
        return res?.data?.value[0]
    }))
}