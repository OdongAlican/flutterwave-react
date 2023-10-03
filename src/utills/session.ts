import { accessTokenKey, currentUser } from "./constants"

export const getAuthTokenFromSessionStorage = () => {
    return sessionStorage.getItem(accessTokenKey)
}

export const removeAuthTokenFromSessionStorage = () =>{
    return sessionStorage.removeItem(accessTokenKey)
}

export const removeUserFromSessionStorage = () =>{
    return sessionStorage.removeItem(currentUser)
}

export const getUserFromSessionStorage = () => {
    return JSON.parse(sessionStorage.getItem(currentUser) || '');
};