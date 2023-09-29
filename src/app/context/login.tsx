import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import { getAuthTokenFromSessionStorage } from "../../utills/session";
import { isAuthenticated } from "../../utills/constants";

interface ILoginContext {
    isAuth: boolean;
    token: string;
    setAuth: (token: boolean) => void;
}

interface ILoginProvider {
    children: ReactNode;
}

export const LoginContext = createContext<ILoginContext>({
    isAuth: false,
    token: "",
    setAuth: () => { }
});

const LoginProvider = ({ children }: ILoginProvider) => {
    const [isAuth, setAuth] = useState<boolean>((getAuthTokenFromSessionStorage() as string)?.length > 0 ? true : false)
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        sessionStorage.setItem(isAuthenticated, JSON.stringify(isAuth))
    }, [isAuth]);

    useEffect(() => {
        const data = getAuthTokenFromSessionStorage() as string;
        setToken(data);
    }, []);

    return (
        <LoginContext.Provider value={{
            isAuth,
            token,
            setAuth
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;