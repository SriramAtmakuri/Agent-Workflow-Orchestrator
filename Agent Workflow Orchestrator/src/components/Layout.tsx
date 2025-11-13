import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Workflow, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">AI Workflow Orchestrator</h1>
          </div>
          <nav className="flex gap-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/workflows">
              <Button
                variant={isActive('/workflows') ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Workflow className="h-4 w-4" />
                Workflows
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
