import * as yup from 'yup';
import { useFormik } from "formik";
import type { InferType } from "yup";
import type { FundingSource, NewFundingSource } from "../../infraestructure/database/db.ts";
import { Button, DialogTitle, Switch, TextField } from '@mui/material';

const getInitialValues = (fs: FundingSource | null): FundingSchemaType => ({
	amount: fs?.amount ?? 0,
	name: fs?.name ?? '',
	description: fs?.description ?? '',
	id: fs?.id ?? null,
	isActive: fs?.isActive ?? false,
});

const fundingSchema = yup.object({
	amount: yup.number().positive().min(1).required('Please enter amount'),
	name: yup.string().required('Please enter a name'),
	description: yup.string().required('Please enter a description'),
	id: yup.number().nullable(),
	isActive: yup.boolean().default(false)
})
type FundingSchemaType = InferType<typeof fundingSchema>

export default function FundingSourcesForm({ fundingSourceTemp, onSubmit }: {
	fundingSourceTemp: FundingSource | null, onSubmit: (fs: FundingSource | NewFundingSource) => void
}) {
	const fundingSource = useFormik<FundingSchemaType>({
		initialValues: getInitialValues(fundingSourceTemp),
		validationSchema: fundingSchema,
		enableReinitialize: true,
		onSubmit: (fs) => onSubmit({
			...fs,
			id: fs.id ?? undefined,
			currency: "GTQ",
			createdAt: new Date().toISOString()
		})
	});

	return (
		<form onSubmit={fundingSource.handleSubmit} className='p-8 w-96'>
			<DialogTitle className='flex items-center justify-center'>
				<p className='text-gray-400 font-semibold uppercase'>Funding source</p>
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
				<div className='flex gap-2 w-full'>
					<label className='flex-1'>
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

					<label>
						<small className="text-gray-500">Is Active</small>
						<br />
						<Switch
							id="isActive"
							onChange={fundingSource.handleChange}
							checked={fundingSource.values.isActive} />
					</label>
				</div>
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
