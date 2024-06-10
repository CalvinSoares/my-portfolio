'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '../../app/loading';

interface LoadingProviderProps {
  children: ReactNode;
}

interface LoadingContextProps {
  loading: boolean;
}

const LoadingContext = createContext<LoadingContextProps>({ loading: false });

export const useLoading = () => useContext(LoadingContext);

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {loading ? <Loading /> : children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
