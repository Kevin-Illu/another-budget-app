import { Checkbox } from "@mui/material";
import { useExpenses } from "../../services/expenses.service";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { Expense } from "../../infraestructure/database/db";
import { formatCurrency } from "../../utils/money";
import { BanknoteArrowDown, Minus } from "lucide-react";

export function ExpensesSelectorGrid() {
  const { expenses } = useExpenses();
  const [checked, setChecked] = React.useState([0]);

  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-auto p-4 border border-gray-200 rounded">
      <CheckboxList expenses={expenses} checked={checked} setChecked={setChecked} />
      {expenses?.length === 0 && <p>No expenses found.</p>}
    </div>
  );
}

export default function CheckboxList({ expenses, setChecked, checked }:
  {
    expenses?: Expense[],
    checked: number[],
    setChecked: React.Dispatch<React.SetStateAction<number[]>>
  }) {
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className="w-full">
      {expenses?.map((expense) => {
        const labelId = `checkbox-list-label-${expense.id}`;

        return (
          <ListItem className="w-full mb-2 rounded  border border-gray-200"
            key={expense.id}
            secondaryAction={
              <Checkbox
                edge="start"
                checked={checked.includes(expense.id)}
                tabIndex={-1}
                disableRipple
                slotProps={{
                  'input': {
                    'aria-labelledby': labelId,
                  }
                }}
              />
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(expense.id)} dense>
              <ListItemIcon>
                <BanknoteArrowDown className="text-red-500" />
              </ListItemIcon>
              <ListItemText id={labelId} primary={expense.name} secondary={
                <span className="font-bold flex gap-1 items-center text-red-400">
                  <Minus size={12} /><i>{formatCurrency(expense.amount)}</i>
                </span>
              } />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
