import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/lib/theme-provider'
import { AdminAuthProvider } from '@/hooks/useAdminAuth'
import { ToastProvider } from '@/components/site/toast'
import { ConfirmDialogProvider } from '@/components/site/confirm-dialog'
import { router } from '@/routes/router'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ConfirmDialogProvider>
            <AdminAuthProvider>
              <RouterProvider router={router} />
            </AdminAuthProvider>
          </ConfirmDialogProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
