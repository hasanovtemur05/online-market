import axiosInstance from "@api";
import { SignInType } from "../types";

export async function signIn(data:SignInType){ 
    return await axiosInstance.post("/user/login", data)
}
