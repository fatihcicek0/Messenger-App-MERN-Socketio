import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

interface state {
    isAuthenticated: boolean
}


export const AuthProvider = ({ children }: { children: any }) => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    
    const session = localStorage.getItem("user");
    const [user, setUser] = useState(session ? JSON.parse(session) : null);


    interface data {
        email: string,
        password: string
    }
    const login = async (data: data) => {
        try {
            const response: string = await api().post('/auth/login', data);
            await localStorage.setItem("user", JSON.stringify(response))
            await setisAuthenticated(true);


        } catch (err) {
            console.log(err);
        }
    }

    return < AuthContext.Provider value={{ isAuthenticated, login,user }} > {children} </ AuthContext.Provider>
}
