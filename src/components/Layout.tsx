
import React from 'react';
import Header from './Header';
import BeeMascot from './BeeMascot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        {children}
      </main>
      <BeeMascot />
    </div>
  );
};

export default Layout;
