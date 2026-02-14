import React from 'react';

interface NavItem {
    label: string;
    href: string;
}

interface NavbarProps {
    title: string;
    items: NavItem[];
    actions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
    title,
    items,
    actions,
}) => {
    return (
        <nav className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
                <div className="hidden md:flex items-center gap-1 ml-4">
                    {items.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3">
                {actions}
            </div>
        </nav>
    );
};
