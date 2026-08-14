import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children?: ReactNode
}

function FieldWrapper({ label, error, hint, required, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}

type FormInputProps = Omit<FieldWrapperProps, 'children'> & InputHTMLAttributes<HTMLInputElement>

export function FormInput({ label, error, hint, required, className, ...rest }: FormInputProps) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={required}>
      <input
        {...rest}
        className={`form-input ${error ? 'border-destructive focus:ring-destructive/40' : ''} ${className ?? ''}`}
      />
    </FieldWrapper>
  )
}

type FormTextareaProps = Omit<FieldWrapperProps, 'children'> & TextareaHTMLAttributes<HTMLTextAreaElement>

export function FormTextarea({ label, error, hint, required, className, ...rest }: FormTextareaProps) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={required}>
      <textarea
        {...rest}
        className={`form-input text-sm ${error ? 'border-destructive focus:ring-destructive/40' : ''} ${className ?? ''}`}
      />
    </FieldWrapper>
  )
}

type FormSelectProps = FieldWrapperProps & SelectHTMLAttributes<HTMLSelectElement>

export function FormSelect({ label, error, hint, required, className, children, ...rest }: FormSelectProps) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={required}>
      <select {...rest} className={`form-input ${error ? 'border-destructive' : ''} ${className ?? ''}`}>
        {children}
      </select>
    </FieldWrapper>
  )
}

export function FormCheckbox({
  label,
  checked,
  onChange,
  id,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-border text-primary focus:ring-primary/40"
      />
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
    </div>
  )
}

/** Auto-generate slug dari judul: lowercase, spasi->strip, buang karakter non alfanumerik. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
