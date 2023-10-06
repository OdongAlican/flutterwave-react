import {
    AxiosInstance,
    baseUrl,
    term
} from "../../../core/api/baseURL";
import {
    IEntry,
    IResponseData
} from "./interface";

export const fetchDocuments = async (query: string): Promise<IResponseData | any> => {
    try {
        const response = await AxiosInstance.get(`${baseUrl}/queries/nodes?term=${query}&skipCount=0&maxItems=100${term}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const fetchSingleDocument = async (id: string): Promise<IEntry | any> => {
    try {
        const response = await AxiosInstance.get(`${baseUrl}nodes/${id}`);
        return response.data?.entry;
    } catch (error) {
        return error;
    }
};