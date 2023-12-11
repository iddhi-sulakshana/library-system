import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div style={{ paddingBottom: 10 }}>
            <Link to="/" style={{ paddingRight: 5 }}>
                Home
            </Link>
            <Link to="/example" style={{ paddingRight: 5 }}>
                Example
            </Link>
        </div>
    );
}

export default NavBar;
