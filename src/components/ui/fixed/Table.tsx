import React from 'react';

interface Column {
    key: string;
    label: string;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    variant?: 'default' | 'striped' | 'bordered';
}

export const Table: React.FC<TableProps> = ({
    columns = [],
    data = [],
    variant = 'default',
}) => {
    const tableStyles = {
        default: '',
        striped: '[&_tbody_tr:nth-child(even)]:bg-gray-50 dark:[&_tbody_tr:nth-child(even)]:bg-gray-800/20',
        bordered: 'border border-gray-200 dark:border-gray-800 [&_th]:border-b [&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0 dark:[&_th]:border-gray-800 dark:[&_td]:border-gray-800',
    };

    return (
        <div className="relative w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 ${tableStyles[variant]}`}>
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 font-bold">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-6 py-4 font-semibold">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                {columns.map((col) => (
                                    <td key={`${rowIndex}-${col.key}`} className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-500 italic dark:text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
