import { Route, Routes } from "react-router-dom";
import Example from "./pages/Example";
import Home from "./pages/home";
import BorrowBook from "./components/Forms/BorrowBook";
import StudyRooms from "./pages/StudyRooms";
import StudyRoomReservations from "./pages/StudyRoomReservations";
import StudyRoomReservationForm from "./components/Forms/StudyRoomReservationForm";
import Chat from "./pages/Chat";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import SignUpForm from "./components/SignUPForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editProfile";
import StaffSignIn from "./pages/StaffSignIn";
import StaffDashboard from "./pages/StaffDashboard";
import Navbar from "./components/navigation/NavBar";


function App() {
    return (
        <>
        <Navbar/>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booklist" element={<BooksList />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/updatebook/:id" element={<UpdateBook />} />
                <Route path="/example" element={<Example />} />
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
                <Route path="/editProfile/:email" element={<EditProfile />} />
                <Route path="/ssign" element={<StaffSignIn />} />
                <Route path="/sdash" element={<StaffDashboard />} />
            </Routes>
        </>
    );
}

export default App;
