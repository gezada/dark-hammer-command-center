
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill(null).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 shadow-sm border border-border">
            <div className="flex justify-between items-start">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-7 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Section Skeleton */}
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
