export const parseSortString = (value: 'asc' | 'desc') => {
    return value === 'asc' ? 1 : -1;
}