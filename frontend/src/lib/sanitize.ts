import DOMPurify from 'dompurify'

export function sanitizeHtml(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'target', 'rel'],
  })
}
