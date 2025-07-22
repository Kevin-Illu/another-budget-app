import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material';

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Box>
			<h1>Manage your expenses</h1>
		</Box>
	)
}
