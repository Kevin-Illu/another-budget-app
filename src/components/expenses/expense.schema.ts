import * as yup from 'yup'
import dayjs from 'dayjs'
import type {InferType} from "yup";

const expenseSchema = yup.object({
	id: yup.number().required(),
	amount: yup.number().required('Amount is required'),
	name: yup.string().required('Name is required'),
	description: yup.string().required('Description is required'),
	currency: yup.string().oneOf(['GTQ']).required('Currency is required'),
	frequency: yup
			.string()
			.oneOf(['daily', 'weekly', 'biweekly', 'monthly', 'yearly', 'once'])
			.required('Frequency is required'),

	nextDueDate: yup
			.string()
			.required('Next due date is required')
			.test('is-valid-date', 'Must be a valid date', (value) => dayjs(value).isValid()),

	startDate: yup
			.string()
			.required('Start date is required')
			.test('is-valid-date', 'Must be a valid date', (value) => dayjs(value).isValid()),

	isRecurring: yup.boolean().required(),

	endDate: yup
			.string()
			.nullable()
			.notRequired()
			.test('is-valid-date-or-null', 'Must be a valid date or null', (value) => {
				if (value === null || value === undefined || value === '') return true
				return dayjs(value).isValid()
			}),
})

type ExpenseSchema = InferType<typeof expenseSchema>

export {expenseSchema as default}
export type {ExpenseSchema};
