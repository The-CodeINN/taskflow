'use client';
import useAuth from '@/hooks/useAuth';
import { notFound, redirect } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();

  useEffect(() => {
    if (!token) {
      redirect('/login');
    }

    if (!user) {
      notFound();
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
