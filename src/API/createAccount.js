import { axios } from "../utils/axiosService"

export const accoutCreate = (data) => {
    return axios.post("/createAccount", data)
}