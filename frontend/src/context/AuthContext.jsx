import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

export const AuthContext = createContext();

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const token = authService.getToken();

            if (token) {

                try {
                    const userData = await userService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("Erro ao carregar perfil do usuário", error);
                    authService.logout();
                }
            }
            setLoading(false);
        }
        loadUser();
    }, []);

    async function login(email, password) {
        const data = await authService.login(email, password);

        authService.setToken(data.token);

        const userData = await userService.getProfile();
        setUser(userData);
    }

    function logout() {
        authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            isAuthenticated: !!user,
            user,
            setUser,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}