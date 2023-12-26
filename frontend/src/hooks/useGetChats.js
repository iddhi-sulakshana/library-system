import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { getURL } from "../utils";

export default function useGetChats(refresh) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useUserContext();

    useEffect(() => {
        setError(null);
        setLoading(true);
        getChats();
    }, [refresh, id]);

    function getChats() {
        if (!id) {
            setLoading(false);
            setError("User not found");
            return;
        }
        axios
            .request({
                method: "GET",
                url: getURL("chat/all"),
                headers: {
                    user: id,
                },
            })
            .then((res) => {
                setChats(res.data);
                setLoading(false);
            })
            .catch((err) => {
                // check if error is not found error
                if (err.response?.status === 404) {
                    setChats([]);
                    setLoading(false);
                    return;
                }
                setError(err.response?.data || err.message);
                setLoading(false);
            });
    }
    return { chats, loading, error };
}
