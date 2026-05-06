export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type CategoryType = 'Income' | 'Expense';
export type TransactionType = 'Income' | 'Expense';
export type BudgetPeriod = 'Weekly' | 'Monthly' | 'Yearly';
export type UserRole = 'Admin' | 'User';
export type InvestmentType = 'Stocks' | 'Mutual Funds' | 'Bonds' | 'Real Estate' | 'Crypto' | 'Other';

export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name?: string;
    email?: string;
    role?: UserRole;
    avatar?: { url: string; imgix_url: string };
    bio?: string;
    notifications_enabled?: boolean;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    type?: CategoryType;
    icon?: string;
    color?: string;
  };
}

export interface Transaction extends CosmicObject {
  type: 'transactions';
  metadata: {
    description?: string;
    amount?: number;
    type?: TransactionType;
    date?: string;
    category?: Category;
    user?: User;
    notes?: string;
    receipt?: { url: string; imgix_url: string };
  };
}

export interface Budget extends CosmicObject {
  type: 'budgets';
  metadata: {
    budget_name?: string;
    limit_amount?: number;
    period?: BudgetPeriod;
    start_date?: string;
    category?: Category;
    user?: User;
    alert_threshold?: number;
  };
}

export interface Investment extends CosmicObject {
  type: 'investments';
  metadata: {
    investment_name?: string;
    investment_type?: InvestmentType;
    amount_invested?: number;
    current_value?: number;
    purchase_date?: string;
    user?: User;
    notes?: string;
  };
}