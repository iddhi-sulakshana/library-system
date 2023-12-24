import React from 'react'
import AddUser from './Forms/AddUser'
import AddBook from './Forms/AddBook';
import BookTable from './Tables/BookTable';
import UserTable from './Tables/UserTable';

const AddPage = () => {
  return (
    <div>
      <AddUser/>
      <UserTable/>
      <AddBook/>
      <BookTable/>
    </div>
  )
}

export default AddPage;
