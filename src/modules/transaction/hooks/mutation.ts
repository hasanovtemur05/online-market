/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTransaction, deleteTransaction, updateTransaction } from "../service"
import { Notification } from "../../../utils/notification"
import { TransactionType } from "../types"


// =================================  CREATE  ====================================
export function useCreateTransaction () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:TransactionType) => createTransaction(data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['transaction']})
            Notification('success', response?.message)

        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['transaction']})
       }
       

    })
}




// =================================  UPDATE  ====================================
export function useUpdateTransaction () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:any) => updateTransaction(data.id, data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['transaction']})
            Notification('success', response?.message) 
        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['transaction']})
            Notification("error", error.message)

       }
       
    })
}






// =================================  DELETE  ====================================
export function useDeleteTransaction () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteTransaction(id),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['transaction']})
            Notification('success', response?.message)            

        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['transaction']})
            Notification("error", error.message)

       }
       
    })
}