import React from "react";
import { useExampleContext } from "../../contexts/ExampleContext";
import { useExampleDataContext } from "../../contexts/ExampleDataContext";

function Example2() {
    const { example } = useExampleContext();
    const exampleData = useExampleDataContext();
    return (
        <>
            <div>Display from component 2 : {example}</div>
            <div>
                Fetch data from API :{" "}
                {exampleData ? exampleData : "Fetching...."}
            </div>
        </>
    );
}

export default Example2;
