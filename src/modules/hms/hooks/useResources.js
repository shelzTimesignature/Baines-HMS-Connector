import {useQuery} from "@tanstack/react-query";
import http from "../../../http";

export default function useResources(){
    return useQuery(['tariff-resource'],()=>http.get('/Resources').then(res=>{
        return res.data.value
    }),)
}