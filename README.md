# FinanceFlow - Personal Finance Management

![App Preview](https://imgix.cosmicjs.com/f3528b50-4915-11f1-aa98-23017b7b0cbd-autopilot-photo-1590283603385-17ffb3a7f29f-1778049405053.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A comprehensive personal finance management application built with Next.js 16 and Cosmic CMS. Track income, expenses, budgets, and investments with beautiful charts and analytics.

## Features

- 📊 Financial dashboard with real-time analytics
- 💸 Income and expense tracking with categories
- 🎯 Budget planning with alert thresholds
- 📈 Investment portfolio tracker
- 🧮 EMI calculator
- 🌙 Dark mode toggle
- 📱 Fully responsive mobile-first design
- 📉 Beautiful charts powered by Recharts

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69fae130a963c4f5f0d97c42&clone_repository=69fae240a963c4f5f0d97d0b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Build a full-stack Finance Management App. Tech Stack: - React - Node.js - Express - MongoDB - Tailwind CSS Features: - Income and expense tracking - Budget planning - Investment tracker - EMI calculator - Financial dashboard - Charts and analytics - Export reports - Multi-user authentication - Admin analytics - Notification reminders Use JWT authentication nd responsive UI. Create REST APIs and dashboard chartas. Add dark mode and mobile responsiveness."

### Code Generation Prompt

> Build a full-stack Finance Management App. Tech Stack: React, Node.js, Express, MongoDB, Tailwind CSS. Features: Income and expense tracking, Budget planning, Investment tracker, EMI calculator, Financial dashboard, Charts and analytics, Export reports, Multi-user authentication, Admin analytics, Notification reminders. Use JWT authentication and responsive UI. Create REST APIs and dashboard charts. Add dark mode and mobile responsiveness.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS
- Recharts for data visualization
- date-fns for date formatting

## Getting Started

### Prerequisites
- Bun (or Node.js 18+)
- A Cosmic account with the required content model

### Installation

1. Clone the repository
2. Install dependencies: `bun install`
3. Add environment variables (see below)
4. Run the development server: `bun run dev`

## Cosmic SDK Examples

```typescript
// Fetch all transactions with related data
const response = await cosmic.objects
  .find({ type: 'transactions' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following object types from your Cosmic bucket:
- **Users** - User profiles
- **Categories** - Income/expense categories
- **Transactions** - Financial transactions
- **Budgets** - Budget plans
- **Investments** - Investment portfolio

## Deployment Options

Deploy to Vercel or Netlify with environment variables configured.

<!-- README_END -->