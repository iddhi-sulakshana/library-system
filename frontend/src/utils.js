export const getURL = (subPart) => {
    return "http://localhost:3000/api/" + subPart;
};

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Colombo",
        hour12: false,
    }).format(date);

    return formattedTime;
}
