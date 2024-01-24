import { QueryStep } from '@ailake/apitype';
import { createContext, useContext } from 'react';

type DetailContextType = {
  executeStep: (props: { stepIndex: number; step: QueryStep }) => Promise<void>;
};

const DetailContext = createContext<DetailContextType | null>(null);

export const DetailProvider = DetailContext.Provider;

export const useDetailContext = () => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error('useDetailContext must be used within a DetailProvider');
  }
  return context;
};
