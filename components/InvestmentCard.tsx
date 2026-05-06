import type { Investment } from '@/types'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { getMetafieldValue } from '@/lib/cosmic'

interface InvestmentCardProps {
  investment: Investment
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  if (!investment || !investment.id) return null

  const invested = Number(investment.metadata?.amount_invested) || 0
  const current = Number(investment.metadata?.current_value) || 0
  const profit = current - invested
  const percentage = invested > 0 ? (profit / invested) * 100 : 0
  const isProfitable = profit >= 0

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {getMetafieldValue(investment.metadata?.investment_name) || investment.title}
          </h3>
          <span className="inline-block mt-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium">
            {getMetafieldValue(investment.metadata?.investment_type) || 'Other'}
          </span>
        </div>
        <div className={`flex items-center gap-1 ${isProfitable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isProfitable ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span className="font-semibold">{percentage.toFixed(2)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Invested</p>
          <p className="font-semibold text-gray-900 dark:text-white">${invested.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
          <p className="font-semibold text-gray-900 dark:text-white">${current.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Profit/Loss</span>
          <span className={`font-bold ${isProfitable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isProfitable ? '+' : ''}${profit.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}