export const formatPrice = (value) => {
    if (value === 0 || value === null || value === undefined) return 'Gratuito'
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}
