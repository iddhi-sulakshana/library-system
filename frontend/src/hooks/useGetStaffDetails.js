import { useState, useEffect } from "react";
import axios from "axios";
import { getURL } from "../utils";
import { useUserContext } from "../contexts/UserContext";

export default function useGetStaffDetails() {
    const [staffDetails, setStaffDetails] = useState(null);
    const { id } = useUserContext();
    useEffect(() => {
        if (!id) return setStaffDetails(null);
        axios
            .request({
                method: "GET",
                url: getURL("staff/personal"),
                headers: {
                    "x-auth-token": id,
                },
            })
            .then((res) => {
                setStaffDetails(res.data);
            })
            .catch((err) => {
                setStaffDetails(null);
            });
    }, [id]);

    return { staffDetails };
}
