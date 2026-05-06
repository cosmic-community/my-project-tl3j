import { getTransactions } from '@/lib/cosmic'
import TransactionList from '@/components/TransactionList'

export default async function TransactionsPage() {
  const transactions = await getTransactions()

  const totalIncome = transactions
    .filter(t => t.metadata?.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)

  const totalExpense = transactions
    .filter(t => t.metadata?.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">All your income and expenses</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            ${totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            ${totalExpense.toLocaleString()}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
          <p className={`text-2xl font-bold mt-1 ${totalIncome - totalExpense >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
            ${(totalIncome - totalExpense).toLocaleString()}
          </p>
        </div>
      </div>

      <TransactionList transactions={transactions} />
    </div>
  )
}