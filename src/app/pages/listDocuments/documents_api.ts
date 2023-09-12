import {
    AxiosInstance,
    baseUrl,
    term
} from "../../../core/api/baseURL";
import { IResponseData } from "./interface";

export const fetchDocuments = async (query: string): Promise<IResponseData | any> => {
    try {
        const response = await AxiosInstance.get(`${baseUrl}/queries/nodes?term=${query}&skipCount=0&maxItems=100${term}`);
        return response;
    } catch (error) {
        return error;
    }
};