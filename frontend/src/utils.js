export const getURL = (subPart) => {
    return "http://localhost:3000/api/" + subPart;
};

export const getRootURL = (subPart) => {
    return "http://localhost:3000/" + subPart;
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
