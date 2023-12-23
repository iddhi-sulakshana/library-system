import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../utils";
import { useUserContext } from "../contexts/UserContext";

export default function useGetUsers(refresh) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useUserContext();

    useEffect(() => {
        setError(null);
        setLoading(true);
        getUsers();
    }, [refresh, id]);
    function getUsers() {
        if (!id) {
            setLoading(false);
            setError("User not found");
            return;
        }
        axios
            .request({
                method: "GET",
                url: getURL("chat/users"),
                headers: {
                    user: id,
                },
            })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                // check if error is not found error
                if (err.response?.status === 404) {
                    setUsers([]);
                    setLoading(false);
                    return;
                }
                setError(err.response?.data || err.message);
                setLoading(false);
            });
    }
    return { users, loading, error };
}
