import { useState, useEffect } from "react";
import { getURL } from "../utils";
import { getRootURL } from "../utils";
import axios from "axios";
import { keyBy } from "lodash";
import { Link } from "react-router-dom";

const BookListFrontend = () => {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    // Update filtered books when searchInput or books change
    filterBooks();
  }, [searchInput, books]);

  const filterBooks = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.name.toLowerCase().includes(lowerCaseSearch) ||
        String(book.bookId).includes(lowerCaseSearch) ||
        book.author.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredBooks(filtered);
  };

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
      <div className='pt-16'>
        {/* input feild */}
        <div className='flex justify-center py-10 '>
          <div className='w-1/2'>
            <input
              type='text'
              placeholder='Search Books by Name or Author'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className='grid grid-cols-5 gap-3 px-8 '>
          {/* last added books showing first */}
          {filteredBooks
            .slice()
            .reverse()
            .map(
              (book) => (
                keyBy(book, "id"),
                (
                  <Link
                    to={`/show-book/${book.bookId}`}
                    className='text-black no-underline'
                    state={{ bookId: book.bookId }}
                  >
                    <div className='pt-6 pb-2 hover:bg-[#cfc9fd87] hover:transform hover:scale-110 transition-transform duration-250 ease-in-out hover:rounded-xl'>
                      <div className='text-center'>
                        <img
                          src={getRootURL("bookCovers/" + book.imagePath)}
                          alt='book-cover-image'
                          className='w-40 h-60 object-cover mx-auto rounded-md'
                        />
                      </div>
                      <div className='text-center pt-2 '>
                        <h2 className='text-sm font-semibold'>{book.name}</h2>
                        <p className='text-sm text-gray-500'>{book.author}</p>
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
