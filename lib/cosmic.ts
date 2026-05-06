import { createBucketClient } from '@cosmicjs/sdk'
import type { Transaction, Category, Budget, Investment, User } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'transactions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const transactions = response.objects as Transaction[]
    return transactions.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime()
      const dateB = new Date(b.metadata?.date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch transactions')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getBudgets(): Promise<Budget[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'budgets' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Budget[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch budgets')
  }
}

export async function getInvestments(): Promise<Investment[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'investments' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Investment[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch investments')
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as User[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch users')
  }
}