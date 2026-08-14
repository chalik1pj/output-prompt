import type { ReactNode } from 'react'
import { GlassCard } from '@/components/site/glass-card'
import { Inbox } from 'lucide-react'

interface TableShellProps {
  loading: boolean
  isEmpty: boolean
  emptyMessage?: string
  skeletonRows?: number
  columnCount: number
  children: ReactNode
}

/**
 * Bungkus <table> dengan skeleton shimmer saat loading (bukan teks "Memuat...").
 * Skeleton mempertahankan tinggi & struktur tabel supaya tidak ada layout-shift
 * saat data datang -- ini yang bikin UI terasa jauh lebih stabil/cepat walau
 * request-nya sendiri butuh waktu sama.
 */
export function TableShell({
  loading,
  isEmpty,
  emptyMessage = 'Belum ada data.',
  skeletonRows = 6,
  columnCount,
  children,
}: TableShellProps) {
  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          {loading ? (
            <tbody>
              {Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0">
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div
                        className="h-4 animate-pulse rounded bg-secondary"
                        style={{ width: `${55 + ((i * 13 + j * 7) % 40)}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : isEmpty ? (
            <tbody>
              <tr>
                <td colSpan={columnCount} className="px-6 py-16 text-center">
                  <Inbox className="mx-auto size-8 text-muted-foreground/50" />
                  <p className="mt-3 text-sm text-muted-foreground">{emptyMessage}</p>
                </td>
              </tr>
            </tbody>
          ) : (
            children
          )}
        </table>
      </div>
    </GlassCard>
  )
}
