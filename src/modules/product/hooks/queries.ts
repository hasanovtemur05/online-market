import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getProduct } from "../service";

export function useGetProduct(params: ParamsType){
    return useQuery({
        queryFn: () => getProduct(params),  
        queryKey: ["product", params],     
    });

}

