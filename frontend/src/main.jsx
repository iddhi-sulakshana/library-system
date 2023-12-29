import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { ExampleProvider } from "./contexts/ExampleContext.jsx";
import { ExampleDataProvider } from "./contexts/ExampleDataContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ExampleProvider>
                <ExampleDataProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </ExampleDataProvider>
            </ExampleProvider>
        </BrowserRouter>
    </React.StrictMode>
);
