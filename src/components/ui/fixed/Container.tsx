import React from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
    size?: ContainerSize;
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    size = 'lg',
    children,
}) => {
    const sizeStyles: Record<ContainerSize, string> = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        full: 'max-w-full',
    };

    return (
        <div className={`mx-auto px-4 w-full ${sizeStyles[size]}`}>
            {children}
        </div>
    );
};
