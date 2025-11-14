import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { Workflow } from '@/types/workflow';
import { useToast } from '@/hooks/use-toast';
import { useRef } from 'react';

interface ImportExportButtonsProps {
  workflow: Workflow | null;
  onImport: (workflow: Workflow) => void;
}

export const ImportExportButtons = ({ workflow, onImport }: ImportExportButtonsProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!workflow) {
      toast({
        title: 'No workflow to export',
        description: 'Please save your workflow first.',
        variant: 'destructive',
      });
      return;
    }

    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${workflow.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Workflow exported',
      description: 'Your workflow has been downloaded as a JSON file.',
    });
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedWorkflow = JSON.parse(event.target?.result as string);
        
        // Validate the workflow structure
        if (!importedWorkflow.nodes || !importedWorkflow.edges) {
          throw new Error('Invalid workflow file');
        }

        // Generate new ID for imported workflow
        const newWorkflow: Workflow = {
          ...importedWorkflow,
          id: `workflow-${Date.now()}`,
          name: `${importedWorkflow.name} (Imported)`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        onImport(newWorkflow);
        
        toast({
          title: 'Workflow imported',
          description: 'The workflow has been successfully imported.',
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'The file is not a valid workflow JSON.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" size="sm" onClick={handleImport} className="gap-2">
        <Upload className="h-4 w-4" />
        Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};