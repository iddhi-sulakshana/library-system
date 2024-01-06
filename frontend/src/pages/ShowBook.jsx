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
      <div className='py-16 xl:px-32 xl:flex'>
        <div className='pt-16 pl-10 w-full xl:w-1/3'>
          <a
            target='_blank'
            rel='noreferrer'
            href={getRootURL("bookCovers/" + book.imagePath)}
          >
            <img
              src={getRootURL("bookCovers/" + book.imagePath)}
              className='w-[350px] h-[500px] rounded-lg object-cover'
              alt='book-cover-image'
            />
          </a>
        </div>
        <div className='mt-[68px] ml-10 w-full xl:w-2/3'>
          <p className='text-4xl font-bold'>{book.name}</p>
          <p className='text-md font-semibold capitalize'>
            Author:&nbsp;&nbsp;&nbsp;{" "}
            <span className='font-normal'>{book.author}</span>
          </p>
          <p className='text-md font-semibold capitalize'>
            Market Price:&nbsp;&nbsp;&nbsp;{" "}
            <span className='font-normal'>{book.price} LKR</span>
          </p>
          <p className='text-md font-semibold'>
            Book ID :&nbsp;&nbsp;&nbsp;{" "}
            <span className='font-normal'>{book.bookId}</span>
          </p>
          <p className='text-md font-semibold'>
            Genere :&nbsp;&nbsp;&nbsp;{" "}
            <span className='font-normal bg-green-400 px-2 py-1 rounded-lg capitalize'>
              {book.category}
            </span>
          </p>
          <br />
          <p className='text-md font-semibold'>Description :</p>
          <p className='text-md font-normal italic pr-12'>{book.description}</p>
        </div>
      </div>
    </>
  );
};

export default ShowBook;
