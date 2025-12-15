/**
 * Formats a date string into a user-friendly format (pt-BR).
 * Example: 2025-10-15T00:00:00.000Z -> "15 de outubro de 2025"
 * @param {string} dateString - The ISO date string or Date object.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateString) {
    if (!dateString) return ''
    try {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date)
    } catch (e) {
        console.error('Invalid date', dateString)
        return dateString
    }
}
