import { useExpenseMetrics } from "./expense.metrics";

export default function expenseMetricsComponent() {
  const { totalByFrequency, currency } = useExpenseMetrics();

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