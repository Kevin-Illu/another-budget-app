import { createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect, useState } from "react";
import { Box, Button, Dialog } from '@mui/material';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { customizeGlobalCursorStyles, type CustomCursorStyleConfig } from "react-resizable-panels";

import { addFundingSource, removeFundingSource, updateFundingSource, useFundingSource } from "../../services/fouding-sources.service.ts";
import type { FundingSource, NewFundingSource } from "../../infraestructure/database/db.ts";
import FundingSourcesGrid from "../../components/funding-sources/funding-sources.grid.tsx";
import FundingSourcesForm from '../../components/funding-sources/funding-sources.form.tsx';
import FundingSourceUIState from '../../components/funding-sources/funding-source-ui.state.tsx';

export const Route = createFileRoute('/funding-sources/')({
	component: RouteComponent,
})

function FundingSourcesToolBar({ handleOpen }: { handleOpen: () => void }) {
	return (
		<div className='flex justify-between items-center text-gray-500'>
			<h4>Your funding sources</h4>
			<div>
				<Button size='small' endIcon={<AddCardRoundedIcon />}
					variant="text" color='inherit' onClick={handleOpen}>
					<p>Add funding source</p>
				</Button>
			</div>
		</div>
	)
}

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


	// setup the custom cursor styles for the resizable panels
	useLayoutEffect(() => {
		function customCursor({ isPointerDown }: CustomCursorStyleConfig) {
			return isPointerDown ? "grabbing" : "grab";
		}

		customizeGlobalCursorStyles(customCursor);
		return () => {
			customizeGlobalCursorStyles(null);
		};
	}, []);

	return (
		<FundingSourceUIState>
			{({ deselectFundingSource, isListing, isSelecting, selectFundingSource }) => (
				<Box className='w-full h-full'>
					<FundingSourcesToolBar handleOpen={handleOpen} />

					<Box className="py-4"></Box>

					<PanelGroup direction="horizontal" className='gap-2 w-full h-full min-h-full'>
						<Panel defaultSize={40} minSize={30}>
							<FundingSourcesGrid
								fundingSources={fundingSources}
								removeFundingSource={removeFundingSource}
								onEdit={handleEdit} />
						</Panel>

						{isSelecting() && (
							<>
								<PanelResizeHandle />
								<Panel collapsible={true} collapsedSize={5} minSize={5}>
									<Box className="bg-gray-50 rounded w-full h-full block border-2 border-dashed border-gray-200"></Box>
								</Panel>
							</>
						)}
					</PanelGroup>

					<Dialog onClose={handleClose} open={open}>
						<FundingSourcesForm fundingSourceTemp={fsTemp} onSubmit={handleSubmit} />
					</Dialog>
				</Box>
			)}
		</FundingSourceUIState>
	)
}
