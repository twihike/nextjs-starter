import {
  AccountCircle,
  Brightness4,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { AuthContext } from '../../lib/auth';
import { DarkModeContext } from '../../lib/mui';

const drawerWidth = 160;

function Layout({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const [darkMode, setDarkMode] = React.useContext(DarkModeContext);
  const handleDarkMode = (): void => {
    setDarkMode({
      isDarkMode: !darkMode.isDarkMode,
      auto: false,
    });
  };

  const [auth] = React.useContext(AuthContext);
  const isSignedIn = auth.default.getToken() !== '';
  const handleSignOut = (): void => {
    auth.default.setToken('');
    Router.push('/');
  };

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = (): void => {
    setDrawerOpen(!drawerOpen);
  };

  const [accountIconAnchorEl, setAccountIconAnchorEl] =
    React.useState<HTMLElement | null>(null);
  const handleAccountMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setAccountIconAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = (): void => {
    setAccountIconAnchorEl(null);
  };

  const drawer: React.ReactElement = (
    <>
      <Toolbar />
      <List>
        {[
          { text: 'Home', href: '/' },
          { text: 'Users', href: '/users' },
        ].map((v) => (
          <Link key={v.href} href={v.href} passHref>
            <ListItem component="a" button>
              <ListItemText primary={v.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        sx={{
          bgcolor: 'background.paper',
          zIndex: (theme) => ({ sm: theme.zIndex.drawer + 1 }),
        }}
        color="default"
      >
        <Toolbar>
          <Link href="/" passHref>
            <MuiLink
              sx={{ flexGrow: 1 }}
              variant="h5"
              color="textPrimary"
              underline="none"
              noWrap
            >
              Next.js starter
            </MuiLink>
          </Link>
          <IconButton onClick={handleDarkMode} aria-label="Dark mode">
            <Brightness4 />
          </IconButton>
          <IconButton
            onClick={handleAccountMenuOpen}
            aria-label="Account menu"
            data-test-id="account-icon"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={accountIconAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!accountIconAnchorEl}
            onClose={handleAccountMenuClose}
            keepMounted
          >
            {isSignedIn ? (
              <MenuItem onClick={handleSignOut}>Log out</MenuItem>
            ) : (
              <div>
                <Link href="/login" passHref>
                  <MenuItem component="a">Log in</MenuItem>
                </Link>
                <Link href="/signup" passHref>
                  <MenuItem component="a">Sign up</MenuItem>
                </Link>
              </div>
            )}
          </Menu>
          <IconButton
            sx={{ display: { sm: 'none' } }}
            onClick={handleDrawerOpen}
            aria-label="Menu"
            data-test-id="menu-icon"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}>
        <Drawer
          sx={{ display: { xs: 'none', sm: 'block' } }}
          PaperProps={{ sx: { width: drawerWidth } }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Container
        sx={{
          flexGrow: 1,
          width: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        maxWidth="lg"
      >
        <Box
          component="main"
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Toolbar />
          {children}
        </Box>
        <Box component="footer" sx={{ p: 2 }}>
          <Typography align="center">
            Powered by&nbsp;
            <MuiLink href="https://github.com/twihike" color="primary">
              Next.js starter
            </MuiLink>
          </Typography>
        </Box>
      </Container>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            sx={{ display: { sm: 'none' } }}
            PaperProps={{ sx: { width: drawerWidth, flexShrink: 0 } }}
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerOpen}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Box>
  );
}

export default Layout;
