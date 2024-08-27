import { axios } from "../utils/axiosService"

export const updateBio = (data) => {
    return axios.post("/updateBio", data)
}