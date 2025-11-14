import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WorkflowNode } from '@/types/workflow';

interface NodeConfigSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: WorkflowNode | null;
  onSave: (nodeId: string, config: any) => void;
}

export const NodeConfigSidebar = ({ open, onOpenChange, node, onSave }: NodeConfigSidebarProps) => {
  if (!node) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const config = Object.fromEntries(formData.entries());
    onSave(node.id, config);
    onOpenChange(false);
  };

  const renderNodeSpecificConfig = () => {
    switch (node.type) {
      case 'trigger':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="trigger-type">Trigger Type</Label>
              <Select name="triggerType" defaultValue="schedule">
                <SelectTrigger id="trigger-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule">Schedule</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule (Cron)</Label>
              <Input id="schedule" name="schedule" placeholder="0 9 * * *" defaultValue={node.data.config?.schedule} />
            </div>
          </>
        );

      case 'ai-agent':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="ai-model">AI Model</Label>
              <Select name="aiModel" defaultValue="gpt-4">
                <SelectTrigger id="ai-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">AI Prompt</Label>
              <Textarea 
                id="prompt" 
                name="prompt" 
                rows={6} 
                placeholder="Enter your AI prompt..."
                defaultValue={node.data.config?.prompt}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input 
                id="temperature" 
                name="temperature" 
                type="number" 
                min="0" 
                max="1" 
                step="0.1"
                defaultValue={node.data.config?.temperature || "0.7"}
              />
            </div>
          </>
        );

      case 'api':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="method">Method</Label>
              <Select name="method" defaultValue="GET">
                <SelectTrigger id="method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint">API Endpoint</Label>
              <Input 
                id="endpoint" 
                name="endpoint" 
                placeholder="https://api.example.com/endpoint"
                defaultValue={node.data.config?.endpoint}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea 
                id="headers" 
                name="headers" 
                rows={3}
                placeholder='{"Authorization": "Bearer token"}'
                defaultValue={node.data.config?.headers}
              />
            </div>
          </>
        );

      case 'condition':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select name="condition" defaultValue="equals">
                <SelectTrigger id="condition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater">Greater Than</SelectItem>
                  <SelectItem value="less">Less Than</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field to Check</Label>
              <Input 
                id="field" 
                name="field" 
                placeholder="response.status"
                defaultValue={node.data.config?.field}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input 
                id="value" 
                name="value" 
                placeholder="200"
                defaultValue={node.data.config?.value}
              />
            </div>
          </>
        );

      case 'email':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                name="recipient" 
                placeholder="user@example.com"
                defaultValue={node.data.config?.recipient}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                name="subject" 
                placeholder="Email subject"
                defaultValue={node.data.config?.subject}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Body Template</Label>
              <Textarea 
                id="body" 
                name="body" 
                rows={6}
                placeholder="Email body..."
                defaultValue={node.data.config?.body}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Configure {node.data.label}</SheetTitle>
          <SheetDescription>
            Customize the settings for this node
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSave} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="label">Node Label</Label>
            <Input 
              id="label" 
              name="label" 
              defaultValue={node.data.label} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              defaultValue={node.data.description}
              rows={2}
            />
          </div>

          {renderNodeSpecificConfig()}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Save Changes</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};