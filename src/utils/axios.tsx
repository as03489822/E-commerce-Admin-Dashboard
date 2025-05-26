import axios, { AxiosRequestConfig } from 'axios';

interface ApiRequestParams {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: Record<string, string>;
    contentType? : string;
}

export const makeApiRequest = async ({
    url,
    method = 'GET',
    data = {},
    headers = {
        Authorization:`Bearer ${localStorage.getItem('token')}`
    },
    contentType = 'application/json',
}: ApiRequestParams) => {
    try {
        console.log(localStorage.getItem('token'))
        const config: AxiosRequestConfig = {
            method,
            url,
            headers: {
                'Content-Type': contentType, 
                ...headers, 
            },
            data,  
        };
        const response = await axios(config);
        console.log("Axios Response",response)
        return response.data;
    } catch (error: any) {
        // console.error('Error making API request:', error.message);
        return error.response.data;
    }
};
