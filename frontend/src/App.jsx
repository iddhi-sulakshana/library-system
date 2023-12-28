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
import SignUpForm from './components/SignUPForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import Profile from './components/profile/profile';
import EditProfile from './components/profile/editProfile';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
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
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/Profile/:email" element={<Profile />} />
                <Route path='/editProfile/:email' element={<EditProfile />} />
            </Routes>
        </>
    );
}

export default App;
