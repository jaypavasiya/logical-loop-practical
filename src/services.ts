import axios, { AxiosResponse, AxiosError } from 'axios';
export const BASE_URL : string = 'https://gorest.co.in/public/v1';
export async function axiosGet<T>(path: string, params?: object): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get(BASE_URL + path, { params });
        return response.data;
    } catch (error: AxiosError | any) {
        if (error.response) {
            // Request made and server responded with a status code
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
        }
        throw error;
    }
}
export async function axiosPut<T>(path: string, data: object): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.put(BASE_URL + path, data);
        return response.data;
    } catch (error: AxiosError | any) {
        if (error.response) {
            // Request made and server responded with a status code
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
        }
        throw error;
    }
}
