import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import iziToast from "izitoast";
import { getURL } from "../utils";
import { useUserContext } from "../contexts/UserContext";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { id: userId } = useUserContext();

    useEffect(() => {
        getBooks();
    }, [refresh]);

    const getBooks = async () => {
        try {
            const response = await axios.get(getURL("books"));
            setBooks(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteBook = async (id, bookname) => {
        try {
            // Show SweetAlert confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure?",
                html: `<strong>${bookname}</strong> will not be available in the library anymore!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });
            // If user confirms, proceed with deletion
            if (result.isConfirmed) {
                await axios.delete(getURL(`books/${id}`), {
                    headers: {
                        "x-auth-token": userId,
                    },
                });
                setRefresh(!refresh);
                iziToast.success({
                    title: "Success!",
                    message: "Book deleted successfully.",
                    position: "topRight",
                });
            }
        } catch (err) {
            // Handle error, e.g., show an error message
            console.error(err.message);
            Swal.fire(
                "Error!",
                "An error occurred while deleting the book.",
                "error"
            );
        }
    };

    return (
        <div className="container" style={{ paddingTop: "5rem" }}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manage Books
                        </h1>
                        <p className="mt-3 text-sm text-gray-700">
                            A list of all Books Currently avaible in the library
                            click show to increase the quantity of the books and
                            view more details about the book
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to={"/addbook"}
                            className="no-underline inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add Book
                        </Link>
                    </div>
                </div>
                <div className="mt-14 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                            >
                                                Book-Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Author
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Price
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Quantity
                                            </th> */}
                                            {/* <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Current Available
                                            </th> */}
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {books.map((book) => (
                                            <tr key={book.bookId}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                    {book.bookId}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {book.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {book.author}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {book.category}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {book.price}
                                                </td>
                                                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {book.price}
                                                </td> */}
                                                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    in progress
                                                </td> */}
                                                <td className="relative space-x-3 whitespace-nowrap py-4 pl-3 text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded border border-transparent bg-yellow-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                                    >
                                                        Show
                                                    </button>
                                                    <Link
                                                        to={`/updatebook/${book.bookId}`}
                                                        className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 no-underline"
                                                    >
                                                        Update
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                        onClick={() =>
                                                            deleteBook(
                                                                book.bookId,
                                                                book.name
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksList;
