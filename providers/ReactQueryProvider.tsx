"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
	children,
}) => {
	const [queryClient] = useState(() => {
		const client = new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 60 * 5, // 5 minutes
					gcTime: 1000 * 60 * 30, // Garbage collect after 30 min
					retry: 2,
					refetchOnWindowFocus: false,
					refetchOnMount: false,
				},
			},
		});

		// Create a sessionStorage persister
		const persister = createAsyncStoragePersister({
			storage:
				typeof window !== "undefined" ? window.sessionStorage : undefined,
		});

		// Persist the query client
		persistQueryClient({
			queryClient: client,
			persister,
			maxAge: 1000 * 60 * 60 * 24, // 24 hours
		});

		return client;
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
