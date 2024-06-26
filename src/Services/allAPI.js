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
export const approveUserWorkRequestAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/worker/approvetrue/${id}`,reqBody,reqHeader)
}

export const CancelWorkAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete/booking/${id}`,reqBody,reqHeader)
}

export const paymentAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/worker/payment/${id}`,reqBody,reqHeader)
}
// approve request for worker
export const declineUserWorkRequestAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/worker/approvefalse/${id}`,reqBody,reqHeader)
}
// get work list for user
export const getworklistAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/getBookingsByUserId`,"",reqHeader)
}

export const AllusersAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/user/get`)
}
//admin delete user 
export const deleteuserAPI = async(userid,reqBody,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/deleteuser/${userid}`,reqBody,reqHeader)
}

//admin get all users
export const AllworkersAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/provider/get`)
}
//admin delete user 
export const deleteworkersAPI = async(workerid,reqBody,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/deleteworker/${workerid}`,reqBody,reqHeader)
}

// book worker
export const addReviewAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/addreview/${id}`,reqBody,reqHeader)
}
// Add package 
export const AddPackageAPI = async(wid,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/addpackage/${wid}`,reqBody,reqHeader)
}
//admin get all Packages
export const getAllPackagesAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/getallpackages/`,{},{})
}
//admin get all Packages
export const getAllWPackagesAPI = async(workerid)=>{
    return await commonAPI('GET',`${BASE_URL}/worker/getallpackages/${workerid}`,{},{})
}
export const deletePackageAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/delete/package/${id}`,reqBody,reqHeader)
}

// book worker
export const BookPackageAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/packagebooking/${id}`,reqBody,reqHeader)
}
// start work api
export const startWorkAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/work/start/${id}`,reqBody,reqHeader)
}
// work done by worker
export const workdoneAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/worker/workdone/${id}`,reqBody,reqHeader)
}
// Review for ADMIN
export const getreviewsforADMINAPI = async(id)=>{
    return await commonAPI('GET',`${BASE_URL}/getreviewsforadmin/${id}`)
}