import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMedia, createProduct, deleteProduct, updateProduct } from "../service"
import { Notification } from "../../../utils/notification"
import { ProductType } from "../types"


// =================================  CREATE  ====================================
export function useCreateProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:ProductType) => createProduct(data),
        onSuccess: (response)=>{
            Notification('success', response?.message)
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       

    })
}


// =================================  MINIO MEDIA  ====================================
export function useCreateMedia () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => createMedia(formData), 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product']});
        },
       
    });
}





// =================================  UPDATE  ====================================
export function useUpdateProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:ProductType) => updateProduct(data.id, data),
        onSuccess: (response)=>{
            Notification('success', response?.message)            
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       
    })
}






// =================================  DELETE  ====================================
export function useDeleteProduct () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) => deleteProduct(id),
        onSuccess: (response)=>{
            Notification('success', response?.message)            
            queryClient.invalidateQueries({queryKey: ['product']})
        },
       onError: (error)=> {
            Notification("error", error.message)
            queryClient.invalidateQueries({queryKey: ['product']})
       }
       
    })
}