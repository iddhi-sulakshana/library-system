import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { getURL } from "../utils";

export default function useGetAllUsersEmail() {
    const [usersEmail, setUsersEmail] = useState([]);
    const { id } = useUserContext();
    useEffect(() => {
        if (!id) return;
        axios
            .request({
                method: "GET",
                url: getURL("users/all"),
                headers: {
                    "x-auth-token": id,
                },
            })
            .then((res) => {
                setUsersEmail(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return usersEmail;
}
