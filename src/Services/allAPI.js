import { BASE_URL } from "./BASE_URL"
import { commonAPI } from "./CommonAPI"



// user register api
export const userRegisterAPI = async(userDetails,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,userDetails,reqHeader)
}   
// login api
export const userloginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//worker register api
export const workerRegisterAPI = async(userDetails,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/provider/register`,userDetails,reqHeader)
}   
// login api
export const workerloginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/provider/login`,user,"")
}