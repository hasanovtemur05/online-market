import { axiosInstanceApi } from "@api";
import { ParamsType } from "@types";
import { ProductType } from "../types";


// =====================================  GET PRODUCT  =======================================
export const getProduct = async (params: ParamsType) => {
    const response = await axiosInstanceApi.get('product/list', {params})
    return response?.data;
};



//  =====================================  CREATE PRODUCT  =======================================
export const createProduct = async ( data:ProductType) => {
    const response = await axiosInstanceApi.post('product/create', data)
    return response?.data
}





//  =====================================  UPDATE PRODUCT  =======================================
export const updateProduct = async (id:number, data:ProductType) => {
    const response = await axiosInstanceApi.put(`product/update/${id}`, data); // PATCH ni PUT bilan almashtirish
    return response?.data;
};






// =====================================  DELETE PRODUCT  =======================================
export const deleteProduct = async (id:number) => {
    const response = await axiosInstanceApi.delete(`product/delete/${id}`)
    return response?.data;
};




// =====================================  MINIO MEDIA  =======================================
export const createMedia = async (formData: FormData) => {
    const response = await axiosInstanceApi.post("minio/media", formData)
    return response;
};

