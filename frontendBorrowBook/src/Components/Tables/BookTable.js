import React, { useState, useEffect } from 'react'

import axios from "axios";


const BookTable = () => {

   const [BookData, setBookData] = useState([]);
   const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {

     axios
      .get(`http://localhost:5000/books/bookregister`)
    .then((response) => {
      
     setBookData(response.data);
    })
   
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
    });

    axios
    .get('http://localhost:5000/borrowbook/borrowbookregister')
    .then((response) => {
      setBorrowedBooks(response.data);
    })
    .catch((error) => {
      console.error('Error fetching borrowed books:', error);
    });
   
  }, []);

  const isBookAvailable = (bookid) => {
    // Check if the bookid exists in the BorrowBook collection
    const borrowedBook = borrowedBooks.find((book) => book.bookid === bookid);
    return !borrowedBook; // If borrowedBook is undefined, the book is available
  };

  
 

  return (
    <div className="">

     {/* Your CSS styles for the table */}
     <style> 
      {`
        /* YourTableComponent.css */

        /* Custom styles for the entire table */
        .table {
            font-size: 16px;
            background-color: lightblue;
          }
          
          /* Custom styles for table headers */
          .table th {
            background-color: #ff000d; /* Header background color */
            color: white; /* Header text color */
          }
          
          /* Custom styles for table rows */
          .table tr:nth-child(even) {
            background-color: #f2f2f2; /* Alternate row background color */
          }
          
          /* Define more custom styles as needed */
          
      `}
     </style>




    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Book Name</th>
          <th>Book Author</th>
          <th>Price</th>
          <th>book_image</th>
        </tr>
      </thead>
      <tbody>
      {BookData.map((row,index) => (
           <tr key={index}>
              <td>{row.bookid}</td>
              <td>{row.name}</td>
              <td>{row.author}</td>
              <td>{row.price}</td>
              <td>{row.book_image}</td>
              <td>{isBookAvailable(row.bookid) ? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}

export default BookTable