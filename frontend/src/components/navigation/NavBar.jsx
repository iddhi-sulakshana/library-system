import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

function NavBar() {
    const { setId } = useUserContext();
    // reference to the input
    const inputRef = React.useRef();

    return (
        <div style={{ paddingBottom: 10 }}>
            <Link to="/" style={{ paddingRight: 5 }}>
                Home
            </Link>
            <Link to="/example" style={{ paddingRight: 5 }}>
                Example
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
