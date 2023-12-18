import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ExampleProvider } from "./contexts/ExampleContext.jsx";
import { ExampleDataProvider } from "./contexts/ExampleDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ExampleProvider>
                <ExampleDataProvider>
                    <App />
                </ExampleDataProvider>
            </ExampleProvider>
        </BrowserRouter>
    </React.StrictMode>
);
