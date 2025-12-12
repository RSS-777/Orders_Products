export const dataCompare = (start: string | Date, end: string | Date): boolean => {
    if (!start || !end) return false;
    const startDate = typeof start === 'string' ? new Date(start) : start;
    const endDate = typeof end === 'string' ? new Date(end) : end;
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;
    return endDate.getTime() >= startDate.getTime();
};