import { getTransactions, getBudgets, getInvestments } from '@/lib/cosmic'
import StatCard from '@/components/StatCard'
import DashboardCharts from '@/components/DashboardCharts'
import TransactionList from '@/components/TransactionList'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default async function HomePage() {
  const [transactions, budgets, investments] = await Promise.all([
    getTransactions(),
    getBudgets(),
    getInvestments(),
  ])

  const totalIncome = transactions
    .filter(t => t.metadata?.type === 'Income')
    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)

  const totalExpense = transactions
    .filter(t => t.metadata?.type === 'Expense')
    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)

  const balance = totalIncome - totalExpense

  const totalInvested = investments.reduce(
    (sum, i) => sum + (Number(i.metadata?.current_value) || 0),
    0
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          value={`$${balance.toLocaleString()}`}
          icon={Wallet}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={TrendingUp}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Expenses"
          value={`$${totalExpense.toLocaleString()}`}
          icon={TrendingDown}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          title="Investments"
          value={`$${totalInvested.toLocaleString()}`}
          icon={DollarSign}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      <div className="mb-8">
        <DashboardCharts transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          </div>
          <TransactionList transactions={transactions} limit={5} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Budget Status</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{budgets.length} active</span>
          </div>
          <div className="card p-6">
            {budgets.length > 0 ? (
              <div className="space-y-4">
                {budgets.slice(0, 4).map(budget => {
                  const limit = Number(budget.metadata?.limit_amount) || 0
                  const budgetCategoryId = budget.metadata?.category?.id
                  const spent = transactions
                    .filter(t =>
                      t.metadata?.type === 'Expense' &&
                      t.metadata?.category?.id === budgetCategoryId
                    )
                    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)
                  const pct = limit > 0 ? (spent / limit) * 100 : 0
                  const color = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-500' : 'bg-green-500'

                  return (
                    <div key={budget.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900 dark:text-white truncate">
                          {budget.metadata?.budget_name || budget.title}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          ${spent.toLocaleString()} / ${limit.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">No budgets set up yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}