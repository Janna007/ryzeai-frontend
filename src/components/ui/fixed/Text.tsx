import React from 'react';

type TextVariant = 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'label';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps {
    variant?: TextVariant;
    weight?: TextWeight;
    children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
    variant = 'body',
    weight = 'normal',
    children,
}) => {
    const variantStyles: Record<TextVariant, string> = {
        heading1: 'text-4xl font-extrabold tracking-tight dark:text-gray-100',
        heading2: 'text-2xl font-bold tracking-tight dark:text-gray-100',
        heading3: 'text-xl font-semibold dark:text-gray-100',
        body: 'text-base leading-relaxed dark:text-gray-300',
        caption: 'text-sm text-gray-500 dark:text-gray-400',
        label: 'text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500',
    };

    const weightStyles: Record<TextWeight, string> = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const Component = ['heading1', 'heading2', 'heading3'].includes(variant)
        ? (variant === 'heading1' ? 'h1' : variant === 'heading2' ? 'h2' : 'h3')
        : 'p';

    return (
        <Component className={`${variantStyles[variant]} ${weightStyles[weight]} text-gray-900 dark:text-gray-100`}>
            {children}
        </Component>
    );
};
