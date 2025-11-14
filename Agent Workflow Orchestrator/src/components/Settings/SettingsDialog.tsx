import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Database, HelpCircle, SlidersHorizontal } from 'lucide-react';
import { UserProfileSettings } from './tabs/UserProfileSettings.tsx';
import { GeneralPreferences } from './tabs/GeneralPreferences.tsx';
import { NotificationSettings } from './tabs/NotificationSettings.tsx';
import { SecuritySettings } from './tabs/SecuritySettings.tsx';
import { DataManagement } from './tabs/DataManagement.tsx';
import { HelpSupport } from './tabs/HelpSupport.tsx';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTab: string;
  onTabChange: (tab: string) => void; 
}

export const SettingsDialog = ({ open, onOpenChange, selectedTab, onTabChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="help" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Help
            </TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto max-h-[calc(85vh-140px)] px-6 py-4">
            <TabsContent value="profile">
              <UserProfileSettings />
            </TabsContent>
            <TabsContent value="preferences">
              <GeneralPreferences />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="data">
              <DataManagement />
            </TabsContent>
            <TabsContent value="help">
              <HelpSupport />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};