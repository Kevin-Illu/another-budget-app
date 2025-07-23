import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { addFundingSource, removeFundingSource, updateFundingSource, useFundingSource } from "../../services/fouding-sources.service.ts";
import type { FundingSource, NewFundingSource } from "../../infraestructure/database/db.ts";
import FundingSourcesGrid from "../../components/funding-sources/funding-sources.grid.tsx";
import { Box, Button, Dialog } from '@mui/material';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import FundingSourcesForm from '../../components/funding-sources/funding-sources.form.tsx';

export const Route = createFileRoute('/funding-sources/')({
	component: RouteComponent,
})

function RouteComponent() {
	const { fundingSources } = useFundingSource()
	const [fsTemp, setFsTemp] = useState<FundingSource | null>(null);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);

		setTimeout(() => {
			setFsTemp(null);
		}, 300)
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleEdit = (fs: FundingSource) => {
		setFsTemp(fs);
		handleOpen();
	}

	const handleSubmit = (fs: FundingSource | NewFundingSource) => {
		const { id, ...values } = fs as FundingSource;

		if (id) {
			updateFundingSource(id, values);
			setOpen(false);
			setFsTemp(null);
			return;
		}

		addFundingSource({
			...values,
			currency: "GTQ",
		})
		setOpen(false);
	}

	return (
		<Box>
			<div className='flex justify-between items-center text-gray-500'>
				<h4>Your funding sources</h4>
				<div>
					<Button size='small' endIcon={<AddCardRoundedIcon />}
						variant="text" color='inherit' onClick={handleOpen}>
						<p>Add funding source</p>
					</Button>
				</div>
			</div>

			<Box sx={{ pt: 4 }}>
				<FundingSourcesGrid
					fundingSources={fundingSources}
					removeFundingSource={removeFundingSource}
					onEdit={handleEdit} />
			</Box>

			<Dialog onClose={handleClose} open={open}>
				<FundingSourcesForm fundingSourceTemp={fsTemp} onSubmit={handleSubmit} />
			</Dialog>
		</Box>
	)
}
