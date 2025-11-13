import { useState } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Play, Pause, Trash2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { TemplateGallery } from '@/components/workflow/TemplateGallery';
import { WorkflowTemplate } from '@/data/workflowTemplates';
import { Workflow } from '@/types/workflow';

export const Dashboard = () => {
  const { workflows, deleteWorkflow, updateWorkflow, addWorkflow } = useWorkflow();
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);

  const createNewWorkflow = () => {
    navigate('/workflows/new');
  };

  const createFromTemplate = (template: WorkflowTemplate) => {
    const newWorkflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: template.name,
      description: template.description,
      nodes: template.nodes.map((node, index) => ({
        ...node,
        id: `${node.type}-node-${index}`,
      })),
      edges: template.edges.map((edge, index) => ({
        ...edge,
        id: `edge-${index}`,
        source: edge.source.replace(/-\d+$/, `-node-${template.nodes.findIndex((n) => n.type === edge.source.split('-')[0])}`),
        target: edge.target.replace(/-\d+$/, `-node-${template.nodes.findIndex((n, i) => n.type === edge.target.split('-')[0] && i > template.nodes.findIndex((n2) => n2.type === edge.source.split('-')[0]))}`),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
    };
    addWorkflow(newWorkflow);
    navigate(`/workflows/${newWorkflow.id}`);
  };

  const toggleWorkflowStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    updateWorkflow(id, { status: newStatus });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Workflows</h2>
          <p className="text-muted-foreground mt-2">
            Create and manage your AI-powered automation workflows
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowTemplates(true)} variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Use Template
          </Button>
          <Button onClick={createNewWorkflow} className="gap-2">
            <Plus className="h-4 w-4" />
            Blank Workflow
          </Button>
        </div>
      </div>

      <TemplateGallery
        open={showTemplates}
        onOpenChange={setShowTemplates}
        onSelectTemplate={createFromTemplate}
      />

      {workflows.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Sparkles className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No workflows yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Get started by creating your first workflow. Use a template or start from scratch
              with drag-and-drop nodes to build powerful automation with AI agents.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setShowTemplates(true)} variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Browse Templates
              </Button>
              <Button onClick={createNewWorkflow} className="gap-2">
                <Plus className="h-4 w-4" />
                Start from Scratch
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <Badge
                    variant={
                      workflow.status === 'active'
                        ? 'default'
                        : workflow.status === 'paused'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {workflow.status}
                  </Badge>
                </div>
                <CardDescription>{workflow.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">
                    {workflow.nodes.length} nodes
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {workflow.edges.length} connections
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/workflows/${workflow.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleWorkflowStatus(workflow.id, workflow.status)}
                  >
                    {workflow.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteWorkflow(workflow.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
