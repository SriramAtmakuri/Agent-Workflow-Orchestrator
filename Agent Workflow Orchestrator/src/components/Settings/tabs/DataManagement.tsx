import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, Upload, Trash2 } from 'lucide-react';

export const DataManagement = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Column 1: Export Data */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>Download your workflows and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export All Workflows
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export Settings
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export Activity Log
          </Button>
          <p className="text-sm text-muted-foreground">
            All exports are in JSON format and can be imported later.
          </p>
        </CardContent>
      </Card>

      {/* Column 2: Import Data */}
      <Card>
        <CardHeader>
          <CardTitle>Import Data</CardTitle>
          <CardDescription>Restore workflows from backup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Import Workflows
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Import Settings
          </Button>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-backup">Auto Backup</Label>
            <Switch id="auto-backup" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">
            Enable auto-backup to automatically save your workflows daily.
          </p>
        </CardContent>
      </Card>

      {/* Column 3: Delete Data */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Data</CardTitle>
          <CardDescription>Permanently remove data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive" className="w-full gap-2">
            <Trash2 className="h-4 w-4" />
            Clear Activity Log
          </Button>
          <Button variant="destructive" className="w-full gap-2">
            <Trash2 className="h-4 w-4" />
            Delete All Workflows
          </Button>
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Danger Zone</p>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};