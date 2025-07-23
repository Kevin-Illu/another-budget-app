import { ButtonGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { Expense } from "../../infraestructure/database/db";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function ExpensesTable(
  { expenses, onEdit, onDelete }:
    {
      expenses: Expense[] | null
      onEdit: (expense: Expense) => void
      onDelete: (expenseId: number) => void
    }
) {
  return (
    <TableContainer sx={{ height: '100%', overflowY: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Frequency</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses?.length ? expenses?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <span style={{
                  display: 'inline-block',
                  maxWidth: 220,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'bottom'
                }}>
                  {row.description}
                </span>
              </TableCell>
              <TableCell align="right">{row.frequency}</TableCell>
              <TableCell align="right">{row.currency} {row.amount}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <IconButton onClick={() => onEdit(row)}>
                    <EditRoundedIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteRoundedIcon color="error" />
                  </IconButton>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No expenses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}