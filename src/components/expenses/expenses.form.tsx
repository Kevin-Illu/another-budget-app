import type {Expense} from "../../infraestructure/database/db.ts";
import {useFormik} from "formik";
import expenseSchema, {type ExpenseSchema} from "./expense.schema.ts";
import dayjs from "dayjs";

const defaultValues: Expense = {
	id: 0,
	amount: 0,
	name: '',
	description: '',
	currency: 'GTQ',
	frequency: 'daily',
	nextDueDate: dayjs().format('YYYY-MM-DD'),
	startDate: dayjs().format('YYYY-MM-DD'),
	isRecurring: false,
	endDate: null,
}

export default function ExpensesForm({expense}: { expense: Expense | null }) {
	const expenseForm = useFormik<ExpenseSchema>({
		initialValues: expense ?? defaultValues,
		validationSchema: expenseSchema,
		onSubmit: (values: Expense) => {
			console.log(values)
		}
	})
	return (
			<form onSubmit={expenseForm.handleSubmit}>
				<Flex direction="column" gap="3">

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Name</Text>
						<TextField.Root
								placeholder="Name of funding source"
								required
								id="name"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.name}
						/>

						{expenseForm.errors.name && expenseForm.touched.name ? (
								<Text color="red" size="1">{expenseForm.errors.name}</Text>
						) : null}
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Amount</Text>
						<TextField.Root
								placeholder="Current amount"
								required
								id="amount"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.amount}
						/>

						{expenseForm.errors.amount && expenseForm.touched.amount ? (
								<Text color="red" size="1">{expenseForm.errors.amount}</Text>
						) : null}
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Description</Text>
						<TextField.Root
								placeholder="Your description"
								id="description"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.description}
						/>
						{expenseForm.errors.description && expenseForm.touched.description ? (
								<Text color="red" size="1">{expenseForm.errors.description}</Text>
						) : null}
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Next due date</Text>
						<TextField.Root
								type="date"
								placeholder="Next due date"
								id="nextDueDate"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.nextDueDate}
						/>
						{expenseForm.errors.nextDueDate && expenseForm.touched.nextDueDate ? (
								<Text color="red" size="1">{expenseForm.errors.nextDueDate}</Text>
						) : null}
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Start date</Text>
						<TextField.Root
								type="date"
								placeholder="Start date"
								id="startDate"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.startDate}
						/>
						{expenseForm.errors.startDate && expenseForm.touched.startDate ? (
								<Text color="red" size="1">{expenseForm.errors.startDate}</Text>
						) : null}
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">Is recurring</Text>
						<Switch defaultChecked/>
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">End date</Text>
						<TextField.Root
								type="date"
								placeholder="End date"
								id="startDate"
								onChange={expenseForm.handleChange}
								value={expenseForm.values.endDate ?? ''}
						/>
						{expenseForm.errors.endDate && expenseForm.touched.endDate ? (
								<Text color="red" size="1">{expenseForm.errors.endDate}</Text>
						) : null}
					</label>

					<Box>
						<Flex direction="row-reverse">
							<Button variant="soft" type="submit">
								{expenseForm.values.id ? "Update" : "Save"}
							</Button>
						</Flex>
					</Box>

				</Flex>
			</form>
	)
}