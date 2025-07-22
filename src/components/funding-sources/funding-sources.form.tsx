import * as yup from 'yup';
import { useFormik } from "formik";
import type { InferType } from "yup";
import type { FundingSource, NewFundingSource } from "../../infraestructure/database/db.ts";
import { useCallback, useEffect } from "react";
import { Button, DialogTitle, TextField } from '@mui/material';

const fundingSchema = yup.object({
	amount: yup.number().positive().min(1).required('Please enter amount'),
	name: yup.string().required('Please enter a name'),
	description: yup.string().required('Please enter a description'),
	id: yup.number().nullable()
})
type FundingSchemaType = InferType<typeof fundingSchema>

export default function FundingSourcesForm({ fundingSourceTemp, onSubmit }: {
	fundingSourceTemp: FundingSource | null, onSubmit: (fs: FundingSource | NewFundingSource) => void
}) {
	const clearForm = () =>
		fundingSource.setValues({
			amount: 0,
			name: '',
			description: '',
			id: null
		})

	const fundingSource = useFormik<FundingSchemaType>({
		initialValues: fundingSourceTemp ?? {
			amount: 0,
			description: '',
			name: ''
		},
		validationSchema: fundingSchema,
		onSubmit: (fs) => onSubmit({
			...fs,
			id: fs.id ?? undefined,
			currency: "GTQ"
		})
	});

	const setFormValues = useCallback((v: FundingSource) => fundingSource.setValues(v), [])

	// pathc values
	useEffect(() => {
		clearForm();

		if (fundingSourceTemp) {
			setFormValues(fundingSourceTemp);
		}
	}, [fundingSourceTemp, setFormValues]);

	return (
		<form onSubmit={fundingSource.handleSubmit} className='p-8'>
			<DialogTitle>
				<p className='text-gray-600 font-bold uppercase'>Funding source</p>
			</DialogTitle>
			<div className='flex flex-col gap-4'>
				<label className='flex flex-col gap-2'>
					<TextField
						id="name"
						label="Name"
						variant="outlined"
						required
						onChange={fundingSource.handleChange}
						value={fundingSource.values.name} />
					{fundingSource.errors.name && fundingSource.touched.name ? (
						<small>{fundingSource.errors.name}</small>
					) : null}
				</label>
				<label className='flex flex-col gap-2'>
					<TextField
						variant="outlined"
						label="Amount"
						placeholder="Current amount"
						required
						id="amount"
						onChange={fundingSource.handleChange}
						value={fundingSource.values.amount}
					/>

					{fundingSource.errors.amount && fundingSource.touched.amount ? (
						<small>{fundingSource.errors.amount}</small>
					) : null}
				</label>
				<label className='flex flex-col gap-2'>
					<TextField
						label="Description"
						type="text"
						placeholder="Kind of funding"
						id="description"
						required
						variant="outlined"
						onChange={fundingSource.handleChange}
						value={fundingSource.values.description}
					/>
					{fundingSource.errors.description && fundingSource.touched.description ? (
						<small>{fundingSource.errors.description}</small>
					) : null}
				</label>

				<div className='flex justify-end mt-4'>
					<Button type='submit' variant='contained' color='inherit' sx={{ bgcolor: 'black', color: 'white' }}>
						{fundingSource.values.id ? "Update" : "Save"}
					</Button>
				</div>
			</div>
		</form >
	)
}
