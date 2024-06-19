export function shortenBigValue(input) {
    if (input > 1000000) {
        return `${Math.round(input / 1000000)}M`;
    } else if (input > 1000) {
        return `${Math.round(input / 1000)}K`;
    } else {
        return input;
    }
}

export function decimalSeparators(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}