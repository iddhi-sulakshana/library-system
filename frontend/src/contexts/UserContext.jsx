import { createContext, useContext, useState } from "react";

const UserContext = createContext();
// Create a provider component to wrap your app
export const UserProvider = ({ children }) => {
    const [id, setId] = useState(null);
    return (
        <UserContext.Provider value={{ id, setId }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUserContext = () => useContext(UserContext);
