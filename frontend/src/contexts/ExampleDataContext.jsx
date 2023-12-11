import React, { createContext, useState, useContext } from "react";
import useExampleData from "../hooks/useExampleData";

// Use this kind of context for a values that uses in different components
// and you want to avoid prop drilling (passing the value through multiple components)

// Create a context with a default value
const ExampleDataContext = createContext();
// Create a provider component to wrap your app
export const ExampleDataProvider = ({ children }) => {
    const apiData = useExampleData();

    return (
        <ExampleDataContext.Provider value={apiData}>
            {children}
        </ExampleDataContext.Provider>
    );
};
// Custom hook to consume the context in functional components
export const useExampleDataContext = () => useContext(ExampleDataContext);
