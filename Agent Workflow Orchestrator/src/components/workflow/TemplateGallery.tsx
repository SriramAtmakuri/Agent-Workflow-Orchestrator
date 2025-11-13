import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { workflowTemplates, WorkflowTemplate } from '@/data/workflowTemplates';
import { Mail, Database, FileText, MessageSquare, Shield, Headphones, Sparkles } from 'lucide-react';

interface TemplateGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: WorkflowTemplate) => void;
}

const iconMap = {
  Mail,
  Database,
  FileText,
  MessageSquare,
  Shield,
  Headphones,
};

const categoryLabels = {
  automation: 'Automation',
  communication: 'Communication',
  data: 'Data',
  reporting: 'Reporting',
};

export const TemplateGallery = ({ open, onOpenChange, onSelectTemplate }: TemplateGalleryProps) => {
  const categories = ['all', ...Object.keys(categoryLabels)] as const;

  const getFilteredTemplates = (category: string) => {
    if (category === 'all') return workflowTemplates;
    return workflowTemplates.filter((t) => t.category === category);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Workflow Templates
          </DialogTitle>
          <DialogDescription>
            Choose a pre-built template to get started quickly. You can customize it after creation.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFilteredTemplates(category).map((template) => {
                  const Icon = iconMap[template.icon as keyof typeof iconMap] || Mail;
                  return (
                    <Card
                      key={template.id}
                      className="hover:shadow-lg transition-all hover:border-primary cursor-pointer"
                      onClick={() => {
                        onSelectTemplate(template);
                        onOpenChange(false);
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="rounded-lg bg-primary/10 p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary">
                            {categoryLabels[template.category]}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                          <span>{template.nodes.length} nodes</span>
                          <span>•</span>
                          <span>{template.edges.length} connections</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
