import { accessTokenKey } from "./constants"

export const getAuthTokenFromSessionStorage = () => {
    return sessionStorage.getItem(accessTokenKey)
}
