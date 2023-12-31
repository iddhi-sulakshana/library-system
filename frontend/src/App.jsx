import { Route, Routes } from "react-router-dom";
import Example from "./pages/Example";
import Home from "./pages/home";
import NavBar from "./components/navigation/NavBar";
import BorrowBook from "./components/Forms/BorrowBook";
import AddPage from "./pages/AddPage";
import StudyRooms from "./pages/StudyRooms";
import StudyRoomReservations from "./pages/StudyRoomReservations";
import StudyRoomReservationForm from "./components/Forms/StudyRoomReservationForm";
import Chat from "./pages/Chat";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booklist" element={<BooksList/>} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/updatebook/:id" element={<UpdateBook/>} />
                <Route path="/example" element={<Example />} />
                <Route path="/addpage" element={<AddPage />} />
                <Route path="/borrowbook" element={<BorrowBook />} />
                <Route path="/studyrooms" element={<StudyRooms />} />
                <Route
                    path="/reservations"
                    element={<StudyRoomReservations userId={119900} />}
                />
                <Route
                    exact
                    path="/reserve/:id"
                    element={<StudyRoomReservationForm />}
                />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
    );
}

export default App;
