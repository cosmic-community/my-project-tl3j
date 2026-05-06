import type { Transaction } from '@/types'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { getMetafieldValue } from '@/lib/cosmic'

interface TransactionListProps {
  transactions: Transaction[]
  limit?: number
}

export default function TransactionList({ transactions, limit }: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
      </div>
    )
  }

  const displayed = limit ? transactions.slice(0, limit) : transactions

  return (
    <div className="card overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-slate-700">
        {displayed.map((transaction) => {
          if (!transaction || !transaction.id) return null
          
          const isIncome = transaction.metadata?.type === 'Income'
          const amount = Number(transaction.metadata?.amount) || 0
          const description = transaction.metadata?.description || transaction.title
          const category = transaction.metadata?.category
          const categoryName = category?.metadata?.name || category?.title || 'Uncategorized'
          const categoryColor = category?.metadata?.color || '#6b7280'
          const date = transaction.metadata?.date

          return (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    {isIncome ? (
                      <ArrowDownRight className="text-green-600 dark:text-green-400" size={20} />
                    ) : (
                      <ArrowUpRight className="text-red-600 dark:text-red-400" size={20} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                        style={{ backgroundColor: categoryColor }}
                      >
                        {getMetafieldValue(categoryName)}
                      </span>
                      {date && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {(() => {
                            try {
                              return format(parseISO(date), 'MMM d, yyyy')
                            } catch {
                              return date
                            }
                          })()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold text-right whitespace-nowrap ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isIncome ? '+' : '-'}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}