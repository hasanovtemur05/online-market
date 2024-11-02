import { axiosInstanceApi } from "@api";
import { ParamsType } from "@types";
import { ContractType } from "../types";


// =====================================  GET PRODUCT  =======================================
export const getContract = async (params: ParamsType) => {
    const response = await axiosInstanceApi.get('contract/list', {params})
    return response?.data;
};



//  =====================================  CREATE PRODUCT  =======================================
export const createContract = async ( data:ContractType) => {
    const response = await axiosInstanceApi.post('contract/create', data)
    return response?.data
}





//  =====================================  UPDATE PRODUCT  =======================================
export const updateContract = async (id:number, data:ContractType) => {
    const response = await axiosInstanceApi.put(`contract/update/${id}`, data); // PATCH ni PUT bilan almashtirish
    return response?.data;
};






// =====================================  DELETE PRODUCT  =======================================
export const deleteContract = async (id:number) => {
    const response = await axiosInstanceApi.delete(`contract/delete/${id}`)
    return response?.data;
};




// =====================================  MINIO MEDIA  =======================================
export const createMedia = async (formData: FormData) => {
    const response = await axiosInstanceApi.post("minio/media", formData)
    return response;
};

