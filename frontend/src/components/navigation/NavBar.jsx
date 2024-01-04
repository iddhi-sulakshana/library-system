import { Disclosure } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Navbar() {
    const slug = useLocation();
    const { id } = useUserContext();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (id) {
            const decoded = jwtDecode(id);
            setIsAdmin(decoded.isAdmin);
        }
    }, [id]);
    const activeClass =
        "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-md font-semibold text-gray-500 no-underline";
    const inactiveClass =
        "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-900 hover:border-gray-300 no-underline";
    const activeMobileClass =
        "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 no-underline";
    const inactiveMobileClass =
        "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 no-underline";
    return (
        <>
            <Disclosure
                as="nav"
                className="bg-white shadow fixed z-40"
                style={{ width: "100%" }}
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                            <div className="flex h-16 justify-between">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/">
                                        <img
                                            className="block h-8 w-auto lg:hidden"
                                            src="/src/assets/lib_logo.png"
                                            alt="logo"
                                        />
                                        <img
                                            className="hidden h-11 w-auto lg:block"
                                            src="/src/assets/lib_logo.png"
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                                <div className="flex">
                                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                                        {/* Non logged users routes */}
                                        <Link
                                            to="/"
                                            className={
                                                slug.pathname === "/"
                                                    ? activeClass
                                                    : inactiveClass
                                            }
                                        >
                                            Home
                                        </Link>
                                        {/* not logged users */}
                                        {!id && (
                                            <>
                                                <Link
                                                    to="/signup"
                                                    className={
                                                        slug.pathname ===
                                                        "/signup"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    SignUp
                                                </Link>
                                                <Link
                                                    to="/login"
                                                    className={
                                                        slug.pathname ===
                                                        "/login"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    to="/ssign"
                                                    className={
                                                        slug.pathname ===
                                                        "/ssign"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Staff Sign In
                                                </Link>
                                            </>
                                        )}
                                        {/* All the logged users routes */}
                                        {id && (
                                            <>
                                              <Link
                                                    to="/book-collection"
                                                    className={
                                                        slug.pathname ===
                                                        "/book-collection"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Books
                                                </Link>
                                                <Link
                                                    to="/studyrooms"
                                                    className={
                                                        slug.pathname ===
                                                        "/studyrooms"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Study Rooms
                                                </Link>
                                                <Link
                                                    to="/chat"
                                                    className={
                                                        slug.pathname ===
                                                        "/chat"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Chat
                                                </Link>
                                            </>
                                        )}
                                        {/* All the loged non admins routes */}
                                        {id && !isAdmin && (
                                            <>
                                                <Link
                                                    to="/profile"
                                                    className={
                                                        slug.pathname ===
                                                        "/profile"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/reservations"
                                                    className={
                                                        slug.pathname ===
                                                        "/reservations"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    My Reservations
                                                </Link>
                                            </>
                                        )}
                                        {/* Admin routes */}
                                        {id && isAdmin && (
                                            <>
                                                <Link
                                                    to="/sdash"
                                                    className={
                                                        slug.pathname ===
                                                        "/sdash"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Staff Dashboard
                                                </Link>
                                                <Link
                                                    to="/booklist"
                                                    className={
                                                        slug.pathname ===
                                                        "/booklist"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Manage Books
                                                </Link>
                                                <Link
                                                    to="/borrowbook"
                                                    className={
                                                        slug.pathname ===
                                                        "/borrowbook"
                                                            ? activeClass
                                                            : inactiveClass
                                                    }
                                                >
                                                    Borrow Book
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? <AiOutlineClose /> : <FaBars />}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Links */}
                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 pt-2 pb-3">
                                <Disclosure.Button
                                    as="a"
                                    href="/"
                                    className={
                                        slug.pathname === "/"
                                            ? activeMobileClass
                                            : inactiveMobileClass
                                    }
                                >
                                    Home
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="/books"
                                    className={
                                        slug.pathname === "/books"
                                            ? activeMobileClass
                                            : inactiveMobileClass
                                    }
                                >
                                    Books
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
