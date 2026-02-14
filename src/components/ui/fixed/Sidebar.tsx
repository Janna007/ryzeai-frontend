import React from 'react';
import { LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarItem {
    label: string;
    icon: LucideIcon;
    href: string;
}

interface SidebarProps {
    items: SidebarItem[];
    activeItem?: string;
    onItemClick?: (item: SidebarItem) => void;
    collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    items = [],
    activeItem,
    onItemClick,
    collapsed = false,
}) => {
    return (
        <div
            className={`flex flex-col h-full bg-slate-900 text-slate-300 transition-all duration-300 border-r border-slate-800 ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex flex-col flex-1 py-4 overflow-y-auto">
                {items.map((item) => {
                    const isActive = activeItem === item.href;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            onClick={() => onItemClick?.(item)}
                            className={`flex items-center px-6 py-3 transition-colors hover:bg-slate-800 ${isActive ? 'bg-slate-800 text-white border-r-4 border-blue-500' : ''
                                }`}
                        >
                            {Icon && <Icon size={20} className={isActive ? 'text-blue-500' : 'text-slate-400'} />}
                            {!collapsed && (
                                <span className="ml-4 text-sm font-medium">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
