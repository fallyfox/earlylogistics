 // tracking number generator
export function getTrackingId () {
    const now = new Date();
    const month = now.toLocaleString("us",{month:"2-digit"});
    const year = now.getFullYear();
    const rand1 = Math.floor(Math.random() * 10000);
    const rand2 = Math.floor(Math.random() * 10000);

    return `${month}-${rand1}-${rand2}-${year}`;
}