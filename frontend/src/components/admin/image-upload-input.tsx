import { useState, useRef } from "react"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"
import api from "@/lib/api"

interface ImageUploadInputProps {
  label: string
  value?: string
  onChange: (url: string) => void
  placeholder?: string
  required?: boolean
}

export function ImageUploadInput({ label, value, onChange, placeholder, required }: ImageUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran maksimal gambar adalah 5MB')
      return
    }

    try {
      setIsUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/admin/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data?.url) {
        onChange(response.data.url)
      } else {
        setError('Gagal mengupload gambar')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat upload')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isUploading}
        />

        <div className="p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-primary-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-sm font-medium">Mengupload...</span>
            </div>
          ) : value ? (
            <div className="w-full relative z-20 group">
              <img
                src={value.startsWith('http') ? value : `http://localhost:8000${value}`}
                alt="Preview"
                className="max-h-[200px] mx-auto rounded object-contain"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <Upload className="w-8 h-8 mb-3" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Klik atau drag file gambar ke sini
              </p>
              <p className="text-xs mt-1">
                PNG, JPG, WEBP maks 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}

      {/* Fallback manual input just in case they still need to input external URL */}
      <div className="flex items-center gap-2 mt-2">
        <ImageIcon className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Atau masukkan URL gambar secara manual"}
          className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </div>
    </div>
  )
}
