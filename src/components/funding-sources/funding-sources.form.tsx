import {Box, Button, Flex, Text, TextField} from "@radix-ui/themes";
import * as yup from 'yup';
import {useFormik} from "formik";
import {addFundingSource, updateFundingSource} from "../../services/fouding-sources.service.ts";
import type {InferType} from "yup";
import type {FundingSource} from "../../infraestructure/database/db.ts";
import {useCallback, useEffect} from "react";

const fundingSchema = yup.object({
	amount: yup.number().positive().min(1).required('Please enter amount'),
	description: yup.string().required('Please enter a description'),
	id: yup.number().nullable()
})
type FundingSchemaType = InferType<typeof fundingSchema>

export default function FundingSourcesForm({fundingSourceTemp}: { fundingSourceTemp: FundingSource | null }) {
	const clearForm = () =>
			fundingSource.setValues({
				amount: 0,
				description: '',
				id: null
			})

	const fundingSource = useFormik<FundingSchemaType>({
		initialValues: fundingSourceTemp ?? {
			amount: 0,
			description: ''
		},
		validationSchema: fundingSchema,
		onSubmit: ({id, ...values}) => {
			if (id) {
				updateFundingSource(id, values).then(() => {
					clearForm()
				});
				return;
			}

			addFundingSource({
				...values,
				currency: "GTQ"
			}).then(() => {
				clearForm()
			})
		}
	});

	const setFormValues = useCallback((v: FundingSource) => fundingSource.setValues(v), [])

	useEffect(() => {
		if (fundingSourceTemp) {
			setFormValues(fundingSourceTemp);
		}
	}, [fundingSourceTemp, setFormValues]);

	return (
			<form onSubmit={fundingSource.handleSubmit}>
				<Flex direction="column" gap="3">
					<label>
						<Text as="div" size="2" mb="1" weight="bold">Amount</Text>
						<TextField.Root
								placeholder="Current amount"
								required
								id="amount"
								onChange={fundingSource.handleChange}
								value={fundingSource.values.amount}
						/>

						{fundingSource.errors.amount && fundingSource.touched.amount ? (
								<Text color="red" size="1">{fundingSource.errors.amount}</Text>
						) : null}
					</label>
					<label>
						<Text as="div" size="2" mb="1" weight="bold">Description</Text>
						<TextField.Root
								placeholder="Kind of funding"
								id="description"
								onChange={fundingSource.handleChange}
								value={fundingSource.values.description}
						/>
						{fundingSource.errors.description && fundingSource.touched.description ? (
								<Text color="red" size="1">{fundingSource.errors.description}</Text>
						) : null}
					</label>

					<Box>
						<Flex direction="row-reverse">
							<Button variant="soft" type="submit">
								{fundingSource.values.id ? "Update" : "Save"}
							</Button>
						</Flex>
					</Box>
				</Flex>
			</form>
	)
}
