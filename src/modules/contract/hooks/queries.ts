import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getContract } from "../service";

export function useGetContract(params: ParamsType){
    return useQuery({
        queryFn: () => getContract(params),  
        queryKey: ["contract", params],     
    });

}

