import { getInvestments } from '@/lib/cosmic'
import InvestmentCard from '@/components/InvestmentCard'

export default async function InvestmentsPage() {
  const investments = await getInvestments()

  const totalInvested = investments.reduce(
    (sum, i) => sum + (Number(i.metadata?.amount_invested) || 0),
    0
  )
  const totalCurrent = investments.reduce(
    (sum, i) => sum + (Number(i.metadata?.current_value) || 0),
    0
  )
  const totalProfit = totalCurrent - totalInvested
  const totalPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Track your investment performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${totalInvested.toLocaleString()}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            ${totalCurrent.toLocaleString()}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Returns</p>
          <p className={`text-2xl font-bold mt-1 ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()} ({totalPercentage.toFixed(2)}%)
          </p>
        </div>
      </div>

      {investments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No investments tracked yet</p>
        </div>
      )}
    </div>
  )
}