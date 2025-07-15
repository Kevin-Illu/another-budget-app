import {createFileRoute, Link as LinkT} from '@tanstack/react-router'
import {Box, Container, Flex, Heading, Link} from "@radix-ui/themes";

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
			<Container>
				<Box className="my-8">
					<Heading>Manage your expenses</Heading>
				</Box>
				<Box>
					<Flex gap="2">
						<Link asChild>
							<LinkT to="/funding-sources">funding sources</LinkT>
						</Link>
					</Flex>
				</Box>
			</Container>
	)
}
