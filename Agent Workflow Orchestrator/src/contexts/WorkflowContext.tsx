import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workflow } from '@/types/workflow';

interface WorkflowContextType {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  setCurrentWorkflow: (workflow: Workflow | null) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);

  const addWorkflow = (workflow: Workflow) => {
    setWorkflows((prev) => [...prev, workflow]);
  };

  const updateWorkflow = (id: string, updates: Partial<Workflow>) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, ...updates, updatedAt: new Date() } : wf))
    );
    if (currentWorkflow?.id === id) {
      setCurrentWorkflow({ ...currentWorkflow, ...updates, updatedAt: new Date() });
    }
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((wf) => wf.id !== id));
    if (currentWorkflow?.id === id) {
      setCurrentWorkflow(null);
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflows,
        currentWorkflow,
        setCurrentWorkflow,
        addWorkflow,
        updateWorkflow,
        deleteWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
