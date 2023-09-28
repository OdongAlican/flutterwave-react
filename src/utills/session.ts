import { accessTokenKey } from "./constants"

export const getAuthTokenFromSessionStorage = () => {
    return sessionStorage.getItem(accessTokenKey)
}

export const removeAuthTokenFromSessionStorage = () =>{
    return sessionStorage.removeItem(accessTokenKey)
}
