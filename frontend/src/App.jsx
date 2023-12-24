import { Route, Routes } from "react-router-dom";
import Example from "./pages/Example";
import Home from "./pages/home";
import NavBar from "./components/navigation/NavBar";
import BorrowBook from "./components/Forms/BorrowBook";
import AddPage from "./pages/AddPage";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/example" element={<Example />} />
                <Route path="/addpage" element={<AddPage />} />
                <Route path="/borrowbook" element={<BorrowBook />} />
            </Routes>
        </>
    );
}

export default App;
