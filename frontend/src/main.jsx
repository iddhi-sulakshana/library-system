import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { ExampleProvider } from "./contexts/ExampleContext.jsx";
import { ExampleDataProvider } from "./contexts/ExampleDataContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import 'izitoast/dist/css/iziToast.css';
import "./index.css";
import 'sweetalert2/dist/sweetalert2.min.css';

window.host = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
