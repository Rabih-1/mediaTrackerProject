import React, { useState } from "react";
import MediaForm from "./media-form";

interface HeaderProps {
  onMediaAdded: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMediaAdded }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-[15%] right-[15%] z-50 flex justify-between items-center px-8 py-6 shadow-md">
        {/* Left side: App name and description */}
        <div className="text-left">
          <h1 className="text-3xl font-bold text-black mb-2">Media Tracker</h1>
          <p className="text-sm text-black">
            Track your movies, shows, books & more!
          </p>
        </div>

        {/* Right side: Card-style Add Media */}
        <div
          className="relative w-40 h-40 bg-blue-600 rounded-lg shadow-lg overflow-hidden cursor-pointer"
          onClick={() => setIsFormOpen(true)}
        >
          {/* Background Image Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-75"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581090700227-1e8e9fecc1c4?auto=format&fit=crop&w=400&q=80')`,
            }}
          ></div>

          {/* Icon and Text Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 5v14m-7-7h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold">Add Media</p>
          </div>
        </div>
      </header>
      {/* Media Form Modal */}
      <MediaForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onMediaAdded={onMediaAdded} />
    </>
  );
};

export default Header;
