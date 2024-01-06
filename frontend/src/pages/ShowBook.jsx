import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getURL, getRootURL } from "../utils";

const ShowBook = () => {
  const location = useLocation();
  const slug = location.pathname.split("/")[2];

  const [book, setBook] = useState([]);

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
  return (
    <>
      <div className='py-16 px-10'>
        <div className="pt-16 pl-10">
          <img src={getRootURL("bookCovers/" + book.imagePath)} className="w-72 rounded-lg" alt='book-cover-image' />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default ShowBook;
