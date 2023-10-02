export default function truncateTitle(title, maxLength = 30) {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
}