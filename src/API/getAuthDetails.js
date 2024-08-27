import { axios } from "../utils/axiosService"

export const getLoginUserDetails = (data) => {
    console.log(data);
    return axios.post("/getAuthData", data)
}