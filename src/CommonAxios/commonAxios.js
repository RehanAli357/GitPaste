import axios from "axios";
import { baseURL } from "../Component/baseUrl";

const commonAxios = async (ep, type, data) => {
    try {
        return axios({
            method: type,
            url: baseURL + ep,
            data: data,
            headers: {
                token: `${JSON.parse(localStorage.getItem('userData'))?.token}`,
                // 'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default commonAxios;
