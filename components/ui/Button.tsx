import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg'| 'xl';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    children, 
    ...props 
  }, ref) => {
    const getClasses = () => {
      const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
      
      const variants = {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl ring-primary-500',
        secondary: 'bg-background-100 hover:bg-primary-50 text-primary-700 ring-primary-500',
        outline: 'border-2 border-primary-200 hover:bg-primary-50 text-primary-700 ring-primary-500',
      };
      
      const sizes = {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-15 px-4 text-sm',
      };

      return `${base} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`;
    };

    return (
      <button ref={ref} className={getClasses()} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
