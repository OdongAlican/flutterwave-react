import axios from "axios";

export const baseUrl = "http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/";

export const AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: "Basic YWRtaW46YWRtaW4=",
        Accept: "application/json"
    }
});