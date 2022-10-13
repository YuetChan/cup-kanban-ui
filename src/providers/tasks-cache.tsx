import React, { useMemo, useReducer, createContext, useContext  } from 'react';
import { initialState, TasksCacheReducer } from '../stores/tasks-cache-reducer';

import { Task } from '../types/Task';

interface TasksCacheContext {
  state: {
    _allTasks: {
      'backlog': Array<Task>,
      'todo': Array<Task>,
      'inProgress': Array<Task>,
      'done': Array<Task>
    }
  },
  Dispatch: any
}

const TasksCacheContext = createContext<TasksCacheContext>({
  state: {
    _allTasks: {
      'backlog': [],
      'todo': [],
      'inProgress': [],
      'done': []
    }
  },
  Dispatch: undefined
});

export function TasksCacheProvider ({ children }: { children: any }) {
  const [ state, Dispatch ] = useReducer(TasksCacheReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, Dispatch };
  }, [ state, Dispatch ]);

  return (
    <TasksCacheContext.Provider value={ contextValue }>
      { children }
    </TasksCacheContext.Provider>
  );
}

export function useTasksCacheContext() {
  return useContext(TasksCacheContext);
}