
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array(5).fill(null).map((_, i) => (
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Uploads Table Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-14 w-24 rounded-md flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Calendar Skeleton */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border mt-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array(35).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Overview Skeleton */}
        <div>
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <Skeleton className="h-6 w-40 mb-6" />
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="h-[60px] w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
