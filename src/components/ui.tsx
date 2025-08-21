import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'
import { forwardRef } from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        solid: 'bg-brand-600 text-white hover:bg-brand-500',
        outline: 'border border-white/15 bg-white/5 text-slate-200 hover:border-brand-500/40 hover:text-white',
        ghost: 'text-slate-200 hover:bg-white/5',
      },
      size: { sm: 'h-8 px-3', md: 'h-10 px-4', lg: 'h-12 px-6' },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, ...props }, ref) {
  return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-slate-300">{children}</span>
)

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('rounded-2xl border border-white/10 bg-white/5 backdrop-blur', className)}>{children}</div>
)

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn('h-10 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 text-sm outline-none ring-brand-500/40 focus:ring-2', className)}
      {...props}
    />
  )
})
