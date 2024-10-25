import axiosInstance from "@api";
import { RegisterType, SignInType } from './../types/index';

export async function signIn(data:SignInType){ 
    return await axiosInstance.post("/user/login", data)
}


export async function register(data: RegisterType){
    return await axiosInstance.post("/user/register", data)
}