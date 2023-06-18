import React from 'react';

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
