import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';

const PageLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't show back button on home, auth, or admin pages
  const showBackButton = !isHome && !isAuthPage && !isAdminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {showBackButton && (
            <div className="mb-6">
              <BackButton />
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
