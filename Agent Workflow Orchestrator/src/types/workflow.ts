import React from 'react';

export type NodeType = 'trigger' | 'ai-agent' | 'api' | 'condition' | 'action' | 'email' | 'data';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    config?: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string | React.ReactNode;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'paused';
}
