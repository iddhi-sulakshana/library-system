import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { getURL } from "../utils";

export default function useGetAvailableBooks() {
    const [availableBooks, setAvailableBooks] = useState([]);
    const { id } = useUserContext();
    useEffect(() => {
        if (!id) return;
        axios
            .request({
                method: "GET",
                url: getURL("books/available"),
                headers: {
                    "x-auth-token": id,
                },
            })
            .then((res) => {
                setAvailableBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return availableBooks;
}
