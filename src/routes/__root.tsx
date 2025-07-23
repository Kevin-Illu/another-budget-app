import Drawer from '@mui/material/Drawer'
import { createRootRoute, Outlet, useCanGoBack, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ListItemIcon } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';

const drawerWidth = 240;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'background.default', boxShadow: 'none' }}
      >
        <Toolbar>
          {canGoBack ? (
            <IconButton onClick={() => router.history.back()} edge="end" aria-label="back">
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => router.navigate({ to: '/funding-sources' })}>
              <ListItemIcon>
                <CreditCardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Funding" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => router.navigate({ to: '/expenses' })}>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Expenses" />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Box sx={{ p: 2, height: '90%', width: '100%' }}>
          {children}
          <TanStackRouterDevtools />
        </Box>
      </Box>
    </Box>
  )
}

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
})