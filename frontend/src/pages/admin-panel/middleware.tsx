import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export function RequireAdminAuth() {
  const { admin, isLoading } = useAdminAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin-panel/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
