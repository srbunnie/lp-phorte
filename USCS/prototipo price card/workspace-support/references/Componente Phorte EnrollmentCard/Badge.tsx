import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary-dark',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-dark',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-orange-500 text-white hover:bg-orange-600',
        info: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'text-slate-700 border border-slate-200',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
};
