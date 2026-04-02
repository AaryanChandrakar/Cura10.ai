'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DemoReport } from '@/lib/demoReports';

interface DemoContextType {
    selectedDemo: DemoReport | null;
    selectDemo: (report: DemoReport) => void;
    clearDemo: () => void;
}

const DemoContext = createContext<DemoContextType>({
    selectedDemo: null,
    selectDemo: () => { },
    clearDemo: () => { },
});

export function DemoProvider({ children }: { children: React.ReactNode }) {
    const [selectedDemo, setSelectedDemo] = useState<DemoReport | null>(null);

    const selectDemo = useCallback((report: DemoReport) => {
        setSelectedDemo(report);
    }, []);

    const clearDemo = useCallback(() => {
        setSelectedDemo(null);
    }, []);

    return (
        <DemoContext.Provider value={{ selectedDemo, selectDemo, clearDemo }}>
            {children}
        </DemoContext.Provider>
    );
}

export const useDemo = () => useContext(DemoContext);
