import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FlightCardSkeletonOptimized = React.memo(() => {
  return (
    <div className="card-jetleg h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-auto">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-full sm:w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
});

FlightCardSkeletonOptimized.displayName = 'FlightCardSkeletonOptimized';

export default FlightCardSkeletonOptimized;