import {getClaims} from "../services";
import {useQuery} from "@tanstack/react-query";

export default function useClaims(){
    return useQuery(['claims'],()=>getClaims())
}