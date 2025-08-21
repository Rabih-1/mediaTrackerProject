import React from 'react';

interface MediaCardProps {
  id: string;
  title: string;
  creator: string;
  description?: string;
  status?: string;
  imageUrl?: string;
  onDelete: (id: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  creator,
  description = 'No description available.',
  status = 'Unknown',
  imageUrl = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  onDelete,
}) => {
  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <div className="block shrink-0">
          <img
            alt="media"
            src={imageUrl}
            className="size-14 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium sm:text-lg">
            <span className="hover:underline">{title}</span>
          </h3>

          <p className="line-clamp-2 text-sm text-gray-700">
            {description}
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
              Posted by <span className="font-medium underline hover:text-gray-700">{creator}</span>
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id)}
          className="shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
          title="Delete media item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-end">
        <strong
          className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-600 px-3 py-1.5 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4"
            />
          </svg>

          <span className="text-[10px] font-medium sm:text-xs">{status}</span>
        </strong>
      </div>
    </article>
  );
};

export default MediaCard;
