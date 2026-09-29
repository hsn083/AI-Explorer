export default function ReviewCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
          <div>
            {/* Name Skeleton */}
            <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-white/10 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Date Skeleton */}
        <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Review Text Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
      </div>

      {/* Helpful Skeleton */}
      <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
    </div>
  );
}
