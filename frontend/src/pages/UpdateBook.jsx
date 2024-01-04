import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import iziToast from "izitoast";
import axios from "axios";
import { getRootURL, getURL } from "../utils";
import { useUserContext } from "../contexts/UserContext";

const UpdateBook = () => {
    const location = useLocation();
    const slug = location.pathname.split("/")[2];

    const [book, setBook] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const { id } = useUserContext();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        getSingleBooks();
    }, []);

    const getSingleBooks = async () => {
        try {
            const response = await axios.get(getURL("books/" + slug));
            setBook(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are empty
        const name = e.target.elements["book-name"].value;
        const author = e.target.elements["author"].value;
        const price = e.target.elements["price"].value;
        const description = e.target.elements["description"].value;
        const category = e.target.elements["category"].value;

        if (
            !name ||
            !author ||
            !price ||
            !description ||
            !category
            //|| !selectedFile
        ) {
            // Display an iziToast notification for empty fields
            iziToast.error({
                title: "Error",
                message: "Please fill in all the required fields!",
                position: "topRight",
            });
            return; // Stop further execution
        }

        // Create a FormData object to append form data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("author", author);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        if (selectedFile) {
            formData.append("file", selectedFile);
            formData.append("fileName", selectedFile.name);
        } else {
            formData.append("fileName", book.imagePath);
        }

        try {
            await axios.put(getURL("books/" + slug), formData, {
                headers: {
                    "x-auth-token": id,
                },
            });
            setSelectedFile(null);
            iziToast.success({
                title: "Success!",
                message: "Book updated successfully.",
                position: "topRight",
            });
        } catch (err) {
            console.error(err.message);
            iziToast.error({
                title: "Error",
                message: "An error occurred while updating the book.",
                position: "topRight",
            });
        }
    };

    return (
        <>
            <div
                className="container"
                style={{ paddingTop: "6rem", paddingBottom: "2rem" }}
            >
                <form
                    className="space-y-8 divide-y divide-gray-200"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="space-y-6 sm:space-y-5">
                            <div>
                                <h3 className="text-2xl font-bold leading-6 text-gray-900">
                                    Add New Book
                                </h3>
                            </div>

                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="book-name"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Book Name
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="book-name"
                                            id="book-name"
                                            className="block w-full max-w-lg border border-gray-800 px-2 py-1 rounded-md shadow-sm"
                                            defaultValue={book.name}
                                        />
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="author"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Author
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="author"
                                            id="author"
                                            className="block w-full max-w-lg border border-gray-800 px-2 py-1 rounded-md shadow-sm"
                                            defaultValue={book.author}
                                        />
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Price (in LKR)
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="block w-full max-w-lg border border-gray-800 px-2 py-1 rounded-md shadow-sm"
                                            defaultValue={book.price}
                                        />
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={5}
                                            className="block w-full max-w-lg px-2 py-2 rounded-md border border-gray-800 shadow-sm sm:text-sm"
                                            defaultValue={book.description}
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Write a few sentences about Book.
                                        </p>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="file-upload"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Book Cover photo
                                    </label>
                                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                                        <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                {!selectedFile ? (
                                                    <>
                                                        <img
                                                            src={getRootURL(
                                                                "bookCovers/" +
                                                                    book.imagePath
                                                            )}
                                                            alt="current-cover-photo"
                                                            className="w-48"
                                                        />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>
                                                                    Change Cover
                                                                    Image
                                                                </span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="sr-only"
                                                                    onChange={
                                                                        handleFileChange
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            x="0px"
                                                            y="0px"
                                                            width="60"
                                                            height="60"
                                                            viewBox="0 0 72 72"
                                                        >
                                                            <path d="M 25 11 C 20.029 11 16 15.029 16 20 L 16 52 C 16 56.971 20.029 61 25 61 L 47 61 C 51.971 61 56 56.971 56 52 L 56 31 L 42 31 C 38.686 31 36 28.314 36 25 L 36 11 L 25 11 z M 40 11.34375 L 40 25 C 40 26.105 40.896 27 42 27 L 55.65625 27 L 40 11.34375 z M 30.5 38 C 31.881 38 33 39.119 33 40.5 C 33 41.881 31.881 43 30.5 43 C 29.119 43 28 41.881 28 40.5 C 28 39.119 29.119 38 30.5 38 z M 40.550781 44.421875 C 41.173906 44.421125 41.797969 44.642391 42.292969 45.087891 L 48 50.220703 L 48 51 C 48 52.105 47.104 53 46 53 L 26 53 C 24.896 53 24 52.105 24 51 L 24 50.384766 L 27.808594 47.103516 C 28.780594 46.265516 30.219313 46.262656 31.195312 47.097656 L 33.966797 49.46875 L 38.810547 45.091797 C 39.305047 44.645297 39.927656 44.422625 40.550781 44.421875 z"></path>
                                                        </svg>
                                                        <p>
                                                            {selectedFile.name}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <div>
                                        <div
                                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                            id="category"
                                        >
                                            Category
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="flex max-w-lg">
                                            <div className="mt-4 space-y-4">
                                                <select
                                                    id="category"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    name="category"
                                                >
                                                    <option
                                                        value="fiction"
                                                        selected={
                                                            book.category ===
                                                            "fiction"
                                                        }
                                                    >
                                                        Fiction
                                                    </option>
                                                    <option
                                                        value="non-fiction"
                                                        selected={
                                                            book.category ===
                                                            "non-fiction"
                                                        }
                                                    >
                                                        Non-Fiction
                                                    </option>
                                                    <option
                                                        value="poetry"
                                                        selected={
                                                            book.category ===
                                                            "poetry"
                                                        }
                                                    >
                                                        Poetry
                                                    </option>
                                                    <option
                                                        value="drama/play"
                                                        selected={
                                                            book.category ===
                                                            "drama/play"
                                                        }
                                                    >
                                                        Drama / Play
                                                    </option>
                                                    <option
                                                        value="other"
                                                        selected={
                                                            book.category ===
                                                            "other"
                                                        }
                                                    >
                                                        Other
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateBook;
