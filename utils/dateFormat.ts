export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', { timeZone: 'UTC' });
}

export const getFirstDayOfMonth = (chosenDate: number | string | Date) => {
    const date = new Date(chosenDate), y = date.getFullYear(), m = date.getMonth();
    return new Date(y, m, 1)
        .toISOString()
}

export const getLastDayOfMonth = (chosenDate: number | string | Date) => {
    const date = new Date(chosenDate)
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
        .toISOString()
}
