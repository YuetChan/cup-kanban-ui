import React, { useMemo, useReducer, createContext, useContext  } from 'react';
import { Project } from '../types/Project';
import { initialState, ProjectsCacheReducer } from '../stores/projects-cache-reducer';

interface ProjectsCacheContext {
  state: {
    _activeProject: Project | undefined,
    _allProjects: Array<Project>
  },
  Dispatch: any
}

const ProjectsCacheContext = createContext<ProjectsCacheContext>({
  state: {
    _activeProject: undefined,
    _allProjects: [],
  },
  Dispatch: undefined
});

export function ProjectsCacheProvider ({ children }: { children: any }) {
  const [ state, Dispatch ] = useReducer(ProjectsCacheReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, Dispatch };
  }, [ state, Dispatch ]);

  return (
    <ProjectsCacheContext.Provider value={ contextValue }>
      { children }
    </ProjectsCacheContext.Provider>
  );
}

export function useProjectsCacheContext() {
  return useContext(ProjectsCacheContext);
}