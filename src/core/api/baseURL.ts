import axios from "axios";

export const baseUrl = "/api/-default-/public/alfresco/versions/1/";
const credentials = { username: 'admin', password: 'admin' };

export const AxiosInstance = axios.create({
    headers: {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
        Accept: "application/json"
    }
});