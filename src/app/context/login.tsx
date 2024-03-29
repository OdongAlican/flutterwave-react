import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import {
    getAuthTokenFromSessionStorage,
    getUserFromSessionStorage
} from "../../utills/session";
import {
    isAuthenticated,
    userInfo
} from "../../utills/constants";
import { IRegister } from "../pages/authentication/interface";

const initialUser = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    location: "",
    email: "",
    password: "",
    username: "",
}
interface ILoginContext {
    isAuth: boolean;
    token: string;
    setAuth: (token: boolean) => void;
    setCurrentUserData: (user: IRegister) => void;
    currentUserData: IRegister
}

interface ILoginProvider {
    children: ReactNode;
}

export const LoginContext = createContext<ILoginContext>({
    isAuth: false,
    setCurrentUserData: () => { },
    token: "",
    setAuth: () => { },
    currentUserData: initialUser
});

const LoginProvider = ({ children }: ILoginProvider) => {
    const [isAuth, setAuth] = useState<boolean>((getAuthTokenFromSessionStorage() as string)?.length > 0 ? true : false)
    const [currentUserData, setCurrentUserData] = useState<IRegister>(getUserFromSessionStorage())
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        sessionStorage.setItem(isAuthenticated, JSON.stringify(isAuth));
    }, [isAuth]);

    useEffect(() => {
        sessionStorage.setItem(userInfo, JSON.stringify(currentUserData));
    }, [currentUserData]);

    useEffect(() => {
        const tokenData = getAuthTokenFromSessionStorage() as string;
        const userData = getUserFromSessionStorage() as IRegister;
        setCurrentUserData(userData);
        setToken(tokenData);
    }, []);

    return (
        <LoginContext.Provider value={{
            isAuth,
            token,
            setAuth,
            setCurrentUserData,
            currentUserData

        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;