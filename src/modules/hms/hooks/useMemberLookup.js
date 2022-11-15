import {useQuery} from "@tanstack/react-query";
import {searchFromHealth263} from "../services";

export default function useMemberLookup({suffix,bio_code,member_number}){
    return useQuery(
        ['member look up',suffix,bio_code,member_number],
        ()=>searchFromHealth263({suffix,bio_code,member_number}).then(res=>{
            return {
                ...res,
                suffix,
                bio_code,
                member_number
            }
        }))
}