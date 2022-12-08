export function getCount(windowSize) {
    if (windowSize > 768) {
        return { first: 16, extra: 4 };
    } else if (windowSize > 480 && windowSize <= 768) {
        return { first: 8, extra: 2 };
    } else {
        return { first: 5, extra: 2 };
    }
}