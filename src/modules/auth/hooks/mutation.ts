import { useMutation } from "@tanstack/react-query";
import { signIn } from "../service";
import { SignInType } from "../types";


// ==============================  POST SIGN-IN  ===============================
export function useSignInMutation(){
    return useMutation({
        mutationFn: (data:SignInType)=> signIn(data),
    })
}