import { axios } from "../utils/axiosService";

export const uploadVideoContent = (data) => {

    return axios.post(`/uploadVideoContent/`, data);
};