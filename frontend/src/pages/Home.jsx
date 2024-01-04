import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <>
      <div>
        <div className='h-screen flex items-center justify-center overflow-hidden'>
          <img
            src='src/assets/homewall.jpg'
            alt=''
            className='w-full h-full object-cover'
          />
          {/* Dark tint overlay */}
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-45'></div>

          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white'>
            <h2 className='text-5xl font-extrabold mb-4 my-4'>
              Welcome to Library System
            </h2>
            <p className='text-lg text-gray-200'>
              Explore a vast collection of books, reserve study rooms, and
              connect with our library staff through live chat. Your gateway to
              knowledge awaits!
            </p>
            <Link
              className='inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline my-4'
              to={"/book-collection"}
            >
              Explore Collection{" "}
              <span className='pl-2'>
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
