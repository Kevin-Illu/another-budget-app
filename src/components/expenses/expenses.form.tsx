import type { Expense, NewExpense } from "../../infraestructure/database/db.ts";
import { useFormik } from "formik";
import expenseSchema, { type ExpenseSchema } from "./expense.schema.ts";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { FrequencyList } from "../../infraestructure/consts.ts";

const defaultValues: Expense = {
	id: 0,
	amount: 0,
	name: '',
	description: '',
	currency: 'GTQ',
	frequency: 'daily',
	nextDueDate: null,
	startDate: null,
	isRecurring: false,
	endDate: null,
}

export default function ExpensesForm(
	{ expense, onSubmit }:
		{
			expense: Expense | null
			onSubmit: (value: Expense | NewExpense) => void
		}
) {
	const expenseForm = useFormik<ExpenseSchema>({
		initialValues: expense ?? defaultValues,
		validationSchema: expenseSchema,
		onSubmit: (values: Expense) => {
			onSubmit({
				...values,
				nextDueDate: values.nextDueDate ? new Date(values.nextDueDate).toISOString() : null,
				startDate: values.startDate ? new Date(values.startDate).toISOString() : null,
				endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
			})
			expenseForm.resetForm();
			expenseForm.setValues(defaultValues);
			expenseForm.setTouched({
				amount: false,
				name: false,
				description: false,
				frequency: false,
				nextDueDate: false,
				startDate: false,
				isRecurring: false,
				endDate: false,
			});
			expenseForm.setErrors({});
		}
	});

	const setFormValues = useCallback((v: Expense) => expenseForm.setValues(v), [])

	const clearForm = () => expenseForm.setValues(defaultValues);

	useEffect(() => {
		clearForm();

		if (expense) {
			setFormValues(expense);
		}
	}, [expense, setFormValues])

	return (
		<form onSubmit={expenseForm.handleSubmit}>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2 w-full">
					<label className="flex-1">
						<TextField
							placeholder="Name of funding source"
							required
							id="name"
							label="Name"
							variant="outlined"
							className="w-full"
							onChange={expenseForm.handleChange}
							value={expenseForm.values.name}
						/>

						{expenseForm.errors.name && expenseForm.touched.name ? (
							<small>{expenseForm.errors.name}</small>
						) : null}
					</label>

					<label className="flex-1">
						<TextField
							className="w-full"
							placeholder="Current amount"
							required
							id="amount"
							label="Amount"
							variant="outlined"
							onChange={expenseForm.handleChange}
							value={expenseForm.values.amount}
						/>

						{expenseForm.errors.amount && expenseForm.touched.amount ? (
							<small>{expenseForm.errors.amount}</small>
						) : null}
					</label>
				</div>

				<div className="flex gap-2 w-full">
					<label className="flex-1">
						<small className="text-gray-500">Next due date</small>
						<TextField
							type="date"
							className="w-full"
							id="nextDueDate"
							variant="outlined"
							onChange={expenseForm.handleChange}
							value={expenseForm.values.nextDueDate}
						/>
						{expenseForm.errors.nextDueDate && expenseForm.touched.nextDueDate ? (
							<small>{expenseForm.errors.nextDueDate}</small>
						) : null}
					</label>

					<label className="flex-1">
						<small className="text-gray-500">Start date</small>
						<TextField
							className="w-full"
							type="date"
							id="startDate"
							onChange={expenseForm.handleChange}
							value={expenseForm.values.startDate}
							variant="outlined"
						/>
						{expenseForm.errors.startDate && expenseForm.touched.startDate ? (
							<small>{expenseForm.errors.startDate}</small>
						) : null}
					</label>
				</div>

				<div className="flex flex-row-reverse gap-2 w-full">
					<label>
						<small className="text-gray-500">Is recurring</small>
						<br />
						<Switch
							id="isRecurring"
							onChange={expenseForm.handleChange}
							checked={expenseForm.values.isRecurring} />
					</label>

					<label className="flex-1">
						<small className="text-gray-500">Frequency</small>
						<FormControl fullWidth>
							<Select
								id="frequency"
								value={expenseForm.values.frequency}
								onChange={(v) => expenseForm.setFieldValue('frequency', v.target.value)}
								variant="outlined"
							>
								{FrequencyList.map((f) => (
									<MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
								))}
							</Select>
						</FormControl>
					</label>

					<label className="flex-1">
						<small className="text-gray-500">End date</small>
						<TextField
							className="w-full"
							type="date"
							id="endDate"
							onChange={expenseForm.handleChange}
							value={expenseForm.values.endDate ?? ''}
							variant="outlined"
						/>
						{expenseForm.errors.endDate && expenseForm.touched.endDate ? (
							<small>{expenseForm.errors.endDate}</small>
						) : null}
					</label>
				</div>

				<label className="flex-1">
					<TextField
						placeholder="Your description"
						id="description"
						label="Description"
						multiline
						variant="outlined"
						className="w-full"
						onChange={expenseForm.handleChange}
						value={expenseForm.values.description}
					/>
					{expenseForm.errors.description && expenseForm.touched.description ? (
						<small>{expenseForm.errors.description}</small>
					) : null}
				</label>
			</div>

			<div className='flex justify-end mt-4 gap-2'>
				<Button onClick={clearForm} variant="outlined" startIcon={<BackspaceRoundedIcon />}>
					clear
				</Button>
				<Button type='submit' variant='contained' color='inherit' sx={{ bgcolor: 'black', color: 'white' }}>
					{expenseForm.values.id ? "Update" : "Create"}
				</Button>
			</div>
		</form >
	)
}