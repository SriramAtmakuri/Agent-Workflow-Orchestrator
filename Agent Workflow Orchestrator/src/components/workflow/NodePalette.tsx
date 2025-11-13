import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Brain,
  Globe,
  GitBranch,
  Play,
  Mail,
  Database,
} from 'lucide-react';
import { NodeType } from '@/types/workflow';

interface NodePaletteProps {
  onAddNode: (type: NodeType) => void;
}

const nodeTypes = [
  { type: 'trigger' as NodeType, icon: Zap, label: 'Trigger', description: 'Start workflow' },
  { type: 'ai-agent' as NodeType, icon: Brain, label: 'AI Agent', description: 'Process with AI' },
  { type: 'api' as NodeType, icon: Globe, label: 'API Call', description: 'External API' },
  { type: 'condition' as NodeType, icon: GitBranch, label: 'Condition', description: 'Branch logic' },
  { type: 'action' as NodeType, icon: Play, label: 'Action', description: 'Execute task' },
  { type: 'email' as NodeType, icon: Mail, label: 'Email', description: 'Send email' },
  { type: 'data' as NodeType, icon: Database, label: 'Data', description: 'Store data' },
];

export const NodePalette = ({ onAddNode }: NodePaletteProps) => {
  return (
    <Card className="p-4 w-64 bg-card">
      <h3 className="font-semibold mb-4 text-foreground">Node Palette</h3>
      <div className="space-y-2">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          return (
            <Button
              key={node.type}
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => onAddNode(node.type)}
            >
              <Icon className="h-4 w-4" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{node.label}</div>
                <div className="text-xs text-muted-foreground">{node.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
