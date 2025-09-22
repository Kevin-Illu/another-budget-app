import type { Expense, FundingSource, NewExpense, NewFundingSource } from "../../infraestructure/database/db.ts";
import { useFormik } from "formik";
import expenseSchema, { type ExpenseSchema } from "./expense.schema.ts";
import { Button, FormControl, MenuItem, Select, Switch, TextField } from "@mui/material";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { FrequencyList } from "../../infraestructure/consts.ts";
import { useEffect } from "react";

const getExpenseInitialValues = (expense: Expense | null): Expense => ({
	id: expense?.id ?? 0,
	amount: expense?.amount ?? 0,
	name: expense?.name ?? '',
	description: expense?.description ?? '',
	currency: expense?.currency ?? 'GTQ',
	frequency: expense?.frequency ?? 'daily',
	nextDueDate: expense?.nextDueDate ?? '',
	startDate: expense?.startDate ?? '',
	isRecurring: expense?.isRecurring ?? false,
	endDate: expense?.endDate ?? '',
	fundingSourceId: expense?.fundingSourceId ?? null
});


export default function ExpensesForm(
	{ expense, onSubmit }:
		{
			expense: Expense | null
			onSubmit: (value: Expense | NewExpense) => void
		}
) {
	const expenseForm = useFormik<ExpenseSchema>({
		initialValues: getExpenseInitialValues(expense),
		validationSchema: expenseSchema,
		enableReinitialize: true,
		onSubmit: (values: NewExpense) => {
			onSubmit({
				...values,
				nextDueDate: values.nextDueDate ? new Date(values.nextDueDate).toISOString() : null,
				startDate: values.startDate ? new Date(values.startDate).toISOString() : null,
				endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
				fundingSourceId: values?.fundingSourceId ?? null,
			});

			clearForm();
		}
	});

	useEffect(() => {
		if (!expense) {
			clearForm();
			return;
		}

		expenseForm.setValues(getExpenseInitialValues(expense));
		expenseForm.setTouched({
			name: false,
			amount: false,
			description: false,
			currency: false,
			frequency: false,
			nextDueDate: false,
			startDate: false,
			isRecurring: false,
			endDate: false
		});
	}, [expense]);

	const clearForm = () => {
		const clearedValues = getExpenseInitialValues(null);

		expenseForm.setValues({
			...clearedValues,
		});
	};

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