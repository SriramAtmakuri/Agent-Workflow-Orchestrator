import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Settings, User, SlidersHorizontal, Bell, Shield, Database, HelpCircle } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog.tsx';

export const SettingsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('profile');

  const handleOpenSettings = (tab: string) => {
    setSelectedTab(tab);
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleOpenSettings('profile')}>
            <User className="h-4 w-4 mr-2" />
            User Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenSettings('preferences')}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            General Preferences
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenSettings('notifications')}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleOpenSettings('security')}>
            <Shield className="h-4 w-4 mr-2" />
            Security & Privacy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenSettings('data')}>
            <Database className="h-4 w-4 mr-2" />
            Data Management
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleOpenSettings('help')}>
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Support
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog 
        open={open} 
        onOpenChange={setOpen} 
        selectedTab={selectedTab} 
        onTabChange={setSelectedTab} 
      />
    </>
  );
};