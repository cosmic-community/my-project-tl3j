'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Transaction } from '@/types'
import { format, startOfMonth, parseISO } from 'date-fns'

interface DashboardChartsProps {
  transactions: Transaction[]
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f43f5e']

export default function DashboardCharts({ transactions }: DashboardChartsProps) {
  // Monthly data
  const monthlyMap = new Map<string, { income: number; expense: number }>()
  
  transactions.forEach(t => {
    if (!t.metadata?.date || !t.metadata?.amount) return
    try {
      const monthKey = format(startOfMonth(parseISO(t.metadata.date)), 'MMM yyyy')
      const existing = monthlyMap.get(monthKey) || { income: 0, expense: 0 }
      const amount = Number(t.metadata.amount) || 0
      if (t.metadata.type === 'Income') {
        existing.income += amount
      } else {
        existing.expense += amount
      }
      monthlyMap.set(monthKey, existing)
    } catch (e) {
      // skip invalid dates
    }
  })

  const monthlyData = Array.from(monthlyMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .slice(-6)

  // Category breakdown for expenses
  const categoryMap = new Map<string, number>()
  transactions
    .filter(t => t.metadata?.type === 'Expense')
    .forEach(t => {
      const catName = t.metadata?.category?.metadata?.name || t.metadata?.category?.title || 'Other'
      const amount = Number(t.metadata?.amount) || 0
      categoryMap.set(catName, (categoryMap.get(catName) || 0) + amount)
    })

  const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Income vs Expenses</h3>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">No data available</p>
        )}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expenses by Category</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">No expense data available</p>
        )}
      </div>
    </div>
  )
}