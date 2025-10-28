"use client";

import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useSidebarStats } from '@/hooks/useSidebarStats';

interface StatsContextType {
    refreshStats: () => void;
    stats: any;
    loading: boolean;
    error: string | null;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStatsContext = () => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error('useStatsContext must be used within a StatsProvider');
    }
    return context;
};

interface StatsProviderProps {
    children: ReactNode;
}

export const StatsProvider = ({ children }: StatsProviderProps) => {
    const { stats, loading, error, refresh } = useSidebarStats();

    const refreshStats = useCallback(() => {
        console.log('Refreshing stats from context...');
        refresh();
    }, [refresh]); return (
        <StatsContext.Provider value={{
            refreshStats,
            stats,
            loading,
            error
        }}>
            {children}
        </StatsContext.Provider>
    );
};