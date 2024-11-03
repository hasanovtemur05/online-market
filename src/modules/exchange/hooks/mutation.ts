import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createExchange, deleteExchange,  updateExchange,  } from "../service"
import { Notification } from "../../../utils/notification"


// =================================  CREATE  ====================================
export function useCreateExchange () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createExchange(data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['exchange']})
            Notification('success', response?.message)

        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['exchange']})
       }
       

    })
}




// =================================  UPDATE  ====================================
export function useUpdateExchange () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateExchange(data.id, data),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['exchange']})
            Notification('success', response?.message) 
        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['exchange']})
            Notification("error", error.message)

       }
       
    })
}






// =================================  DELETE  ====================================
export function useDeleteExchange () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteExchange(id),
        onSuccess: (response)=>{
            queryClient.invalidateQueries({queryKey: ['exchange']})
            Notification('success', response?.message)            

        },
       onError: (error)=> {
            queryClient.invalidateQueries({queryKey: ['exchange']})
            Notification("error", error.message)

       }
       
    })
}