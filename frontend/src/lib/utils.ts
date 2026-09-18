import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assetUrl(path?: string | null): string {
  if (!path) return ''
  const base = import.meta.env.BASE_URL ?? '/'

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  let clean = path
  if (clean.startsWith(base)) {
    clean = clean.slice(base.length)
  }
  if (clean.startsWith('/')) {
    clean = clean.slice(1)
  }

  if (clean.startsWith('images/') && clean.endsWith('.png') && !clean.includes('stikom-emblem')) {
    clean = clean.replace(/\.png$/, '.webp')
  }

  return `${base}${clean}`
}

