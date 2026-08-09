import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button 
        className="fixed top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-2 backdrop-blur-md transition-all z-50"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="relative max-w-4xl w-full max-h-[90vh] flex justify-center items-center">
        <img 
          src={imageUrl} 
          alt="Enlarged profile" 
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageModal;
