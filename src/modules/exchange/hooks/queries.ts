import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getContract, getExchange } from "../service";

export function useGetExchange(params: ParamsType){
    return useQuery({
        queryFn: () => getExchange(params),  
        queryKey: ["exchange", params],     
    });

}




// ====================================   CONTRACT  =================================================

export function useGetContractId(){
    return useQuery({
        queryFn: () => getContract(),  
        queryKey: ["exchange"],     
    });

}



