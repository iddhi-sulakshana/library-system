import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { getURL } from "../utils";

export default function useGetMessages(selectedChat, refresh) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useUserContext();

    useEffect(() => {
        setError(null);
        setLoading(true);
        getMessages();
    }, [selectedChat, refresh, id]);

    function getMessages() {
        if (!id || !selectedChat) {
            setLoading(false);
            setError("User not found");
            return;
        }
        axios
            .request({
                method: "GET",
                url: getURL("chat/messages/" + selectedChat),
                headers: {
                    user: id,
                },
            })
            .then((res) => {
                setMessages(res.data);
                setLoading(false);
            })
            .catch((err) => {
                // check if error is not found error
                if (err.response?.status === 404) {
                    setMessages([]);
                    setLoading(false);
                    return;
                }
                setError(err.response?.data || err.message);
                setLoading(false);
            });
    }
    return { messages, loading, error };
}
