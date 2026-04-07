import axios from 'axios';
import { API_PREFIX, API_URL, DEBUG } from '../config';
import { logDate, truncateString } from '../utils';

export const axiosInstance = axios.create({
    baseURL: `${API_URL}${API_PREFIX}`,
});

// Response interceptor for logging and error handling
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful responses
        console.log();
        console.log(
            `✅ ${response.status} ${response?.config?.method?.toUpperCase()} ${response?.config?.baseURL || '' + response?.config?.url}`,
            '\nPayload:',
            response.config.data,
            '\nResponse:',
            response.data?.message || '',
            DEBUG ? response.data : truncateString(response.data),
        );
        console.log(logDate());
        console.log();

        return response;
    },
    async (error) => {
        // Log errors
        console.log();
        console.error(
            `❌ ${error.response?.status} ${error.config.method.toUpperCase()} ${error.config.baseURL + error.config.url}`,
            '\nPayload:',
            error.config.data,
            '\nResponse:',
            error.response?.data?.message || '',
            DEBUG ? error.response?.data : truncateString(error.response?.data),
        );
        console.log(logDate());
        console.log();

        return Promise.reject(error);
    },
);
