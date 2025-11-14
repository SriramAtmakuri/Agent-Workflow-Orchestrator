import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MessageCircle, BookOpen, Video } from 'lucide-react';

export const HelpSupport = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Column 1: Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
          <CardDescription>Learn how to use the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Getting Started Guide
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            API Documentation
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Workflow Templates
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Best Practices
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
        </CardContent>
      </Card>

      {/* Column 2: Support */}
      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
          <CardDescription>Get help from our team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <MessageCircle className="h-4 w-4" />
            Community Forum
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </Button>
          <div className="pt-4">
            <p className="text-sm font-medium mb-1">Response Time</p>
            <p className="text-xs text-muted-foreground">
              Average response time: 2-4 hours during business hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Column 3: Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Videos and tutorials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Video className="h-4 w-4" />
            Video Tutorials
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Video className="h-4 w-4" />
            Webinars
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Blog
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
          <div className="pt-4">
            <p className="text-sm font-medium mb-1">Version</p>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
            <Button variant="link" className="h-auto p-0 text-xs">
              Check for updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};