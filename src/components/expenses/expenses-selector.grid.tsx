import { Checkbox, Chip } from "@mui/material";
import { useExpenses } from "../../services/expenses.service";
import { formatCurrency } from "../../utils/money";

export function ExpensesSelectorGrid() {
  const { expenses } = useExpenses();

  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-auto p-4 border border-gray-200 rounded">
      {expenses?.map((expense) => (
        <div key={expense.id} className="p-4 m-2 border-2 border-gray-200 rounded w-full flex justify-between items-center hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4 w-full">
            <div className="max-w-[380px] w-full">
              <h3 className="font-semibold text-lg text-gray-800">{expense.name}</h3>
              <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{expense.description}</p>
              <Chip className="mt-2" size="small" color="default" label={formatCurrency(expense.amount, expense.currency)} />
            </div>
          </div>

          <div>
          </div>
        </div>
      ))}
      {expenses?.length === 0 && <p>No expenses found.</p>}
    </div>
  );
}