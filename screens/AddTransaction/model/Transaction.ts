export type Transaction = {
    type: 'expense' | 'income',
    amount: number,
    date: Date,
    categories?: []
}