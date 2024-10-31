import axios from "axios"


const axiosInstance = axios.create({
    baseURL: "https://auth.solihov.uz"
})
export default axiosInstance; 

export const axiosInstanceApi = axios.create({
    baseURL: "https://solihov.uz"
})


