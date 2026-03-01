import React from 'react';

interface PlayerAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PlayerAvatar({ name, imageUrl, size = 'md' }: PlayerAvatarProps) {
  const initials = name
    .split(' ')
    .filter(n => n.length > 0)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-lg',
    lg: 'w-32 h-32 text-3xl',
    xl: 'w-48 h-48 text-5xl',
  };

  const bgColors = [
    'bg-flag-500',
    'bg-flag-red-500',
    'bg-flag-600',
    'bg-flag-red-600',
    'bg-flag-gold-400',
  ];

  // Simple hash for consistent color per name
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % bgColors.length;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-4 border-white shadow-md`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${bgColors[colorIndex]} rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-md`}>
      {initials}
    </div>
  );
}
