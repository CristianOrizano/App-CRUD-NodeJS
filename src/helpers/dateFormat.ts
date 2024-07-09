

export const formatToISODate = (dateString: string): string => {
    return new Date(dateString).toISOString();
};