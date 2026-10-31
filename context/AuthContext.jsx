import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentDemoUser,
    isRegisteredEmail,
    loginDemoUser,
    logoutDemoUser,
    registerDemoUser,
    resetDemoPassword,
    updateDemoProfile,
} from "../services/demoAuth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const clearLoginForm = () => {
        setLoginEmail("");
        setLoginPassword("");
    };

    useEffect(() => {
        const syncUser = () => {
            try {
                setUser(getCurrentDemoUser());
            } catch (error) {
                console.error("Unable to load the saved demo account.", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        syncUser();
        window.addEventListener("storage", syncUser);

        return () => window.removeEventListener("storage", syncUser);

    }, []);

    const signIn = async (email, password) => {
        const signedInUser = await loginDemoUser(email, password);
        setUser(signedInUser);
        return signedInUser;
    };

    const register = (details) => registerDemoUser(details);

    const resetPassword = (email, password) => resetDemoPassword(email, password);

    const updateProfile = (details) => {
        if (!user?.uid) {
            throw new Error("A signed-in account is required to update your profile.");
        }

        const updatedUser = updateDemoProfile(user.uid, details);
        setUser(updatedUser);
        return updatedUser;
    };

    const signOut = () => {
        clearLoginForm();
        logoutDemoUser();
        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                loginEmail,
                setLoginEmail,
                loginPassword,
                setLoginPassword,
                clearLoginForm,
                signIn,
                register,
                resetPassword,
                updateProfile,
                isRegisteredEmail,
                signOut,
            }}
        >

            {!loading && children}

        </AuthContext.Provider>

    );

};