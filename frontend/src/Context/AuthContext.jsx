import { createContext, useEffect, useMemo, useState } from "react";
import { clearAuthUser, getAuthUser, saveAuthUser, } from "../Pages/Auth/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getAuthUser());

    useEffect(() => {
        const syncAuthUser = () => setUser(getAuthUser());

        window.addEventListener("storage", syncAuthUser);
        window.addEventListener("briefly-auth-change", syncAuthUser);

        return () => {
            window.removeEventListener("storage", syncAuthUser);
            window.removeEventListener("briefly-auth-change", syncAuthUser);
        };
    }, []);

    const value = useMemo(
        () => ({
            user,
            token: user?.token || localStorage.getItem("token"),
            login: (authUser) => {
                saveAuthUser(authUser);
                setUser(authUser);
            },
            logout: () => {
                clearAuthUser();
                setUser(null);
            },
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}