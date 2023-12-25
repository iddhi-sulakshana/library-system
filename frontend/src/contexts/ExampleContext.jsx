import React, { createContext, useState, useContext } from "react";

// Use this kind of context for a values that uses in different components
// and you want to avoid prop drilling (passing the value through multiple components)

// Create a context with a default value
const ExampleContext = createContext();
// Create a provider component to wrap your app
export const ExampleProvider = ({ children }) => {
    const [example, setExample] = useState(0);

    return (
        <ExampleContext.Provider value={{ example, setExample }}>
            {children}
        </ExampleContext.Provider>
    );
};
// Custom hook to consume the context in functional components
export const useExampleContext = () => useContext(ExampleContext);
