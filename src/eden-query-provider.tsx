"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@ap0nia/eden-react-query";
import React, { useState } from "react";
import { eden } from "./lib/eden";

function getAuthCookie() {
  return undefined;
}

export function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [edenClient] = useState(() =>
    eden.createClient({
      links: [
        httpBatchLink({
          domain: "http://localhost:3000/eden",

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );

  return (
    <eden.Provider client={edenClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
      </QueryClientProvider>
    </eden.Provider>
  );
}
