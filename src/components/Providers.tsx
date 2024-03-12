"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const queryClient = new QueryClient()


const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (<QueryClientProvider client={queryClient}><SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>

    )
}


export default Providers