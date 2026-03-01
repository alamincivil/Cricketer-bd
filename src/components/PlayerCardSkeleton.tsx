import React from 'react';

export default function PlayerCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar Skeleton */}
        <div className="w-16 h-16 rounded-full bg-gray-200" />
        
        {/* Name Skeleton */}
        <div className="mt-4 h-6 w-32 bg-gray-200 rounded" />
        
        {/* Role Skeleton */}
        <div className="mt-2 h-4 w-24 bg-gray-100 rounded" />

        {/* Badges Skeleton */}
        <div className="flex justify-center gap-2 mt-4 mb-4">
          <div className="h-4 w-10 bg-gray-100 rounded" />
          <div className="h-4 w-10 bg-gray-100 rounded" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex justify-center gap-1 mb-4">
          <div className="h-3 w-12 bg-gray-50 rounded" />
          <div className="h-3 w-12 bg-gray-50 rounded" />
        </div>

        {/* Footer Skeleton */}
        <div className="w-full pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="h-3 w-20 bg-gray-50 rounded" />
          <div className="h-4 w-4 bg-gray-50 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
}
