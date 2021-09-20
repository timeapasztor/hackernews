export const getStoryTime = (timestamp: number) => {
    const timestampInMs = timestamp * 1000;
    const dateObject = new Date(timestampInMs);
    return dateObject.toLocaleString();
}


