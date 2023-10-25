import axios from "axios";

export const baseUrl = "/api/-default-/public/alfresco/versions/1/";
export const apiURL = 'http://localhost:7777/'
export const term = "&include=properties,path,isLocked,isDirectLinkEnabled,aspectNames,isFavorite,allowableOperations,isLink";
export const credentials = { username: 'sysadmin', password: 'password=1' };

export const AxiosInstance = axios.create({
    headers: {
        Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
        Accept: "application/json"
    }
});