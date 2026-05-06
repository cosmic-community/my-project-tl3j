'use client'

import { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(60)

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    const monthlyRate = rate / 12 / 100
    const emi = monthlyRate === 0
      ? principal / tenure
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
    const totalAmount = emi * tenure
    const totalInterest = totalAmount - principal
    return {
      emi: isFinite(emi) ? emi : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
      totalAmount: isFinite(totalAmount) ? totalAmount : 0,
    }
  }, [principal, rate, tenure])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Calculator className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loan Details</h2>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount</label>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ${principal.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tenure (months)</label>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{tenure} months</span>
            </div>
            <input
              type="range"
              min="6"
              max="360"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value) || 0)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Calculation Results</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90">Monthly EMI</p>
            <p className="text-4xl font-bold mt-1">
              ${emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Principal</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                ${principal.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Interest</p>
              <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 mt-1">
                ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Payment</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              ${totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}