import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const NotificationSettings = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Column 1: Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage email alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-workflow">Workflow Status</Label>
            <Switch id="email-workflow" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-errors">Error Alerts</Label>
            <Switch id="email-errors" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-updates">Product Updates</Label>
            <Switch id="email-updates" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-tips">Tips & Tutorials</Label>
            <Switch id="email-tips" />
          </div>
        </CardContent>
      </Card>

      {/* Column 2: In-App Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Control in-app alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="app-workflow">Workflow Completion</Label>
            <Switch id="app-workflow" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="app-errors">Error Notifications</Label>
            <Switch id="app-errors" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="app-comments">Comments & Mentions</Label>
            <Switch id="app-comments" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="app-sound">Sound Effects</Label>
            <Switch id="app-sound" />
          </div>
        </CardContent>
      </Card>

      {/* Column 3: Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Mobile and desktop alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-enabled">Enable Push Notifications</Label>
            <Switch id="push-enabled" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-urgent">Urgent Only</Label>
            <Switch id="push-urgent" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-dnd">Do Not Disturb</Label>
            <Switch id="push-dnd" />
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            Push notifications are currently disabled in your browser. Enable them in your browser settings to receive alerts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};