import DOMPurify from 'dompurify'

/**
 * Sanitasi HTML sebelum dirender via dangerouslySetInnerHTML. Dipakai KHUSUS untuk
 * Post.content (satu-satunya field yang dirender sebagai HTML mentah di seluruh
 * aplikasi). Backend (PostSeeder/admin panel) juga diharapkan mensanitasi -- ini
 * lapisan kedua (defense in depth), lihat 07-keamanan.md §2.
 */
export function sanitizeHtml(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'target', 'rel'],
  })
}
