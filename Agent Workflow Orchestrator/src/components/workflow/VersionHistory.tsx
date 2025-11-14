import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Clock, RotateCcw } from 'lucide-react';

interface WorkflowVersion {
  id: string;
  version: number;
  timestamp: Date;
  changes: string;
  author: string;
}

interface VersionHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  versions: WorkflowVersion[];
  onRestore: (versionId: string) => void;
}

export const VersionHistory = ({ open, onOpenChange, versions, onRestore }: VersionHistoryProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Version History
          </SheetTitle>
          <SheetDescription>
            View and restore previous versions of this workflow
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] mt-6">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div 
                key={version.id} 
                className="border rounded-lg p-4 space-y-2 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? 'default' : 'outline'}>
                      v{version.version}
                    </Badge>
                    {index === 0 && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(version.timestamp, 'MMM d, yyyy HH:mm')}
                  </span>
                </div>

                <p className="text-sm">{version.changes}</p>
                <p className="text-xs text-muted-foreground">By {version.author}</p>

                {index !== 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => onRestore(version.id)}
                  >
                    <RotateCcw className="h-3 w-3" />
                    Restore this version
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};