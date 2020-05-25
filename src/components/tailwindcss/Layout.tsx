import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { AuthContext } from '../../lib/auth';

/* eslint-disable jsx-a11y/label-has-associated-control */
function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [auth] = React.useContext(AuthContext);
  const isSignedIn = auth.default.getToken() !== '';

  const handleSignOut = (): void => {
    auth.default.setToken('');
    Router.push('/');
  };

  type MenuItemType = {
    text: string;
    href?: string;
    handleClick?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
  };

  const navMenuProps: MenuItemType[] = [
    { text: 'Home', href: '/' },
    { text: 'Users', href: '/users' },
  ];
  const navMenuItems = navMenuProps.map((v) => (
    <Link key={v.href} href={v.href as string}>
      <a href={v.href} className="tk-menu-nav-item tk-button-ripple">
        {v.text}
      </a>
    </Link>
  ));

  const accountMenuProps: MenuItemType[] = isSignedIn
    ? [{ text: 'Log out', handleClick: handleSignOut }]
    : [
        { text: 'Log in', href: '/login' },
        { text: 'Sign up', href: '/signup' },
      ];
  const accountMenuItems = accountMenuProps.map((v) => {
    if (v.href) {
      return (
        <Link key={v.text} href={v.href}>
          <a href={v.href} className="tk-menu-nav-item tk-button-ripple">
            {v.text}
          </a>
        </Link>
      );
    }
    return (
      <button
        key={v.text}
        type="button"
        className="tk-menu-nav-item tk-button-ripple w-full text-left"
        onClick={v.handleClick}
      >
        {v.text}
      </button>
    );
  });

  return (
    <div className="bg-background">
      <div className="flex flex-col  container mx-auto min-h-screen  bg-surface shadow-xl">
        <header className="flex flex-col  fixed container h-16 z-10 p-2  bg-surface">
          <div className="flex  flex-1 relative">
            <h1 className="flex-1 my-auto px-2  text-lg text-on-surface font-medium truncate">
              <Link href="/">
                <a href="/">Next.js starter</a>
              </Link>
            </h1>

            <div id="account-menu" className="my-auto">
              <label
                htmlFor="tk-account-menu-checkbox"
                className="tk-button-circle px-2"
                data-test-id="account-icon"
              >
                <AccountCircle
                  style={{ color: 'rgb(var(--color-on-surface))' }}
                />
              </label>
              <input
                type="checkbox"
                id="tk-account-menu-checkbox"
                className="tk-account-menu-checkbox"
              />
              <label
                htmlFor="tk-account-menu-checkbox"
                className="tk-account-menu-overlay"
              />
              <nav className="tk-account-menu-nav">{accountMenuItems}</nav>
            </div>

            <div id="nav-menu" className="my-auto">
              <label
                htmlFor="tk-menu-checkbox"
                className="tk-menu-button tk-button-circle"
                data-test-id="menu-icon"
              >
                <MenuIcon style={{ color: 'rgb(var(--color-on-surface))' }} />
              </label>
              <input
                type="checkbox"
                id="tk-menu-checkbox"
                className="tk-menu-checkbox"
              />
              <label htmlFor="tk-menu-checkbox" className="tk-menu-overlay" />
              <nav className="tk-menu-nav">{navMenuItems}</nav>
            </div>
          </div>
          <hr />
        </header>
        <div className="mt-16" />

        <div className="flex  flex-1">
          <nav className="hidden md:block flex-shrink-0 w-64  border-r border-on-surface-border">
            {navMenuItems}
          </nav>
          <main className="flex  flex-1">{children}</main>
        </div>

        <footer className="flex flex-col  h-16 p-2">
          <hr />
          <p className="m-auto  text-on-surface">
            Powered by&nbsp;
            <a href="https://github.com/twihike" className="text-primary">
              Next.js starter
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
/* eslint-enable jsx-a11y/label-has-associated-control */

export default Layout;
