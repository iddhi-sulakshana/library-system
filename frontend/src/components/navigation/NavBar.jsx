import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function NavBar() {
    const { setId } = useUserContext();
    // reference to the input
    const inputRef = React.useRef();
    return (
        <div style={{ paddingBottom: 10 }} className="space-x-8">
            <Link to="/" style={{ paddingRight: 5 }}>
                Home
            </Link>
            <Link to="/booklist" style={{ paddingRight: 5 }}>
                Manage-Books
            </Link>
            <Link to="/example" style={{ paddingRight: 5 }}>
                Example
            </Link>
            <Link to="/addpage" style={{ paddingRight: 5 }}>
                AddPage
            </Link>
            <Link to="/borrowbook" style={{ paddingRight: 5 }}>
                BorrowBook
            </Link>
            <Link to="/studyrooms" style={{ paddingRight: 5 }}>
                Study Rooms
            </Link>
            <Link to="/reservations" style={{ paddingRight: 5 }}>
                My Reservations
            </Link>
            <Link to="/chat" style={{ paddingRight: 5 }}>
                Chat
            </Link>
            {/* input filed for setting the user id */}
            <input
                ref={inputRef}
                placeholder="Enter your user id"
                style={{ paddingRight: 5 }}
            />
            {/* button to set the user id */}
            <button
                onClick={() => {
                    setId(inputRef.current.value);
                }}
            >
                Set User Id
            </button>
        </div>
    );
}

export default NavBar;
