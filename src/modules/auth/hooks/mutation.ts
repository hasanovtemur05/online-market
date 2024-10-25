import { useMutation } from "@tanstack/react-query";
import { register, signIn } from "../service";
import { RegisterType, SignInType } from "../types";


// ==============================  SIGN-IN  ===============================
export function useSignInMutation(){
    return useMutation({
        mutationFn: (data:SignInType)=> signIn(data),
    })
}



// ==============================  REGISTER  ============================
export function useRegisterMutation (){
    return useMutation({
        mutationFn: (data:RegisterType) => register(data),
    })
}

