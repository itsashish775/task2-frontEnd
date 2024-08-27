
import { axios } from "../utils/axiosService"

export const getUserListing = (data) => {
    return axios.get("/listing", data)
}