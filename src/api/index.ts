/**
 * API client for making HTTP requests.
 */
import Axios from "axios";

export const apiClient = Axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",
    },
})