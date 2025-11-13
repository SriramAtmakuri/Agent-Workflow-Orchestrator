import { WorkflowNode, WorkflowEdge } from '@/types/workflow';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'automation' | 'communication' | 'data' | 'reporting';
  icon: string;
  nodes: Omit<WorkflowNode, 'id'>[];
  edges: Omit<WorkflowEdge, 'id'>[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'email-digest',
    name: 'Email Digest',
    description: 'Automatically collect and summarize emails into a daily digest',
    category: 'communication',
    icon: 'Mail',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Schedule Trigger',
          description: 'Daily at 9 AM',
          status: 'idle',
        },
      },
      {
        type: 'api',
        position: { x: 250, y: 150 },
        data: {
          label: 'Fetch Emails',
          description: 'Gmail API - Get unread emails',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 250 },
        data: {
          label: 'Summarize Content',
          description: 'AI summarizes email content',
          status: 'idle',
        },
      },
      {
        type: 'email',
        position: { x: 250, y: 350 },
        data: {
          label: 'Send Digest',
          description: 'Email the summary',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'api-node-1', animated: true },
      { source: 'api-node-1', target: 'ai-agent-node-2', animated: true },
      { source: 'ai-agent-node-2', target: 'email-node-3', animated: true },
    ],
  },
  {
    id: 'data-sync',
    name: 'Data Sync',
    description: 'Synchronize data between different platforms automatically',
    category: 'data',
    icon: 'Database',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Webhook Trigger',
          description: 'Listen for data updates',
          status: 'idle',
        },
      },
      {
        type: 'api',
        position: { x: 150, y: 150 },
        data: {
          label: 'Fetch Source Data',
          description: 'Get data from Platform A',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 250 },
        data: {
          label: 'Transform Data',
          description: 'AI maps and transforms fields',
          status: 'idle',
        },
      },
      {
        type: 'condition',
        position: { x: 250, y: 350 },
        data: {
          label: 'Validate Data',
          description: 'Check data quality',
          status: 'idle',
        },
      },
      {
        type: 'api',
        position: { x: 150, y: 450 },
        data: {
          label: 'Sync to Destination',
          description: 'Update Platform B',
          status: 'idle',
        },
      },
      {
        type: 'email',
        position: { x: 350, y: 450 },
        data: {
          label: 'Alert on Error',
          description: 'Notify if validation fails',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'api-node-1', animated: true },
      { source: 'api-node-1', target: 'ai-agent-node-2', animated: true },
      { source: 'ai-agent-node-2', target: 'condition-node-3', animated: true },
      { source: 'condition-node-3', target: 'api-node-4', animated: true, label: 'Valid' },
      { source: 'condition-node-3', target: 'email-node-5', animated: true, label: 'Invalid' },
    ],
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    description: 'Generate and distribute automated reports with AI insights',
    category: 'reporting',
    icon: 'FileText',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Weekly Schedule',
          description: 'Every Monday at 8 AM',
          status: 'idle',
        },
      },
      {
        type: 'data',
        position: { x: 150, y: 150 },
        data: {
          label: 'Query Database',
          description: 'Fetch weekly metrics',
          status: 'idle',
        },
      },
      {
        type: 'api',
        position: { x: 350, y: 150 },
        data: {
          label: 'Fetch External Data',
          description: 'Get analytics from API',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 250 },
        data: {
          label: 'Generate Insights',
          description: 'AI analyzes trends and patterns',
          status: 'idle',
        },
      },
      {
        type: 'action',
        position: { x: 250, y: 350 },
        data: {
          label: 'Create Report',
          description: 'Format data into report',
          status: 'idle',
        },
      },
      {
        type: 'email',
        position: { x: 250, y: 450 },
        data: {
          label: 'Distribute Report',
          description: 'Email to stakeholders',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'data-node-1', animated: true },
      { source: 'trigger-node-0', target: 'api-node-2', animated: true },
      { source: 'data-node-1', target: 'ai-agent-node-3', animated: true },
      { source: 'api-node-2', target: 'ai-agent-node-3', animated: true },
      { source: 'ai-agent-node-3', target: 'action-node-4', animated: true },
      { source: 'action-node-4', target: 'email-node-5', animated: true },
    ],
  },
  {
    id: 'slack-notifier',
    name: 'Slack Notifier',
    description: 'Monitor events and send intelligent Slack notifications',
    category: 'communication',
    icon: 'MessageSquare',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Event Trigger',
          description: 'Listen for system events',
          status: 'idle',
        },
      },
      {
        type: 'condition',
        position: { x: 250, y: 150 },
        data: {
          label: 'Filter Events',
          description: 'Check if notification needed',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 250 },
        data: {
          label: 'Format Message',
          description: 'AI creates readable summary',
          status: 'idle',
        },
      },
      {
        type: 'api',
        position: { x: 250, y: 350 },
        data: {
          label: 'Send to Slack',
          description: 'Post message to channel',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'condition-node-1', animated: true },
      { source: 'condition-node-1', target: 'ai-agent-node-2', animated: true, label: 'Important' },
      { source: 'ai-agent-node-2', target: 'api-node-3', animated: true },
    ],
  },
  {
    id: 'content-moderator',
    name: 'Content Moderator',
    description: 'Automatically review and moderate user-generated content',
    category: 'automation',
    icon: 'Shield',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'New Content',
          description: 'Webhook on submission',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 150 },
        data: {
          label: 'Analyze Content',
          description: 'AI checks for violations',
          status: 'idle',
        },
      },
      {
        type: 'condition',
        position: { x: 250, y: 250 },
        data: {
          label: 'Safety Check',
          description: 'Determine action needed',
          status: 'idle',
        },
      },
      {
        type: 'action',
        position: { x: 150, y: 350 },
        data: {
          label: 'Approve Content',
          description: 'Publish automatically',
          status: 'idle',
        },
      },
      {
        type: 'action',
        position: { x: 350, y: 350 },
        data: {
          label: 'Flag for Review',
          description: 'Send to human moderator',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'ai-agent-node-1', animated: true },
      { source: 'ai-agent-node-1', target: 'condition-node-2', animated: true },
      { source: 'condition-node-2', target: 'action-node-3', animated: true, label: 'Safe' },
      { source: 'condition-node-2', target: 'action-node-4', animated: true, label: 'Unsafe' },
    ],
  },
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    description: 'AI-powered support ticket triage and response system',
    category: 'automation',
    icon: 'Headphones',
    nodes: [
      {
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'New Ticket',
          description: 'Support system webhook',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 250, y: 150 },
        data: {
          label: 'Categorize Issue',
          description: 'AI identifies ticket type',
          status: 'idle',
        },
      },
      {
        type: 'condition',
        position: { x: 250, y: 250 },
        data: {
          label: 'Can Auto-Resolve?',
          description: 'Check if common issue',
          status: 'idle',
        },
      },
      {
        type: 'ai-agent',
        position: { x: 150, y: 350 },
        data: {
          label: 'Generate Response',
          description: 'AI crafts solution',
          status: 'idle',
        },
      },
      {
        type: 'action',
        position: { x: 350, y: 350 },
        data: {
          label: 'Assign to Agent',
          description: 'Route to human support',
          status: 'idle',
        },
      },
      {
        type: 'email',
        position: { x: 150, y: 450 },
        data: {
          label: 'Send Response',
          description: 'Reply to customer',
          status: 'idle',
        },
      },
    ],
    edges: [
      { source: 'trigger-node-0', target: 'ai-agent-node-1', animated: true },
      { source: 'ai-agent-node-1', target: 'condition-node-2', animated: true },
      { source: 'condition-node-2', target: 'ai-agent-node-3', animated: true, label: 'Yes' },
      { source: 'condition-node-2', target: 'action-node-4', animated: true, label: 'No' },
      { source: 'ai-agent-node-3', target: 'email-node-5', animated: true },
    ],
  },
];
