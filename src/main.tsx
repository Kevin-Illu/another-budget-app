import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "./infraestructure/database/db.ts"

import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { GlobalStyles, StyledEngineProvider } from '@mui/material'

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
			<RouterProvider router={router} />
    </StyledEngineProvider>
	</StrictMode>,
)

