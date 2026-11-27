import React, { useState, useEffect } from 'react';
import { Phone, User } from 'lucide-react';
import ImageModal from './ImageModal';
import { getImageUrl } from '../utils/getFileUrl';
import { getInitials } from '../utils/getInitials';

const OfficerProfile = ({ role, name, phone, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsModalOpen(false);
  }, [image]);

  const displayName = name || 'In Office';
  const initials = getInitials(name);
  const canPreview = Boolean(image) && !hasError;

  return (
    <>
      <div className="flex items-center gap-3.5 min-w-0 py-1">
        <div
          className={`w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm ${canPreview ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''
            }`}
          onClick={() => canPreview && setIsModalOpen(true)}
          title={canPreview ? `View ${displayName}'s photo` : undefined}
        >
          {canPreview ? (
            <img
              src={getImageUrl(image)}
              alt={displayName}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-serif font-bold text-base text-[#20387b] dark:text-blue-300 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-900 select-none">
              {initials}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between min-w-0">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5 mb-0.5">
            <User className="w-3 h-3 shrink-0 text-amber-500" />
            {role}
          </span>
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate" title={displayName}>
            {displayName}
          </p>
          <div className="mt-0.5">
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-[#20387b] dark:hover:text-blue-400 transition-colors"
                title={`Call ${role} (${phone})`}
              >
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{phone}</span>
              </a>
            ) : (
              <span className="text-xs text-slate-400 dark:text-zinc-600">—</span>
            )}
          </div>
        </div>
      </div>

      <ImageModal
        imageUrl={isModalOpen && canPreview ? image : null}
        title={`${displayName} (${role})`}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OfficerProfile;
