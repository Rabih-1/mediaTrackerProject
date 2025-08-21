import React, { useState, useEffect } from 'react';
import type { MediaItem } from '../types/MediaItem';

interface MediaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaAdded: () => void;
}

const MediaForm: React.FC<MediaFormProps> = ({ isOpen, onClose, onMediaAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    creator: '',
    type: '',
    genre: '',
    releaseDate: '',
    status: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Reset form when modal is opened
    if (isOpen) {
      setFormData({
        title: '',
        creator: '',
        type: '',
        genre: '',
        releaseDate: '',
        status: '',
      });
      setShowSuccess(false);
      setShowError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check required fields
    if (!formData.title || !formData.type || !formData.status) {
      setShowError(true);
      return;
    }

    const newItem: MediaItem = {
      id: crypto.randomUUID(),
      title: formData.title,
      creator: formData.creator,
      type: formData.type as MediaItem['type'],
      genre: formData.genre,
      releaseDate: formData.releaseDate,
      status: formData.status as MediaItem['status'],
    };

    const storedItems = localStorage.getItem('mediaItems');
    const mediaItems: MediaItem[] = storedItems ? JSON.parse(storedItems) : [];

    mediaItems.push(newItem);
    localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
    console.log('Saved to localStorage:', newItem);

    // Call the callback to refresh the media list
    onMediaAdded();

    onClose(); // Close modal first

    // Delay success message after modal is closed
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 200);
  };

  return (
    <>
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 border border-green-400 text-blue-100 px-4 py-2 rounded shadow z-50">
          ✅ Media item added successfully!
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-50">
          ⚠️ Please fill all required fields (Title, Type, Status).
        </div>
      )}

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Media</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Creator</label>
                  <input
                    type="text"
                    value={formData.creator}
                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">-- Select Type --</option>
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                    <option value="book">Book</option>
                    <option value="game">Game</option>
                    <option value="music">Music</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">-- Select Status --</option>
                    <option value="wishlist">Wishlist</option>
                    <option value="owned">Owned</option>
                    <option value="using">Currently Using</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                  <input
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Add Media
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaForm;
