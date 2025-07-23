import { useExpenses } from "../../../services/expenses.service";

export function useExpenseMetrics() {
  const { expenses } = useExpenses();

  const currency = expenses?.[0]?.currency || 'GTQ';

  const totalExpenses = expenses?.reduce((total, expense) => {
    return total + (Number(expense.amount) || 0);
  }, 0) || 0;

  const averageExpense = expenses && expenses.length > 0
    ? totalExpenses / expenses.length
    : 0;

  const highestExpense = expenses?.reduce((max, expense) => {
    return Math.max(max, Number(expense.amount) || 0);
  }, 0) || 0;

  const lowestExpense = expenses?.reduce((min, expense) => {
    return Math.min(min, Number(expense.amount) || 0);
  }, Infinity) || Infinity;

  const totalByFrequency = expenses?.reduce((acc, expense) => {
    const frequency = expense.frequency || 'monthly';

    if (frequency === 'once') {
      return acc;
    }

    acc[frequency] = (acc[frequency] || 0) + (Number(expense.amount) || 0);
    return acc;
  }, {} as Record<string, number>) || {};

  return {
    totalExpenses,
    averageExpense,
    highestExpense,
    lowestExpense,
    totalByFrequency,
    currency
  };
}