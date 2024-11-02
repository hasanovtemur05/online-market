import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createContract, createMedia, deleteContract, updateContract,  } from "../service"
import { Notification } from "../../../utils/notification"
import { ContractType } from "../types"


// =================================  CREATE  ====================================
export function useCreateContract () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:ContractType) => createContract(data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['contract']})
            Notification('success', response?.message)

        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['contract']})
       }
       

    })
}


// =================================  MINIO MEDIA  ====================================
export function useCreateMedia () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => createMedia(formData), 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['contract']});
        },
       
    });
}





// =================================  UPDATE  ====================================
export function useUpdateContract () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:ContractType) => updateContract(data.id, data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['contract']})
            Notification('success', response?.message) 
        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['contract']})
            Notification("error", error.message)

       }
       
    })
}






// =================================  DELETE  ====================================
export function useDeleteContract () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteContract(id),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['contract']})
            Notification('success', response?.message)            

        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['contract']})
            Notification("error", error.message)

       }
       
    })
}