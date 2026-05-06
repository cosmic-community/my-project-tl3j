import { getBudgets, getTransactions } from '@/lib/cosmic'
import BudgetCard from '@/components/BudgetCard'

export default async function BudgetsPage() {
  const [budgets, transactions] = await Promise.all([
    getBudgets(),
    getTransactions(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budgets</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Plan and track your spending limits</p>
      </div>

      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map(budget => (
            <BudgetCard key={budget.id} budget={budget} transactions={transactions} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No budgets created yet</p>
        </div>
      )}
    </div>
  )
}