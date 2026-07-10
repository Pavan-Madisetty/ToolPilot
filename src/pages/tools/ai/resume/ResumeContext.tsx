/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode } from 'react';
import { useResumeStore } from '@/stores/resumeStore';

const ResumeContext = createContext<ReturnType<typeof useResumeStore> | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const store = useResumeStore();
  return <ResumeContext.Provider value={store}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
