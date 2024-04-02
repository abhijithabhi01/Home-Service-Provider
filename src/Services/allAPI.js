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
// get all users
export const getallUsersAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/user/get`,"","")
}
// Update user profile API
export const UserprofileupdateAPI = async(userid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/update/${userid}`,reqBody,reqHeader)
}
// get all Workers
export const getallworkersAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/provider/get`,"","")
}
// Update worker profile API
export const workerprofileupdateAPI = async(userid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/worker/update/${userid}`,reqBody,reqHeader)
}
// get all Category
export const getAllCategoryAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/description/get`,"","")
}
// book worker
export const bookWorkerAPI = async(wid,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/booking/${wid}`,reqBody,reqHeader)
}
// get workers by worktype
export const getWorkerbytypeAPI = async(title)=>{
    return await commonAPI("GET",`${BASE_URL}/getbyworktype/${title}`,"","")
}
// get work request for worker
export const getworkerrequestAPI = async(workerid,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/getAllRequestsByworker/${workerid}`,"",reqHeader)
}
// approve request for worker
export const approveUserWorkRequestAPI = async(id,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/worker/approvetrue/${id}`,"",reqHeader)
}
// approve request for worker
export const declineUserWorkRequestAPI = async(id,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/worker/approvefalse/${id}`,"",reqHeader)
}