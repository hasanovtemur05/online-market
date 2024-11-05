import { axiosInstanceApi } from "@api";
import { ParamsType } from "@types";
import { TransactionType } from "../types";


// =====================================  GET TRANSACTION  =======================================
export const getTransaction = async (params: ParamsType) => {
    const response = await axiosInstanceApi.get('transaction/list', {params})
    return response?.data;
};



//  =====================================  CREATE TRANSACTION  =======================================
export const createTransaction = async ( data:TransactionType) => {
    const response = await axiosInstanceApi.post('transaction/create', data)
    return response?.data
}





//  =====================================  UPDATE TRANSACTION  =======================================
export const updateTransaction = async (id:number, data:TransactionType) => {
    const response = await axiosInstanceApi.put(`transaction/update/${id}`, data); 
    return response?.data;
};






// =====================================  DELETE TRANSACTION  =======================================
export const deleteTransaction = async (id:number) => {
    const response = await axiosInstanceApi.delete(`transaction/delete/${id}`)
    return response?.data;
};





// =========================================  CONTRACT ID   =================================
export const getContract = async () => {
    const response = await axiosInstanceApi.get('contract/list')
    return response?.data
};
