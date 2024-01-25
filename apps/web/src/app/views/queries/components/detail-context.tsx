import { Result } from '@ailake/apitype';
import { createContext, useContext } from 'react';

type DetailContextType = {
  activeStepIndex: number | undefined;
  setActiveStepIndex: (stepIndex: number | undefined) => void;
  runTextToResult: (props: { stepIndex: number }) => Promise<void>;
  runTextToSql: (props: { stepIndex: number }) => Promise<void>;
  runSqlToResult: (props: { stepIndex: number }) => Promise<void>;
  globalSchemaId: string | undefined;
  setGlobalSchemaId: (schemaId: string | undefined) => void;
  results: Result[];
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
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
