import React from 'react';

type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface StackProps {
    gap?: StackGap;
    children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
    gap = 'md',
    children,
}) => {
    const gapStyles: Record<StackGap, string> = {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-8',
        xl: 'gap-12',
    };

    return (
        <div className={`flex flex-col ${gapStyles[gap]} w-full`}>
            {children}
        </div>
    );
};
