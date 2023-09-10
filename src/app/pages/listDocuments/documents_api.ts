import {
    AxiosInstance,
    baseUrl
} from "../../../core/api/baseURL";
import { IResponseData } from "./interface";

export const fetchDocuments = async (): Promise<IResponseData | any> => {
    const querry = 'document';
    try {
        const response = await AxiosInstance.get(`${baseUrl}/queries/nodes?term=${querry}&skipCount=0&maxItems=100`);
        return response;
    } catch (error) {
        return error;
    }
};