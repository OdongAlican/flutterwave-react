import { accessTokenKey } from "../../../utills/constants";

export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem(accessTokenKey);
    if (accessToken) return true;
    return false;
}
