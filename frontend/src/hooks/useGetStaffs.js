import axios from "axios";
import { useEffect, useState } from "react";
import { getURL } from "../utils";
import { useUserContext } from "../contexts/UserContext";

export default function useGetStaffs() {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const { id } = useUserContext();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        setStaffs([]);
        axios
            .request({
                method: "GET",
                url: getURL("staff"),
                headers: {
                    "x-auth-token": id,
                },
            })
            .then((res) => {
                setStaffs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            });
    }, [id, refresh]);

    return { staffs, loading, error, setRefresh, refresh };
}
