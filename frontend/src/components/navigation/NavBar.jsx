import { Disclosure } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  const slug = useLocation();


  return (
    <>
      <Disclosure
        as='nav'
        className='bg-white shadow fixed z-40'
        style={{ width: "100%" }}
      >
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
              <div className='flex h-16 justify-between'>
                <div className='flex flex-shrink-0 items-center'>
                  <a href='/'>
                    <img
                      className='block h-8 w-auto lg:hidden'
                      src='/src/assets/lib_logo.png'
                      alt='Lyceum assessments logo'
                    />
                    <img
                      className='hidden h-11 w-auto lg:block'
                      src='/src/assets/lib_logo.png'
                      alt='Lyceum assessments logo'
                    />
                  </a>
                </div>
                <div className='flex'>
                  <div className='hidden md:ml-6 md:flex md:space-x-8'>
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link
                      to='/'
                      className={
                        slug.pathname === "/"
                          ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-md font-semibold text-gray-500 no-underline"
                          : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-900 hover:border-gray-300 no-underline"
                      }
                    >
                      Home
                    </Link>

                    <Link
                      to='/books'
                      className={
                        slug.pathname === "/books"
                          ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-md font-semibold text-gray-500 no-underline"
                          : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-900 hover:border-gray-300 no-underline"
                      }
                    >
                      Books
                    </Link>
                    <Link
                      to='/#'
                      className={
                        slug.pathname === "/#"
                          ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-md font-semibold text-gray-500 no-underline"
                          : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-900 hover:border-gray-300 no-underline"
                      }
                    >
                      Study Rooms
                    </Link>
                    <Link
                      to='/#'
                      className={
                        slug.pathname === "/#"
                          ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-md font-semibold text-gray-500 no-underline"
                          : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-900 hover:border-gray-300 no-underline"
                      }
                    >
                      Chat
                    </Link>
                  </div>
                </div>

                <div className='-mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? <AiOutlineClose /> : <FaBars />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 pt-2 pb-3'>
                <Disclosure.Button
                  as='a'
                  href='/'
                  className={
                    slug.pathname === "/"
                      ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 no-underline"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 no-underline"
                  }
                >
                  Home
                </Disclosure.Button>   
                <Disclosure.Button
                  as='a'
                  href='/books'
                  className={
                    slug.pathname === "/books"
                      ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 no-underline"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 no-underline"
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
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../../contexts/UserContext";
// import { jwtDecode } from "jwt-decode";

// function NavBar() {
//     const { id } = useUserContext();
//     const [isAdmin, setIsAdmin] = useState(false);
//     useEffect(() => {
//         if (id) {
//             const decoded = jwtDecode(id);
//             setIsAdmin(decoded.isAdmin);
//         }
//     }, [id]);
//     return (
//         <div style={{ paddingBottom: 10 }} className="space-x-8">
//             {/* Non logged users routes */}
//             <Link to="/" style={{ paddingRight: 5 }}>
//                 Home
//             </Link>
//             <Link to="/example" style={{ paddingRight: 5 }}>
//                 Example
//             </Link>

//             {/* not logged users */}
//             {!id && (
//                 <>
//                     <Link to="/signup" style={{ paddingRight: 5 }}>
//                         SignUp
//                     </Link>
//                     <Link to="/login" style={{ paddingRight: 5 }}>
//                         Login
//                     </Link>
//                     <Link to="/ssign" style={{ paddingRight: 5 }}>
//                         Staff Sign In
//                     </Link>
//                 </>
//             )}
//             {/* All the logged users routes */}
//             {id && (
//                 <>
//                     <Link to="/studyrooms" style={{ paddingRight: 5 }}>
//                         Study Rooms
//                     </Link>
//                     <Link to="/chat" style={{ paddingRight: 5 }}>
//                         Chat
//                     </Link>
//                 </>
//             )}
//             {/* All the loged non admins routes */}
//             {id && !isAdmin && (
//                 <>
//                     <Link to="/reservations" style={{ paddingRight: 5 }}>
//                         My Reservations
//                     </Link>
//                 </>
//             )}
//             {/* Admin routes */}
//             {id && isAdmin && (
//                 <>
//                     <Link to="/booklist" style={{ paddingRight: 5 }}>
//                         Manage-Books
//                     </Link>
//                     <Link to="/borrowbook" style={{ paddingRight: 5 }}>
//                         BorrowBook
//                     </Link>
//                 </>
//             )}
//         </div>
//     );
}
