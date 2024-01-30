import {
  Result,
  remove,
  Query,
  QueryGeneratedQuery,
  QueryQueriedFields,
  QueryGeneratorSqlToResultOutput,
  update,
  QueryRetrieveOutput,
} from '@shukun-ai/apitype';
import { BehaviorSubject } from 'rxjs';
import { sqlToResult, textToSql } from '../../../../apis/query-generator';

export type State = {
  initializedQueryId: string | undefined;
  query: QueryRetrieveOutput | undefined;
  activeStepIndex: number | undefined;
  globalSchemaId: string | undefined;
  results: Result[];
  globalLoading: boolean;
  generatedStepIndex: number | undefined;
};

const initialState: State = {
  initializedQueryId: undefined,
  query: undefined,
  activeStepIndex: undefined,
  globalSchemaId: undefined,
  results: [],
  globalLoading: false,
  generatedStepIndex: undefined,
};

const state = new BehaviorSubject<State>(initialState);

export const getObservable = () => state.asObservable();

export const dispatch = {
  initQuery: async (query: QueryRetrieveOutput): Promise<void> => {
    if (state.value.initializedQueryId === query.queryId) {
      return;
    }

    state.next({
      ...state.value,
      query,
    });

    const metadata = query.metadata;

    if (!metadata) {
      return;
    }

    const stepIndex = metadata.steps.length - 1;

    if (stepIndex < 0) {
      return;
    }

    dispatch.setActiveStepIndex(stepIndex);
    dispatch.setGlobalSchemaId(metadata.steps[stepIndex].schemaId);
    dispatch.setGeneratedStepIndex(stepIndex);

    const steps = metadata.steps;
    for (let i = 0; i < steps.length; i++) {
      await dispatch.runSqlToResult({ stepIndex: i });
    }

    state.next({
      ...state.value,
      initializedQueryId: query.queryId,
    });
  },
  clearQuery: () => {
    state.next(initialState);
  },
  setMetadata: (metadata: Query): void => {
    if (!state.value.query) {
      throw new Error('The query is not initialized.');
    }
    state.next({
      ...state.value,
      query: {
        ...state.value.query,
        metadata,
      },
    });
  },
  setActiveStepIndex: (stepIndex: number | undefined): void => {
    state.next({ ...state.value, activeStepIndex: stepIndex });
  },
  setGlobalSchemaId: (schemaId: string | undefined): void => {
    state.next({ ...state.value, globalSchemaId: schemaId });
  },
  removeOneResult: (resultIndex: number): void => {
    const results = [...state.value.results];
    const newResults = remove(results, resultIndex);
    state.next({ ...state.value, results: newResults });
  },
  setGlobalLoading: (loading: boolean): void => {
    state.next({ ...state.value, globalLoading: loading });
  },
  setGeneratedStepIndex: (stepIndex: number | undefined): void => {
    state.next({ ...state.value, generatedStepIndex: stepIndex });
  },
  runTextToSql: async ({ stepIndex }: { stepIndex: number }): Promise<void> => {
    const metadata = state.value.query?.metadata;
    if (!metadata) {
      return;
    }
    dispatch.setGlobalLoading(true);
    let generatedQuery: QueryGeneratedQuery | undefined;
    try {
      const data = await textToSql({
        metadata,
        stepIndex,
      });
      generatedQuery = data.generatedQuery;
    } finally {
      dispatch.setGlobalLoading(false);
    }
    if (!generatedQuery) {
      throw new Error('No generated query');
    }
    const steps = metadata.steps;
    const newSteps = structuredClone(steps);
    newSteps[stepIndex].generatedQuery = generatedQuery;
    dispatch.setMetadata({
      ...metadata,
      steps: newSteps,
    });
  },
  runSqlToResult: async ({
    stepIndex,
  }: {
    stepIndex: number;
  }): Promise<void> => {
    const metadata = state.value.query?.metadata;
    if (!metadata) {
      return;
    }
    dispatch.setGlobalLoading(true);
    let data: QueryGeneratorSqlToResultOutput | undefined;
    try {
      data = await sqlToResult({
        metadata,
        stepIndex,
      });
    } finally {
      dispatch.setGlobalLoading(false);
    }
    const queriedFields: QueryQueriedFields = {
      fields: data.result.fields,
      lastGeneratedAt: new Date().toISOString(),
    };
    const steps = metadata.steps;
    const newSteps = structuredClone(steps);
    newSteps[stepIndex].queriedFields = queriedFields;
    dispatch.setMetadata({
      ...metadata,
      steps: newSteps,
    });
    const result: Result = data.result;
    state.next({
      ...state.value,
      results: update(state.value.results, stepIndex, result),
    });
    dispatch.setGeneratedStepIndex(stepIndex);
  },
  runTextToResult: async (props: { stepIndex: number }): Promise<void> => {
    await dispatch.runTextToSql(props);
    await dispatch.runSqlToResult(props);
  },
};
