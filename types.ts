
export interface Review {
  id: number;
  user: string;
  rating: number; // 혼밥 친화도 점수
  comment: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  category: string;
  hours: string;
  seating: string;
  soloFriendliness: number; // 초기 혼밥 친화도
  avgRating: number;
  reviews: Review[];
}

export enum SortOption {
  Friendliness = 'friendliness',
  Name = 'name',
}
