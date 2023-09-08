import axios from "axios";
import { AxiosInstance, baseUrl } from "../../../core/api/baseURL"

export const fetchDocuments = async () => {
    try {
        // const response = await AxiosInstance.get(`${baseUrl}/queries/nodes?term=test&skipCount=0&maxItems=100`);
        const response = await axios.get('/api/-default-/public/alfresco/versions/1/queries/nodes?term=doc&skipCount=0&maxItems=100', {
            headers: {
                Authorization: "Basic YWRtaW46YWRtaW4=",
                Accept: "application/json"
            }
        })
        console.log(response, "response data")
    } catch (error) {
        console.log(error, "Error Message");
    }
}