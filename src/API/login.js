import { axios } from "../utils/axiosService"

export const login = (data) => {
    return axios.post("/login", data)
}