'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const LayoutProvider = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
          import('@/mocks/browser').then(({ worker }) => {
            worker.start();
          });
        }
    }, []);

      
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default LayoutProvider;