const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const getURL = (subPart) => {
    return `${URL}/api/${subPart}`;
};

export const getRootURL = (subPart) => {
    return `${URL}/${subPart}`;
};

export function formatTimestamp(timestamp) {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "Asia/Colombo",
        hour12: false,
    }).format(date);

    return formattedTime;
}
export function formatTimestampWithTZ(timestamp, timeZone) {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: timeZone,
        hour12: false,
    }).format(date);

    return formattedTime;
}
export function formatDate(timestamp) {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "Asia/Colombo",
    }).format(date);
    return formattedDate;
}
