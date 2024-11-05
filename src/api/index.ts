import axios from "axios"


const axiosInstance = axios.create({
    baseURL: "https://auth.solihov.uz"
})
export default axiosInstance; 

export const axiosInstanceApi = axios.create({
    baseURL: "https://solihov.uz"

})
axiosInstanceApi.interceptors.request.use((config)=>{
    const access_token:string | null = localStorage.getItem("access_token")
    if (access_token) {
        config.headers['Authorization'] =  access_token
    }
    return config   
})


