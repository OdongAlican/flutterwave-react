import { AxiosInstance, baseUrl } from "../../../core/api/baseURL"

export const fetchDocuments = async () => {
    try {
        const response = await AxiosInstance.get(`${baseUrl}/queries/nodes?term=test&skipCount=0&maxItems=100`);
        console.log(response.data, "response data")
    } catch (error) {
        console.log(error, "Error Message");
    }
}