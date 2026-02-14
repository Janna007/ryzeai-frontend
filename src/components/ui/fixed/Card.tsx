import React from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    variant?: CardVariant;
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    children,
    footer,
    variant = 'default',
}) => {
    const variantStyles: Record<CardVariant, string> = {
        default: 'bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800',
        outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-800',
        elevated: 'bg-white shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:shadow-black/50',
    };

    return (
        <div className={`rounded-xl overflow-hidden ${variantStyles[variant]}`}>
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    {title && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>}
                    {subtitle && <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{subtitle}</p>}
                </div>
            )}
            <div className="px-6 py-4">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 uppercase tracking-wider text-xs font-bold text-gray-500 dark:bg-gray-800/50 dark:border-gray-800 dark:text-gray-400">
                    {footer}
                </div>
            )}
        </div>
    );
};
