import { axios } from "../utils/axiosService";

export const updateProfileImage = (data) => {
    return axios.post(`/updateProfilePic`, data);
};