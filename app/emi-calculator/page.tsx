import EmiCalculator from '@/components/EmiCalculator'

export default function EmiCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Calculate your loan EMI easily</p>
      </div>
      <EmiCalculator />
    </div>
  )
}