import { useLiveQuery } from "dexie-react-hooks";
import { db, type Expense, type NewExpense } from "../infraestructure/database/db";

function useExpenses() {
  const expenses = useLiveQuery(() => db.expense.toArray());
  return {
    expenses
  };
}

async function addExpense(expense: NewExpense) {
  return db.expense.add(expense);
}

async function removeExpense(expenseId: number) {
  return db.expense.delete(expenseId);
}

async function updateExpense(expenseId: number, expense: Partial<Expense>) {
  return db.expense.update(expenseId, expense);
}

export {
  useExpenses,
  addExpense,
  removeExpense,
  updateExpense
};