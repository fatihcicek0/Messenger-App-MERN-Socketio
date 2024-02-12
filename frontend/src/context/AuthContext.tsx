import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}




export const AuthProvider = ({ children }: { children: any }) => {
    const session = localStorage.getItem("user");
    const [isAuthenticated, setisAuthenticated] = useState(session ? true : false);
    const [user, setUser] = useState(session ? JSON.parse(session) : null);


    interface data {
        email: string,
        password: string
    }
    const login = async (data: data) => {
        try {
            const response:{data:string}= await api().post('/auth/login', data);
            const userData=response.data;
            await localStorage.setItem("user", JSON.stringify(userData));
            await setisAuthenticated(true);
        } catch (err) {
            console.log(err);
        }
    }

    return < AuthContext.Provider value={{ isAuthenticated, login, user }} > {children} </ AuthContext.Provider>
}
