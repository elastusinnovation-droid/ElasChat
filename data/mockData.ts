export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

export interface Video {
  id: string;
  userId: string;
  user: User;
  videoUrl: string;
  coverUrl: string;
  caption: string;
  hashtags: string[];
  soundTitle: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  user: User;
  text: string;
  likesCount: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  fromUserId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participantId: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  userId: string;
  user: User;
  videoId?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const AVATAR_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];

function getAvatarColor(id: string): string {
  const index = parseInt(id.replace(/\D/g, "") || "0") % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "elastus",
    displayName: "Elastus Creator",
    bio: "Welcome to ElasChat! Creating amazing content daily.",
    avatarUrl: null,
    followersCount: 125000,
    followingCount: 342,
    postsCount: 89,
  },
  {
    id: "2",
    username: "creativemind",
    displayName: "Creative Mind",
    bio: "Artist and content creator. Follow for daily inspiration!",
    avatarUrl: null,
    followersCount: 45200,
    followingCount: 198,
    postsCount: 156,
  },
  {
    id: "3",
    username: "funnyvibes",
    displayName: "Funny Vibes",
    bio: "Making you laugh one video at a time!",
    avatarUrl: null,
    followersCount: 89000,
    followingCount: 567,
    postsCount: 234,
  },
  {
    id: "4",
    username: "musiclover",
    displayName: "Music Lover",
    bio: "Sharing the best beats and melodies.",
    avatarUrl: null,
    followersCount: 67800,
    followingCount: 890,
    postsCount: 178,
  },
  {
    id: "5",
    username: "traveler_dan",
    displayName: "Dan the Traveler",
    bio: "Exploring the world one video at a time.",
    avatarUrl: null,
    followersCount: 234500,
    followingCount: 1200,
    postsCount: 567,
  },
];

export const mockVideos: Video[] = [
  {
    id: "v1",
    userId: "1",
    user: mockUsers[0],
    videoUrl: "",
    coverUrl: "",
    caption: "Welcome to ElasChat! This is the future of short videos #elaschat #newapp #viral",
    hashtags: ["elaschat", "newapp", "viral"],
    soundTitle: "Original sound - ElasChat",
    likesCount: 45200,
    commentsCount: 1234,
    sharesCount: 567,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "v2",
    userId: "2",
    user: mockUsers[1],
    videoUrl: "",
    coverUrl: "",
    caption: "Check out this amazing sunset! Nature at its finest #sunset #nature #beautiful",
    hashtags: ["sunset", "nature", "beautiful"],
    soundTitle: "Chill Vibes - Sunset Mix",
    likesCount: 23400,
    commentsCount: 890,
    sharesCount: 234,
    createdAt: "2024-01-14T18:45:00Z",
  },
  {
    id: "v3",
    userId: "3",
    user: mockUsers[2],
    videoUrl: "",
    coverUrl: "",
    caption: "When your friend says they will be ready in 5 minutes #funny #relatable #comedy",
    hashtags: ["funny", "relatable", "comedy"],
    soundTitle: "Funny Sound Effect",
    likesCount: 89000,
    commentsCount: 3456,
    sharesCount: 1234,
    createdAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "v4",
    userId: "4",
    user: mockUsers[3],
    videoUrl: "",
    coverUrl: "",
    caption: "This beat is fire! What do you think? #music #beats #producer",
    hashtags: ["music", "beats", "producer"],
    soundTitle: "Original beat - MusicLover",
    likesCount: 34500,
    commentsCount: 1567,
    sharesCount: 890,
    createdAt: "2024-01-13T20:15:00Z",
  },
  {
    id: "v5",
    userId: "5",
    user: mockUsers[4],
    videoUrl: "",
    coverUrl: "",
    caption: "The most beautiful place I have ever visited! #travel #adventure #explore",
    hashtags: ["travel", "adventure", "explore"],
    soundTitle: "Adventure Awaits - Travel Mix",
    likesCount: 156000,
    commentsCount: 4567,
    sharesCount: 2345,
    createdAt: "2024-01-12T09:30:00Z",
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    videoId: "v1",
    userId: "2",
    user: mockUsers[1],
    text: "This app is amazing! Love it!",
    likesCount: 234,
    createdAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "c2",
    videoId: "v1",
    userId: "3",
    user: mockUsers[2],
    text: "Can't wait to see more content!",
    likesCount: 156,
    createdAt: "2024-01-15T11:30:00Z",
  },
  {
    id: "c3",
    videoId: "v1",
    userId: "4",
    user: mockUsers[3],
    text: "The UI is so clean!",
    likesCount: 89,
    createdAt: "2024-01-15T12:00:00Z",
  },
];

export const mockChats: Chat[] = [
  {
    id: "chat1",
    participantId: "2",
    participant: mockUsers[1],
    lastMessage: "Hey! Did you see my latest video?",
    lastMessageTime: "2024-01-15T14:30:00Z",
    unreadCount: 2,
  },
  {
    id: "chat2",
    participantId: "3",
    participant: mockUsers[2],
    lastMessage: "That was hilarious! I can't stop laughing",
    lastMessageTime: "2024-01-15T12:15:00Z",
    unreadCount: 0,
  },
  {
    id: "chat3",
    participantId: "4",
    participant: mockUsers[3],
    lastMessage: "Thanks for the follow!",
    lastMessageTime: "2024-01-14T20:45:00Z",
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    chatId: "chat1",
    fromUserId: "2",
    text: "Hey! How are you?",
    createdAt: "2024-01-15T14:00:00Z",
    isRead: true,
  },
  {
    id: "m2",
    chatId: "chat1",
    fromUserId: "current",
    text: "I am doing great! Just posted a new video.",
    createdAt: "2024-01-15T14:15:00Z",
    isRead: true,
  },
  {
    id: "m3",
    chatId: "chat1",
    fromUserId: "2",
    text: "Hey! Did you see my latest video?",
    createdAt: "2024-01-15T14:30:00Z",
    isRead: false,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "like",
    userId: "2",
    user: mockUsers[1],
    videoId: "v1",
    message: "liked your video",
    createdAt: "2024-01-15T15:00:00Z",
    isRead: false,
  },
  {
    id: "n2",
    type: "follow",
    userId: "3",
    user: mockUsers[2],
    message: "started following you",
    createdAt: "2024-01-15T14:30:00Z",
    isRead: false,
  },
  {
    id: "n3",
    type: "comment",
    userId: "4",
    user: mockUsers[3],
    videoId: "v1",
    message: "commented on your video",
    createdAt: "2024-01-15T13:45:00Z",
    isRead: true,
  },
  {
    id: "n4",
    type: "mention",
    userId: "5",
    user: mockUsers[4],
    videoId: "v2",
    message: "mentioned you in a comment",
    createdAt: "2024-01-15T12:00:00Z",
    isRead: true,
  },
];

export const trendingHashtags = [
  { tag: "fyp", count: "2.3M" },
  { tag: "viral", count: "1.8M" },
  { tag: "elaschat", count: "890K" },
  { tag: "funny", count: "567K" },
  { tag: "music", count: "456K" },
  { tag: "dance", count: "345K" },
  { tag: "cooking", count: "234K" },
  { tag: "travel", count: "189K" },
];

export function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export { getAvatarColor };
