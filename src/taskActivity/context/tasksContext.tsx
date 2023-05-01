import { createContext, useContext, useState } from 'react';

export type TasksContextType = {
    canEdit: boolean;
    setCanEdit: (newState:boolean) => void;
}

const TasksContext = createContext<TasksContextType>(undefined!);
export default TasksContext;


export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [canEdit, setCanEdit] = useState(
    false
  );

  return (
    <TasksContext.Provider value={{canEdit, setCanEdit}}>
        {children}
    </TasksContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TasksContext);
}




