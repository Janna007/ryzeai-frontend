import React from 'react';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGap = 'none' | 'sm' | 'md' | 'lg';

interface GridProps {
    columns?: GridColumns;
    gap?: GridGap;
    children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
    columns = 12,
    gap = 'md',
    children,
}) => {
    const columnStyles: Record<GridColumns, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
    };

    const gapStyles: Record<GridGap, string> = {
        none: 'gap-0',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-8',
    };

    return (
        <div
            className={`grid w-full ${gapStyles[gap]}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
            }}
        >
            {children}
        </div>
    );
};
