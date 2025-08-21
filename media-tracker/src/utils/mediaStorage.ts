import type { MediaItem } from '../types/MediaItem';

export const saveMediaItem = (item: MediaItem) => {
  const existing = localStorage.getItem('mediaItems');
  const mediaItems: MediaItem[] = existing ? JSON.parse(existing) : [];
  mediaItems.push(item);
  localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
};
