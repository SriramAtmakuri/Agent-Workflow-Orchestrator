import { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from '@/components/workflow/CustomNode';
import { NodePalette } from '@/components/workflow/NodePalette';
import { NodeConfigSidebar } from '@/components/workflow/NodeConfigSidebar';
import { VersionHistory } from '@/components/workflow/VersionHistory';
import { ImportExportButtons } from '@/components/workflow/ImportExportButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { NodeType, WorkflowNode as WorkflowNodeType, Workflow } from '@/types/workflow';
import { Save, Play, ArrowLeft, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const nodeTypes = {
  trigger: CustomNode,
  'ai-agent': CustomNode,
  api: CustomNode,
  condition: CustomNode,
  action: CustomNode,
  email: CustomNode,
  data: CustomNode,
};

interface WorkflowVersion {
  id: string;
  version: number;
  timestamp: Date;
  changes: string;
  author: string;
}

export const WorkflowEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { workflows, currentWorkflow, setCurrentWorkflow, addWorkflow, updateWorkflow } = useWorkflow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeType | null>(null);
  const [configSidebarOpen, setConfigSidebarOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [versions, setVersions] = useState<WorkflowVersion[]>([
    {
      id: 'v1',
      version: 1,
      timestamp: new Date(),
      changes: 'Initial version',
      author: 'Current User',
    },
  ]);

  useEffect(() => {
    if (id && id !== 'new') {
      const workflow = workflows.find((w) => w.id === id);
      if (workflow) {
        setCurrentWorkflow(workflow);
        setNodes(workflow.nodes as any);
        setEdges(workflow.edges as any);
        setWorkflowName(workflow.name);
        setWorkflowDescription(workflow.description);
      }
    } else if (id === 'new') {
      setNodes([]);
      setEdges([]);
      setWorkflowName('Untitled Workflow');
      setWorkflowDescription('');
    }
  }, [id, workflows, setCurrentWorkflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onAddNode = useCallback(
    (type: NodeType) => {
      const newNode: WorkflowNodeType = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
          description: `Configure ${type} node`,
          status: 'idle',
          config: {},
        },
      };
      setNodes((nds) => [...nds, newNode as any]);
    },
    [setNodes]
  );

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as any);
    setConfigSidebarOpen(true);
  }, []);

  const handleSaveNodeConfig = useCallback(
    (nodeId: string, config: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: config.label || node.data.label,
                  description: config.description || node.data.description,
                  config: { ...node.data.config, ...config },
                },
              }
            : node
        )
      );
      toast({
        title: 'Node updated',
        description: 'Node configuration saved successfully.',
      });
    },
    [setNodes, toast]
  );

  const handleSave = () => {
    const workflowData: Workflow = {
      id: id === 'new' ? `workflow-${Date.now()}` : id!,
      name: workflowName,
      description: workflowDescription,
      nodes: nodes as WorkflowNodeType[],
      edges: edges,
      createdAt: currentWorkflow?.createdAt || new Date(),
      updatedAt: new Date(),
      status: (currentWorkflow?.status || 'draft') as 'draft' | 'active' | 'paused',
    };

    if (id === 'new') {
      addWorkflow(workflowData);
      toast({
        title: 'Workflow created',
        description: 'Your workflow has been saved successfully.',
      });
      navigate(`/workflows/${workflowData.id}`);
    } else {
      updateWorkflow(id!, workflowData);
      
      // Add to version history
      setVersions((prev) => [
        {
          id: `v${prev.length + 1}`,
          version: prev.length + 1,
          timestamp: new Date(),
          changes: 'Workflow updated',
          author: 'Current User',
        },
        ...prev,
      ]);

      toast({
        title: 'Workflow updated',
        description: 'Your changes have been saved.',
      });
    }
  };

  const handleRun = () => {
    toast({
      title: 'Workflow simulation',
      description: 'This is a demo. Backend integration required for actual execution.',
    });
  };

  const handleRestoreVersion = (versionId: string) => {
    toast({
      title: 'Version restored',
      description: `Restored to version ${versionId}. This is a demo feature.`,
    });
    setVersionHistoryOpen(false);
  };

  const handleImport = (importedWorkflow: Workflow) => {
    addWorkflow(importedWorkflow);
    navigate(`/workflows/${importedWorkflow.id}`);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="max-w-md font-semibold"
            placeholder="Workflow name"
          />
          <Input
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
            className="max-w-md"
            placeholder="Description"
          />
          <div className="ml-auto flex gap-2">
            <ImportExportButtons workflow={currentWorkflow} onImport={handleImport} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVersionHistoryOpen(true)}
              className="gap-2"
            >
              <History className="h-4 w-4" />
              History
            </Button>
            <Button variant="outline" onClick={handleRun} size="sm" className="gap-2">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="p-4">
          <NodePalette onAddNode={onAddNode} />
        </div>
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>

      <NodeConfigSidebar
        open={configSidebarOpen}
        onOpenChange={setConfigSidebarOpen}
        node={selectedNode}
        onSave={handleSaveNodeConfig}
      />

      <VersionHistory
        open={versionHistoryOpen}
        onOpenChange={setVersionHistoryOpen}
        versions={versions}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
};