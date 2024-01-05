import { useState, useEffect } from "react";
import { getURL } from "../utils";
import { getRootURL } from "../utils";
import axios from "axios";
import { keyBy } from "lodash";
import { Link } from "react-router-dom";

const BookListFrontend = () => {
    useEffect(() => {
        getBooks();
    }, []);

    const [books, setBooks] = useState([]);
    const getBooks = async () => {
        try {
            const response = await axios.get(getURL("books"));
            setBooks(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <>
            <div className="pt-16">
                <div className="grid grid-cols-5 gap-3 px-8 py-10">
                    {/* last added books showing first */}
                    {books
                        .slice()
                        .reverse()
                        .map(
                            (book) => (
                                keyBy(book, "id"),
                                (
                                    <Link
                                        to={`/borrowbook`}
                                        className="text-black no-underline"
                                        state={{ bookId: book.bookId }}
                                    >
                                        <div className="pt-6 pb-2 hover:bg-[#cfc9fd87] hover:transform hover:scale-110 transition-transform duration-250 ease-in-out hover:rounded-xl">
                                            <div className="text-center">
                                                <img
                                                    src={getRootURL(
                                                        "bookCovers/" +
                                                            book.imagePath
                                                    )}
                                                    alt="book-cover-image"
                                                    className="w-40 h-60 object-cover mx-auto rounded-md"
                                                />
                                            </div>
                                            <div className="text-center pt-2 ">
                                                <h2 className="text-sm font-semibold">
                                                    {book.name}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    {book.author}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )
                        )}
                </div>
            </div>
        </>
    );
};
export default BookListFrontend;
