import { axiosInstanceApi } from "@api";
import { ParamsType } from "@types";
import { ExchangeType } from "../types";


// =====================================  GET EXCHANGE  =======================================
export const getExchange = async (params: ParamsType) => {
    const response = await axiosInstanceApi.get('exchange/list', {params})
    return response?.data;
};



//  =====================================  CREATE EXCHANGE  =======================================
export const createExchange = async ( data:ExchangeType) => {
    const response = await axiosInstanceApi.post('exchange/create', data)
    return response?.data
}





//  =====================================  UPDATE EXCHANGE  =======================================
export const updateExchange = async (id:number, data:ExchangeType) => {
    const response = await axiosInstanceApi.put(`exchange/update/${id}`, data); // PATCH ni PUT bilan almashtirish
    return response?.data;
};






// =====================================  DELETE EXCHANGE  =======================================
export const deleteExchange = async (id:number) => {
    const response = await axiosInstanceApi.delete(`exchange/delete/${id}`)
    return response?.data;
};







// =========================================  CONTRACT ID   =================================
export const getContract = async () => {
    const response = await axiosInstanceApi.get('contract/list')
    return response?.data
};
