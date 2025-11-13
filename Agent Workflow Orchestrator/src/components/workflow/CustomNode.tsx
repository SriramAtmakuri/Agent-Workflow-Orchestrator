import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Brain,
  Globe,
  GitBranch,
  Play,
  Mail,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nodeIcons = {
  trigger: Zap,
  'ai-agent': Brain,
  api: Globe,
  condition: GitBranch,
  action: Play,
  email: Mail,
  data: Database,
};

const nodeColors = {
  trigger: 'bg-workflow-warning/10 border-workflow-warning',
  'ai-agent': 'bg-workflow-processing/10 border-workflow-processing',
  api: 'bg-workflow-info/10 border-workflow-info',
  condition: 'bg-accent border-border',
  action: 'bg-workflow-success/10 border-workflow-success',
  email: 'bg-workflow-info/10 border-workflow-info',
  data: 'bg-muted border-border',
};

export const CustomNode = memo(({ data, type }: NodeProps) => {
  const Icon = nodeIcons[type as keyof typeof nodeIcons] || Play;
  const colorClass = nodeColors[type as keyof typeof nodeColors] || 'bg-card border-border';

  return (
    <Card className={cn('min-w-[200px] border-2', colorClass)}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-4 w-4" />
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
        )}
        {data.status && data.status !== 'idle' && (
          <Badge
            variant="outline"
            className={cn(
              'text-xs',
              data.status === 'success' && 'border-workflow-success text-workflow-success',
              data.status === 'running' && 'border-workflow-processing text-workflow-processing',
              data.status === 'error' && 'border-destructive text-destructive'
            )}
          >
            {data.status}
          </Badge>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  );
});

CustomNode.displayName = 'CustomNode';
