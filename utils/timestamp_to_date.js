export const timestampToDate = (stamp) => {
    const getDate = new Date(stamp);
    const day = getDate.toLocaleString("us",{day:"numeric"});
    const month = getDate.toLocaleString("us",{month:"short"});
    const year = getDate.getFullYear();

    return `${day} ${month}, ${year}`
}