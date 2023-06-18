import React from 'react';

import MainNavigation from './MainNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <MainNavigation />

      <main>{children}</main>
    </>
  );
};

export default Layout;
