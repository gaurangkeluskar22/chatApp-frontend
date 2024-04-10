import { createContext, useContext, useState } from "react"


export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(localStorage?.getItem('token') || '');
    const [userId, setUserId] = useState('')

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};