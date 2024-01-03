import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";

function NavBar() {
    const { id } = useUserContext();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (id) {
            const decoded = jwtDecode(id);
            setIsAdmin(decoded.isAdmin);
        }
    }, [id]);
    return (
        <div style={{ paddingBottom: 10 }} className="space-x-8">
            {/* Non logged users routes */}
            <Link to="/" style={{ paddingRight: 5 }}>
                Home
            </Link>
            <Link to="/example" style={{ paddingRight: 5 }}>
                Example
            </Link>

            {/* not logged users */}
            {!id && (
                <>
                    <Link to="/signup" style={{ paddingRight: 5 }}>
                        SignUp
                    </Link>
                    <Link to="/login" style={{ paddingRight: 5 }}>
                        Login
                    </Link>
                    <Link to="/ssign" style={{ paddingRight: 5 }}>
                        Staff Sign In
                    </Link>
                </>
            )}
            {/* All the logged users routes */}
            {id && (
                <>
                    <Link to="/studyrooms" style={{ paddingRight: 5 }}>
                        Study Rooms
                    </Link>
                    <Link to="/chat" style={{ paddingRight: 5 }}>
                        Chat
                    </Link>
                </>
            )}
            {/* All the loged non admins routes */}
            {id && !isAdmin && (
                <>
                    <Link to="/reservations" style={{ paddingRight: 5 }}>
                        My Reservations
                    </Link>
                </>
            )}
            {/* Admin routes */}
            {id && isAdmin && (
                <>
                    <Link to="/booklist" style={{ paddingRight: 5 }}>
                        Manage-Books
                    </Link>
                    <Link to="/borrowbook" style={{ paddingRight: 5 }}>
                        BorrowBook
                    </Link>
                </>
            )}
        </div>
    );
}

export default NavBar;
