import { Card, CardContent } from "@mui/material";
import { useExpenseMetrics } from "./expense.metrics";

export default function expenseMetricsComponent() {
  const { totalExpenses, averageExpense, highestExpense, lowestExpense, totalByFrequency, currency } = useExpenseMetrics();

  const metrics = [
    {
      label: 'Total Expenses',
      value: totalExpenses.toFixed(2),
    },
    {
      label: 'Average Expense',
      value: averageExpense.toFixed(2),
    },
    {
      label: 'Highest Expense',
      value: highestExpense.toFixed(2),
    },
    {
      label: 'Lowest Expense',
      value: lowestExpense.toFixed(2),
    }
  ]

  return (
    <div className="expense-metrics">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(totalByFrequency).map(([frequency, total], idx) => (
          <div key={idx} className="flex justify-between items-center p-4 rounded shadow-md">
            <p><strong>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}:</strong> </p>
            <p className="font-bold text-gray-600"><small>{currency}</small> {total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}