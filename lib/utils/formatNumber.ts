export function formatNumber(
    value?: number,
    fallback: string = "-"
): string {
    if (value === undefined || value === null) {
        return fallback;
    }

    if (Number.isNaN(value)) {
        return fallback;
    }

    return value.toLocaleString("ko-KR");
}