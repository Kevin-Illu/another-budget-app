import { Box, Card } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import ExpensesForm from '../../components/expenses/expenses.form'
import ExpenseMetricsComponent from '../../components/metrics/expense-metrics/expense-metrics.component'
import type { Expense, NewExpense } from '../../infraestructure/database/db'
import ExpensesTable from '../../components/expenses/expenses.table'
import { addExpense, removeExpense, updateExpense, useExpenses } from '../../services/expenses.service'
import { useState } from 'react'

export const Route = createFileRoute('/expenses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { expenses = null } = useExpenses();
  const [expenseTemp, setExpenseTemp] = useState<Expense | null>(null);

  const handleSubmit = (expense: Expense | NewExpense) => {
    const { id, ...values } = expense as Expense;

    if (id) {
      updateExpense(id, values);
      return;
    }

    addExpense({
      ...values,
      currency: "GTQ",
    })
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <div className='flex justify-between items-center text-gray-500'>
        <h4>Your expenses</h4>
      </div>

      <div className='w-full flex justify-between items-start h-full pt-4 gap-8'>
        <div className='flex flex-col'>
          <div className='mb-4'>
            <ExpenseMetricsComponent />
          </div>
          <Card className='p-8' sx={{ maxWidth: 600, width: '100%' }}>
            <ExpensesForm expense={expenseTemp} onSubmit={handleSubmit} />
          </Card>
        </div>
        <div className='flex-1 h-full w-full'>
          <div className='mb-4 h-full'>
            <h3 className='text-lg font-semibold'>Expenses</h3>
            <ExpensesTable expenses={expenses} onDelete={removeExpense} onEdit={setExpenseTemp} />
          </div>
        </div>
      </div>
    </Box>
  )
}
