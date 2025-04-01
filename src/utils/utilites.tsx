export const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-GB'); 
};

export const formatTime = (isoString?: string): string => {
    if (!isoString) return ""; 

    const date = new Date(isoString);
    return isNaN(date.getTime()) ? "" : date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }); 
};