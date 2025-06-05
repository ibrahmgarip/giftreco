export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: string;
  points: number;
  badges: Badge[];
  submittedGifts: number;
  helpfulVotes: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: string;
  affiliateLink: string;
  submittedBy: User;
  submittedDate: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  tags: string[];
  category: GiftCategory;
  occasion: Occasion[];
  recipient: RecipientType[];
  interests: Interest[];
  verified: boolean;
  featured: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  date: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
}

export interface GiftCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Occasion {
  id: string;
  name: string;
  icon: string;
}

export interface RecipientType {
  id: string;
  name: string;
  icon: string;
}

export interface Interest {
  id: string;
  name: string;
  icon: string;
}

export interface FilterOptions {
  category?: string[];
  occasion?: string[];
  recipient?: string[];
  interests?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy: "newest" | "popular" | "trending" | "price-low" | "price-high";
}

export interface VoteAction {
  giftId: string;
  type: "upvote" | "downvote";
  userId: string;
}

export interface SubmitGiftData {
  title: string;
  description: string;
  image: string;
  price?: string;
  affiliateLink: string;
  tags: string[];
  category: string;
  occasion: string[];
  recipient: string[];
  interests: string[];
}
