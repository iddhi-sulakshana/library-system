import AddUser from "../components/Forms/AddUser";
import AddBook from "../components/Forms/AddBook";
import BookTable from "../components/Tables/BookTable";
import UserTable from "../components/Tables/UserTable";

const AddPage = () => {
    return (
        <div>
            <AddUser />
            <UserTable />
            <AddBook />
            <BookTable />
        </div>
    );
};

export default AddPage;
