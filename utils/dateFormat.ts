export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', { timeZone: 'UTC' });
}

export const getLastDayOfCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate()
}