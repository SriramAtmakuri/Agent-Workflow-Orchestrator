import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SecuritySettings = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Column 1: Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full">Update Password</Button>
        </CardContent>
      </Card>

      {/* Column 2: Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="2fa">Enable 2FA</Label>
            <Switch id="2fa" />
          </div>
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
          </p>
          <Button variant="outline" className="w-full">Setup 2FA</Button>
          <Button variant="ghost" className="w-full">View Backup Codes</Button>
        </CardContent>
      </Card>

      {/* Column 3: Sessions & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions & Privacy</CardTitle>
          <CardDescription>Manage your active sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="activity-log">Activity Logging</Label>
            <Switch id="activity-log" defaultChecked />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Active Sessions</p>
            <div className="text-sm text-muted-foreground">
              <p>Current session (This device)</p>
              <p className="text-xs">Last active: Just now</p>
            </div>
          </div>
          <Button variant="destructive" className="w-full">Sign Out All Devices</Button>
          <Button variant="outline" className="w-full">Download My Data</Button>
        </CardContent>
      </Card>
    </div>
  );
};