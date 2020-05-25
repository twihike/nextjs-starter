import {
  AppBar,
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
  Theme,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  AccountCircle,
  Brightness4,
  Menu as MenuIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { AuthContext } from '../../lib/auth';
import { DarkModeContext } from '../../lib/mui';

const drawerWidth = 160;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      zIndex: theme.zIndex.drawer + 1,
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
    backgroundColor: theme.palette.background.paper,
  },
  menuTitle: {
    flexGrow: 1,
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  nav: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  container: {
    flexGrow: 1,
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

function Layout({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const classes = useStyles();

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

  const [
    accountIconAnchorEl,
    setAccountIconAnchorEl,
  ] = React.useState<HTMLElement | null>(null);
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
      <div className={classes.toolbar} />
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
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="default">
        <Toolbar>
          <Link href="/" passHref>
            <MuiLink
              className={classes.menuTitle}
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
            getContentAnchorEl={null}
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
            className={classes.menuButton}
            onClick={handleDrawerOpen}
            aria-label="Menu"
            data-test-id="menu-icon"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.nav}>
        <Hidden xsDown implementation="css">
          <Drawer classes={{ paper: classes.drawer }} variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <Container className={classes.container} maxWidth="lg">
        <main className={classes.main}>
          <div className={classes.toolbar} />
          {children}
        </main>
        <footer className={classes.footer}>
          <Typography align="center">
            Powered by&nbsp;
            <MuiLink href="https://github.com/twihike" color="primary">
              Next.js starter
            </MuiLink>
          </Typography>
        </footer>
      </Container>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            classes={{ paper: classes.drawer }}
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClick={handleDrawerOpen}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Layout;
