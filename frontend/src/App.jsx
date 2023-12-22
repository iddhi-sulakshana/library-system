import { Route, Routes } from "react-router-dom";
import Example from "./pages/Example";
import Home from "./pages/home";
import NavBar from "./components/navigation/NavBar";
import Chat from "./pages/Chat";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/example" element={<Example />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
    );
}

export default App;
