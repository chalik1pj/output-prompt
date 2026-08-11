import { Link } from 'react-router-dom'
import { GradientButton } from '@/components/site/gradient-button'

export default function NotFound() {
  return (
    <div className="mx-content flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="font-display text-8xl font-extrabold text-gradient">404</span>
      <h1 className="font-display mt-4 text-2xl font-bold">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-8">
        <GradientButton href="/">Kembali ke Beranda</GradientButton>
      </div>
    </div>
  )
}
