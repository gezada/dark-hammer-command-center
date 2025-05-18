
import { Channel } from './store';

// Mock data for YouTube channels
export const mockChannels: Channel[] = [
  {
    id: 'UC123456789',
    title: 'Tech With Dark Hammer',
    thumbnail: 'https://via.placeholder.com/60',
    isConnected: true
  },
  {
    id: 'UC987654321',
    title: 'Gaming Adventures',
    thumbnail: 'https://via.placeholder.com/60',
    isConnected: false
  },
  {
    id: 'UC246813579',
    title: 'Coding Tips',
    thumbnail: 'https://via.placeholder.com/60',
    isConnected: false
  }
];

// Mock data for analytics
export const mockAnalytics = {
  viewsToday: 12453,
  subscribers: 104782,
  watchTimeHours: 8423,
  revenueEstimate: 1241.56,
  avgCTR: 4.2,
  quota: {
    used: 2,
    total: 100,
  },
  charts: {
    views: [
      { date: '2025-01-01', value: 10000 },
      { date: '2025-01-02', value: 11000 },
      { date: '2025-01-03', value: 10500 },
      { date: '2025-01-04', value: 12000 },
      { date: '2025-01-05', value: 11500 },
      { date: '2025-01-06', value: 13000 },
      { date: '2025-01-07', value: 12500 },
    ],
    watchTime: [
      { date: '2025-01-01', value: 1500 },
      { date: '2025-01-02', value: 1600 },
      { date: '2025-01-03', value: 1550 },
      { date: '2025-01-04', value: 1700 },
      { date: '2025-01-05', value: 1650 },
      { date: '2025-01-06', value: 1800 },
      { date: '2025-01-07', value: 1750 },
    ],
    ctr: [
      { date: '2025-01-01', value: 4.0 },
      { date: '2025-01-02', value: 4.1 },
      { date: '2025-01-03', value: 4.0 },
      { date: '2025-01-04', value: 4.2 },
      { date: '2025-01-05', value: 4.1 },
      { date: '2025-01-06', value: 4.3 },
      { date: '2025-01-07', value: 4.2 },
    ],
    revenue: [
      { date: '2025-01-01', value: 150 },
      { date: '2025-01-02', value: 165 },
      { date: '2025-01-03', value: 155 },
      { date: '2025-01-04', value: 180 },
      { date: '2025-01-05', value: 170 },
      { date: '2025-01-06', value: 190 },
      { date: '2025-01-07', value: 185 },
    ],
  }
};

// Mock data for uploads
export interface VideoUpload {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnail: string;
  status: 'queued' | 'uploading' | 'scheduled' | 'published' | 'error';
  progress: number;
  publishAt: string | null;
  privacy: 'public' | 'unlisted' | 'private';
}

export const mockUploads: VideoUpload[] = [
  {
    id: 'vid123',
    title: 'How to Use Dark Hammer',
    channelId: 'UC123456789',
    channelTitle: 'Tech With Dark Hammer',
    thumbnail: 'https://via.placeholder.com/120x68',
    status: 'published',
    progress: 100,
    publishAt: null,
    privacy: 'public'
  },
  {
    id: 'vid124',
    title: '10 YouTube Growth Hacks',
    channelId: 'UC123456789',
    channelTitle: 'Tech With Dark Hammer',
    thumbnail: 'https://via.placeholder.com/120x68',
    status: 'scheduled',
    progress: 100,
    publishAt: '2025-05-20T15:00:00Z',
    privacy: 'public'
  },
  {
    id: 'vid125',
    title: 'Gaming Review 2025',
    channelId: 'UC987654321',
    channelTitle: 'Gaming Adventures',
    thumbnail: 'https://via.placeholder.com/120x68',
    status: 'uploading',
    progress: 65,
    publishAt: null,
    privacy: 'unlisted'
  }
];

// Mock data for comments
export interface Comment {
  id: string;
  videoId: string;
  videoTitle: string;
  text: string;
  author: {
    name: string;
    profileUrl: string;
  };
  timestamp: string;
  hasReply: boolean;
  liked: boolean;
}

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    videoId: 'vid123',
    videoTitle: 'How to Use Dark Hammer',
    text: 'Great video! Can you make a tutorial on how to optimize my channel?',
    author: {
      name: 'Tech Enthusiast',
      profileUrl: 'https://via.placeholder.com/32'
    },
    timestamp: '2025-05-17T08:12:34Z',
    hasReply: false,
    liked: false
  },
  {
    id: 'comment2',
    videoId: 'vid124',
    videoTitle: '10 YouTube Growth Hacks',
    text: 'Looking forward to the next video. When will it be published?',
    author: {
      name: 'Content Creator',
      profileUrl: 'https://via.placeholder.com/32'
    },
    timestamp: '2025-05-16T19:42:11Z',
    hasReply: true,
    liked: true
  },
  {
    id: 'comment3',
    videoId: 'vid123',
    videoTitle: 'How to Use Dark Hammer',
    text: 'Is there a way to automate uploads? This tool looks amazing!',
    author: {
      name: 'YouTuber Pro',
      profileUrl: 'https://via.placeholder.com/32'
    },
    timestamp: '2025-05-15T14:22:45Z',
    hasReply: false,
    liked: false
  },
  {
    id: 'comment4',
    videoId: 'vid125',
    videoTitle: 'Gaming Review 2025',
    text: 'What games will you be reviewing next month?',
    author: {
      name: 'Gamer1995',
      profileUrl: 'https://via.placeholder.com/32'
    },
    timestamp: '2025-05-14T12:08:19Z',
    hasReply: false,
    liked: false
  }
];

// Mock API functions
export const fetchUserChannels = async (): Promise<Channel[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockChannels);
    }, 500);
  });
};

export const fetchAnalytics = async (
  channelId: string | null, 
  dateRange: string
): Promise<typeof mockAnalytics> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockAnalytics);
    }, 500);
  });
};

export const fetchUploads = async (
  channelId: string | null
): Promise<VideoUpload[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUploads);
    }, 500);
  });
};

export const fetchComments = async (
  filters: {
    channelId?: string;
    filterType?: 'all' | 'unreplied' | 'questions' | 'recent';
  }
): Promise<Comment[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredComments = [...mockComments];
      
      if (filters.filterType === 'unreplied') {
        filteredComments = filteredComments.filter(c => !c.hasReply);
      } else if (filters.filterType === 'questions') {
        filteredComments = filteredComments.filter(c => c.text.includes('?'));
      } else if (filters.filterType === 'recent') {
        // Filter comments from last 24 hours (in this mock, we'll just return all)
      }
      
      resolve(filteredComments);
    }, 500);
  });
};
