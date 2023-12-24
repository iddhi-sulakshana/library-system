import React from 'react'
import  { useState } from 'react';
import axios from 'axios';

const AddBook = () => {

    const [formData, setBookData] = useState({
        bookid:'',
        name:'',
        author:'',
        price:'',
        book_image:'',
       
    
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...formData, [name]: value });
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        
       
        console.log(formData);
  
        
         
              axios.post('http://localhost:5000/books/bookregister', 
              formData,
              
              )
              .then((response) => {
                // Handle success (e.g., show a success message, reset the form)
                console.log("Book added successfully");
                // Reset the form fields
                setBookData({
                    bookid:'',
                    name:'',
                    author:'',
                    price:'',
                    book_image:'',
                });
              })
              .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error("Error adding User:", error);
              });
              
      }
  


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book ID:</label>
          <input type="text" className="form-control" name="bookid" value={formData.bookid || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label  className="form-label">Book Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label  className="form-label">Author:</label>
          <input type="text" className="form-control" name="author" value={formData.author || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label  className="form-label">Book Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label  className="form-label">Book Image:</label>
          <input type="file" className="form-control" name="book_image" value={formData.book_image || ''} onChange={handleChange} required />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

export default AddBook;
