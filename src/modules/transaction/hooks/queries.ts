import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getContract, getTransaction } from "../service";

export function useGetTransaction(params: ParamsType){
    return useQuery({
        queryFn: () => getTransaction(params),  
        queryKey: ["transaction", params],     
    });

}




// ====================================   CONTRACT  =================================================

export function useGetContractId(){
    return useQuery({
        queryFn: () => getContract(),  
        queryKey: ["transaction"],     
    });

}