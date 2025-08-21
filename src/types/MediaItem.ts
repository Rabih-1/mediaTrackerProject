export type MediaType = 'movie' | 'tv' | 'game' | 'music' | 'book';
export type MediaStatus = 'owned' | 'wishlist' | 'using' | 'completed';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  creator: string;
  genre: string;
  releaseDate: string;
  status: MediaStatus;
}
