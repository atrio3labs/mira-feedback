import { FeedbackItem, FeedbackStatus, FeedbackCategory, ChangelogEntry } from '../types';

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: '1',
    title: 'Dark Mode Support',
    description: 'It would be great to have a native dark mode that respects system preferences. The current light theme is beautiful but can be bright at night.',
    status: FeedbackStatus.IN_PROGRESS,
    category: FeedbackCategory.FEATURE,
    votes: 142,
    createdAt: '2023-10-15T10:00:00Z',
    comments: [
      { id: 'c1', author: 'Sarah J.', content: 'Yes please! My eyes need this.', timestamp: '2023-10-15T12:30:00Z' },
      { id: 'c2', author: 'Mike T.', content: 'Critical for developer tools.', timestamp: '2023-10-16T09:15:00Z' }
    ]
  },
  {
    id: '2',
    title: 'Mobile App Notifications',
    description: 'Push notifications for status updates on tickets I follow would be very helpful to stay in the loop.',
    status: FeedbackStatus.PLANNED,
    category: FeedbackCategory.FEATURE,
    votes: 89,
    createdAt: '2023-10-18T14:20:00Z',
    comments: []
  },
  {
    id: '3',
    title: 'Fix: Image Upload Timeout',
    description: 'Uploading images larger than 5MB seems to time out consistently on the feedback form.',
    status: FeedbackStatus.COMPLETED,
    category: FeedbackCategory.BUG,
    votes: 45,
    createdAt: '2023-10-10T08:45:00Z',
    comments: [
      { id: 'c3', author: 'Admin', content: 'Fixed in version 1.0.2', timestamp: '2023-10-20T11:00:00Z' }
    ]
  },
  {
    id: '4',
    title: 'Better Keyboard Navigation',
    description: 'Allow navigating through the kanban board using arrow keys.',
    status: FeedbackStatus.OPEN,
    category: FeedbackCategory.IMPROVEMENT,
    votes: 34,
    createdAt: '2023-10-25T16:00:00Z',
    comments: []
  },
  {
    id: '5',
    title: 'API Access for Enterprise',
    description: 'We need read/write access to the roadmap data to integrate with our internal tools.',
    status: FeedbackStatus.OPEN,
    category: FeedbackCategory.FEATURE,
    votes: 12,
    createdAt: '2023-10-26T09:30:00Z',
    comments: []
  },
  {
    id: '6',
    title: 'SSO Login',
    description: 'Google and GitHub SSO login options.',
    status: FeedbackStatus.IN_PROGRESS,
    category: FeedbackCategory.FEATURE,
    votes: 76,
    createdAt: '2023-10-27T11:00:00Z',
    comments: []
  }
];

export const INITIAL_CHANGELOG: ChangelogEntry[] = [
  {
    id: 'cl1',
    version: 'v2.1',
    date: 'December 15, 2024',
    title: 'AI-Powered Feedback Summaries',
    tags: ['AI', 'Performance', 'Analytics'],
    highlights: [
      '**Intelligent categorization** with automatic feedback analysis',
      '**Trend detection** to identify popular feature requests',
      '**Semantic search** with typo tolerance and fuzzy matching',
      '**Priority scoring** based on user engagement metrics'
    ],
    features: [
      '**40% faster feedback processing** with new AI pipeline',
      'New dashboard widgets for feedback analytics',
      'Export summaries to PDF and CSV formats',
      'Integration with popular project management tools',
      'Custom AI prompts for tailored analysis'
    ],
    bugFixes: [
      'Fixed incorrect vote counts on paginated lists',
      'Resolved search results not updating in real-time',
      'Fixed memory leak in long-running dashboard sessions'
    ]
  },
  {
    id: 'cl2',
    version: 'v2.0',
    date: 'November 28, 2024',
    title: 'Complete Redesign with Dark Mode',
    tags: ['Design', 'Accessibility', 'Performance'],
    highlights: [
      '**Ground-up redesign** with modern, clean interface',
      '**Dark mode support** that respects system preferences',
      '**Improved accessibility** with WCAG 2.1 AA compliance',
      '**Faster navigation** with optimized component rendering'
    ],
    features: [
      '**60% reduction in initial load time**',
      'New keyboard shortcuts for power users',
      'Customizable dashboard layouts',
      'Enhanced mobile experience with touch gestures',
      'New animation system for smooth transitions'
    ],
    bugFixes: [
      'Fixed contrast issues in certain color combinations',
      'Resolved screen reader announcement problems',
      'Fixed focus trap issues in modal dialogs'
    ]
  },
  {
    id: 'cl3',
    version: 'v1.8',
    date: 'November 10, 2024',
    title: 'Real-time Collaboration',
    tags: ['Collaboration', 'Real-time', 'Teams'],
    highlights: [
      '**Live presence indicators** showing active team members',
      '**Instant sync** across all connected devices',
      '**Collaborative editing** with conflict resolution',
      '**Activity feed** with real-time updates'
    ],
    features: [
      'See who is viewing the same feedback item',
      'Real-time cursor positions in collaborative mode',
      'Instant notifications for team mentions',
      'Shared workspaces with team-specific settings'
    ],
    bugFixes: [
      'Fixed sync delays in high-latency connections',
      'Resolved duplicate notification issues'
    ]
  },
  {
    id: 'cl4',
    version: 'v1.7',
    date: 'October 25, 2024',
    title: 'Enhanced Notification System',
    tags: ['Notifications', 'Customization'],
    highlights: [
      '**Granular notification controls** for each event type',
      '**Multi-channel delivery** via email, push, and in-app',
      '**Smart digest mode** to reduce notification fatigue',
      '**Do not disturb** scheduling'
    ],
    features: [
      'Choose notifications per feedback item',
      'Weekly summary emails with key metrics',
      'Slack and Discord integrations',
      'Mobile push notification support'
    ]
  },
  {
    id: 'cl5',
    version: 'v1.6',
    date: 'October 12, 2024',
    title: 'API v2 and Webhooks',
    tags: ['API', 'Developers', 'Integrations'],
    highlights: [
      '**REST API v2** with improved rate limits',
      '**Webhook support** for event-driven integrations',
      '**Comprehensive documentation** with interactive examples',
      '**SDKs** for JavaScript, Python, and Go'
    ],
    features: [
      '**3x higher rate limits** for Pro and Enterprise plans',
      'New endpoints for bulk operations',
      'OAuth 2.0 authentication support',
      'Webhook retry logic with exponential backoff'
    ],
    bugFixes: [
      'Fixed inconsistent pagination in list endpoints',
      'Resolved webhook signature verification issues'
    ]
  },
  {
    id: 'cl6',
    version: 'v1.5',
    date: 'September 30, 2024',
    title: 'Performance Improvements',
    tags: ['Performance', 'Optimization'],
    highlights: [
      '**60% faster page loads** across the application',
      '**Infinite scroll optimization** for large datasets',
      '**Reduced memory usage** by 40%',
      '**Improved caching** for offline support'
    ],
    bugFixes: [
      'Fixed image upload timeout for large files',
      'Resolved memory leak in feedback list component',
      'Fixed scroll position reset on navigation'
    ]
  },
  {
    id: 'cl7',
    version: 'v1.4',
    date: 'September 15, 2024',
    title: 'Custom Fields and Filters',
    tags: ['Customization', 'Filters', 'Data'],
    highlights: [
      '**Custom fields** to capture team-specific data',
      '**Saved filter views** for quick access',
      '**Advanced search operators** for power users',
      '**CSV export** with custom field support'
    ],
    features: [
      'Text, number, date, and dropdown field types',
      'Filter by any combination of fields',
      'Share saved views with team members',
      'Scheduled export reports via email'
    ]
  },
  {
    id: 'cl8',
    version: 'v1.3',
    date: 'August 28, 2024',
    title: 'Team Management',
    tags: ['Teams', 'Permissions', 'Admin'],
    highlights: [
      '**Role-based permissions** for team members',
      '**Activity logs** for audit trails',
      '**Team workspaces** with isolated data',
      '**SSO support** for enterprise customers'
    ],
    features: [
      'Admin, Editor, and Viewer roles',
      'Invite members via email or link',
      'Transfer ownership between members',
      'SAML and OIDC integration'
    ]
  },
  {
    id: 'cl9',
    version: 'v1.2',
    date: 'August 10, 2024',
    title: 'Roadmap Customization',
    tags: ['Roadmap', 'Branding', 'Embed'],
    highlights: [
      '**Custom branding** with your colors and logo',
      '**Embeddable widget** for your website',
      '**Custom status labels** for your workflow',
      '**Public and private** roadmap options'
    ],
    features: [
      'Choose which columns to display publicly',
      'Custom domain support for Pro plans',
      'Responsive embed that matches your site'
    ]
  },
  {
    id: 'cl10',
    version: 'v1.1',
    date: 'July 25, 2024',
    title: 'Bug Fixes and Stability',
    tags: ['Stability', 'Bug Fixes'],
    bugFixes: [
      'Fixed vote counting edge cases',
      'Resolved feedback modal closing unexpectedly',
      'Fixed email notification delivery delays',
      'Improved error handling throughout the app',
      'Fixed timezone issues in date displays'
    ]
  },
  {
    id: 'cl11',
    version: 'v1.0',
    date: 'July 10, 2024',
    title: 'Welcome to Mira',
    tags: ['Launch', 'Feature'],
    highlights: [
      '**Public feedback boards** for your users',
      '**Voting system** to prioritize features',
      '**Visual roadmap** to share your plans',
      '**User comments** for detailed discussions'
    ],
    features: [
      'Create unlimited feedback items',
      'Customizable feedback categories',
      'User authentication and profiles',
      'Email notifications for updates',
      'Mobile-responsive design'
    ]
  }
];