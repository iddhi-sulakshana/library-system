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
import NotFound from "./pages/NotFound";
import BookListFrontend from "./pages/BookListFrontend";

import { useUserContext } from "./contexts/UserContext";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ShowBook from "./pages/ShowBook";

function App() {
    const { id } = useUserContext();
    const [isAdmin, setIsAdmin] = React.useState(false);
    useEffect(() => {
        if (id) {
            const decoded = jwtDecode(id);
            setIsAdmin(decoded.isAdmin);
        }
    }, [id]);
    return (
        <>
            <Navbar />
            <div className="h-screen">
                <Routes>
                    {/* all users routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/example" element={<Example />} />
                    <Route path="/show-book/:id" element={<ShowBook />} />
                    <Route
                        path="/book-collection"
                        element={<BookListFrontend />}
                    />
                    {/* not logged users */}
                    {!id && (
                        <>
                            <Route path="/signup" element={<SignUpForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/ssign" element={<StaffSignIn />} />
                        </>
                    )}
                    {/* All the logged users routes */}
                    {id && (
                        <>
                            <Route path="/chat" element={<Chat />} />
                            <Route
                                path="/studyrooms"
                                element={<StudyRooms />}
                            />
                        </>
                    )}
                    {/* All the loged non admins routes */}
                    {id && !isAdmin && (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/editProfile/:email"
                                element={<EditProfile />}
                            />
                            <Route
                                path="/reservations"
                                element={
                                    <StudyRoomReservations userId={119900} />
                                }
                            />
                            <Route
                                exact
                                path="/reserve/:id"
                                element={<StudyRoomReservationForm />}
                            />
                        </>
                    )}
                    {/* Admin routes */}
                    {id && isAdmin && (
                        <>
                            <Route path="/sdash" element={<StaffDashboard />} />
                            <Route path="/booklist" element={<BooksList />} />
                            <Route
                                path="/updatebook/:id"
                                element={<UpdateBook />}
                            />
                            <Route path="/addbook" element={<AddBook />} />
                            <Route
                                path="/borrowbook"
                                element={<BorrowBook />}
                            />
                        </>
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
