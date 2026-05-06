import type { Budget, Transaction } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface BudgetCardProps {
  budget: Budget
  transactions: Transaction[]
}

export default function BudgetCard({ budget, transactions }: BudgetCardProps) {
  if (!budget || !budget.id) return null

  const limitAmount = Number(budget.metadata?.limit_amount) || 0
  const budgetCategoryId = budget.metadata?.category?.id
  const period = budget.metadata?.period || 'Monthly'
  const alertThreshold = Number(budget.metadata?.alert_threshold) || 80

  // Calculate spent in this category
  const spent = transactions
    .filter(t => 
      t.metadata?.type === 'Expense' && 
      t.metadata?.category?.id === budgetCategoryId
    )
    .reduce((sum, t) => sum + (Number(t.metadata?.amount) || 0), 0)

  const percentage = limitAmount > 0 ? (spent / limitAmount) * 100 : 0
  const isOverThreshold = percentage >= alertThreshold
  const isOverBudget = percentage >= 100

  const progressColor = isOverBudget 
    ? 'bg-red-500' 
    : isOverThreshold 
      ? 'bg-yellow-500' 
      : 'bg-green-500'

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {getMetafieldValue(budget.metadata?.budget_name) || budget.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {getMetafieldValue(period)} • {budget.metadata?.category?.title || 'No category'}
          </p>
        </div>
        {isOverBudget && (
          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium">
            Over budget
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            ${spent.toLocaleString()} of ${limitAmount.toLocaleString()}
          </span>
          <span className={`font-medium ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${progressColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}