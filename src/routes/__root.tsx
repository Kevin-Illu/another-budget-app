import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {Box, Theme} from "@radix-ui/themes";

export const Route = createRootRoute({
	component: () => (
			<Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
				<Box width="100vw" height="100vh">
					<Outlet/>
					<TanStackRouterDevtools/>
				</Box>
			</Theme>
	),
})