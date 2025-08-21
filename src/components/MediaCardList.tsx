// components/MediaCardList.tsx
import React, { useEffect, useState } from 'react';
import MediaCard from './media-card';

interface MediaItem {
  id: string;
  title: string;
  creator: string;
  description?: string;
  status?: string;
  imageUrl?: string;
}

const MediaCardList: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('mediaItems');
    if (storedItems) {
      try {
        const parsed = JSON.parse(storedItems);
        setMediaItems(parsed);
      } catch (err) {
        console.error("Invalid JSON in localStorage", err);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedItems = mediaItems.filter(item => item.id !== id);
    setMediaItems(updatedItems);
    localStorage.setItem('mediaItems', JSON.stringify(updatedItems));
  };

  if (mediaItems.length === 0) {
    return <p className="text-gray-500 px-4">No media found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
      {mediaItems.map((item) => (
        <MediaCard
          key={item.id}
          id={item.id}
          title={item.title}
          creator={item.creator}
          description={item.description}
          status={item.status}
          imageUrl={item.imageUrl}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MediaCardList;
