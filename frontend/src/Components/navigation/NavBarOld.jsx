import { Link } from "react-router-dom";

function NavBar() {
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
            <Link to="/signup" style={{ paddingRight: 5 }}>
                SignUp
            </Link>
            <Link to="/login" style={{ paddingRight: 5 }}>
                Login
            </Link>
            <Link to="/ssign" style={{ paddingRight: 5 }}>
                Staff Sign In
            </Link>
        </div>
    );
}

export default NavBar;
