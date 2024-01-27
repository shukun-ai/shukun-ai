import { ReactNode } from 'react';
import {
  DndProvider as BaseDndProvider,
  DndProviderProps as BaseDndProviderProps,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export type DndProviderProps<BackendContext, BackendOptions> = {
  children?: ReactNode;
} & Omit<BaseDndProviderProps<BackendContext, BackendOptions>, 'backend'>;

export const DndProvider = <BackendContext, BackendOptions>({
  children,
  ...props
}: DndProviderProps<BackendContext, BackendOptions>) => {
  // @remark BaseDndProvider is constructed by RF type, is not compatible with React 18.
  return (
    <BaseDndProvider backend={HTML5Backend} {...props}>
      {children}
    </BaseDndProvider>
  );
};
