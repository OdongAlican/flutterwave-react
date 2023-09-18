import axios from "axios";

export const baseUrl = "/api/-default-/public/alfresco/versions/1/";
export const apiURL = 'http://192.168.18.34:7777/'
export const term = "&include=properties,path,isLocked,isDirectLinkEnabled,aspectNames,isFavorite,allowableOperations,isLink";
export const credentials = { username: 'admin', password: 'admin' };

export const AxiosInstance = axios.create({
    headers: {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
        Accept: "application/json"
    }
});