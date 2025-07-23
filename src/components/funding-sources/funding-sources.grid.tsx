import { Card, CardActionArea, CardActions, Grid, IconButton } from "@mui/material";
import type { FundingSource } from "../../infraestructure/database/db.ts";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import './funding-source.styles.css';

export default function FundingSourcesGrid({ fundingSources, removeFundingSource, onEdit }: {
	fundingSources: FundingSource[] | undefined,
	removeFundingSource: (id: number) => void,
	onEdit: (fs: FundingSource) => void
}) {
	return (
		<Grid rowSpacing={2} columnSpacing={2} container>
			{fundingSources?.map((fs, idx) => (
				<Grid key={fs.id} size={6} sx={{
					opacity: 0,
					animation: 'fadeInUp 0.5s ease forwards',
					animationDelay: `${idx * 0.1}s`
				}}>
					<Card sx={{ boxShadow: "none" }} className="shadow-md">
						<CardActionArea onClick={() => onEdit(fs)}>
							<div className="p-6 bg-stone-100 rounded-tl-lg rounded-tr-lg">
								<div className="flex justify-between items-center">
									<div>
										<h5 className="font-bold uppercase text-gray-700">{fs.name}</h5>
										<p className="text-gray-600">{fs.description}</p>
									</div>

									<div className="flex flex-col justify-between items-end gap-4">
										<p className="text-gray-700 font-semibold text-4xl">{fs.amount} {fs.currency}</p>
									</div>
								</div>
							</div>
						</CardActionArea>
						<CardActions className="p-2 bg-stone-50 rounded-bl-lg rounded-br-lg">
							<div className="flex gap-2 justify-end items-center w-full">
								<IconButton onClick={() => removeFundingSource(fs.id)} size="small" aria-label="remove funding source">
									<CancelRoundedIcon color="error" />
								</IconButton>
							</div>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}