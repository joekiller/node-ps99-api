
export const GIGANTIX_SUFFIXES = [
    "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc",
    "UD", "DD", "TD", "QaD", "QiD", "SxD", "SpD", "OcD", "NnD", "Vi",
    "UVg", "DVg", "TVg", "QaVg", "QiVg", "SxVg", "SpVg", "OcVg", "NoVg", "Tg",
    "QaG", "QiG", "SxG", "SpG", "OcG", "NoG", "Ce"
];

export function formatGigantix(value: number | string, decimals = 2): string {
    if (!value) return "0";

    let num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) return "0";
    if (num < 1000) {
        // Round to decimals (default 2), remove trailing zeros
        return parseFloat(num.toFixed(decimals)).toString();
    }

    // Find the tier (power of 1000)
    // log1000(num) = log10(num) / 3
    const tier = Math.floor(Math.log10(num) / 3);

    // Ensure we don't exceed our defined suffixes
    if (tier >= GIGANTIX_SUFFIXES.length) {
        return num.toExponential(decimals);
    }

    const suffix = GIGANTIX_SUFFIXES[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;

    // Format to desired decimals, removing trailing zeros if needed
    let formatted = scaled.toFixed(decimals);
    if (formatted.indexOf('.') !== -1) {
        formatted = formatted.replace(/\.?0+$/, '');
    }

    return `${formatted}${suffix}`;
}
