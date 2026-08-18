export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row border border-gray-200 shadow-sm min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
      {/* Image Skeleton */}
      <div className="relative w-full sm:w-[150px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] bg-white flex items-center justify-center p-3 flex-shrink-0 border-r border-gray-200">
        <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
      </div>
      
      {/* Content Skeleton */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          {/* Category Skeleton */}
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" />
          
          {/* Name Skeleton */}
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
          
          {/* Duration Skeleton */}
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" />
        </div>
        
        {/* Bottom Section */}
        <div className="flex items-end justify-between gap-2">
          {/* Price Skeleton */}
          <div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          
          {/* Buttons Skeleton */}
          <div className="flex gap-2">
            <div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
