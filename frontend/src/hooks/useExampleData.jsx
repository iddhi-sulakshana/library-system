import { useState, useEffect } from "react";
import axios from "axios";

export default function useExampleData() {
    const [exampleData, setExampleData] = useState(null);

    useEffect(() => {
        fetchDataFromApi()
            .then((data) => setExampleData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const fetchDataFromApi = async () => {
        let config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: "https://catfact.ninja/fact",
            headers: {},
        };
        try {
            const response = await axios.request(config);
            return response.data.fact;
        } catch (error) {
            throw error;
        }
    };

    return exampleData;
}
