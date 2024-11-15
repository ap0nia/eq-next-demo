"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@ap0nia/eden-react-query";
import React, { useState } from "react";
import { eden } from "./lib/eden";

export function EdenQueryProvider(props: { children?: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [edenClient] = useState(() =>
    eden.createClient({
      links: [httpBatchLink()],
    }),
  );

  return (
    <eden.Provider client={edenClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </eden.Provider>
  );
}
