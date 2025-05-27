
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="bg-[#1A1A1A] rounded-lg p-3 border border-[#2A2A2A]">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-[#2A2A2A]" />
              <Skeleton className="h-4 w-4 rounded-full bg-[#2A2A2A]" />
            </div>
            <div>
              <Skeleton className="h-3 w-16 mb-1 bg-[#2A2A2A]" />
              <Skeleton className="h-6 w-20 mb-1 bg-[#2A2A2A]" />
              <Skeleton className="h-3 w-14 bg-[#2A2A2A]" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter Row Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {Array(6).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-md bg-[#2A2A2A]" />
          ))}
        </div>
        <Skeleton className="h-9 w-48 rounded-md bg-[#2A2A2A]" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Uploads Table Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
            <Skeleton className="h-6 w-40 mb-6 bg-[#2A2A2A]" />
            <div className="space-y-4">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-14 w-24 rounded-md flex-shrink-0 bg-[#2A2A2A]" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full bg-[#2A2A2A]" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-24 bg-[#2A2A2A]" />
                      <Skeleton className="h-3 w-16 bg-[#2A2A2A]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Calendar Skeleton */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] mt-6">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-6 w-40 bg-[#2A2A2A]" />
              <Skeleton className="h-8 w-24 bg-[#2A2A2A]" />
            </div>
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-9 w-32 rounded-md bg-[#2A2A2A]" />
              <Skeleton className="h-9 w-24 rounded-md bg-[#2A2A2A]" />
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array(35).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-[#2A2A2A]" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Overview Skeleton */}
        <div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
            <Skeleton className="h-6 w-40 mb-6 bg-[#2A2A2A]" />
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="mb-4 last:mb-0 bg-[#2A2A2A]/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className="h-4 w-20 bg-[#2A2A2A]" />
                  <Skeleton className="h-5 w-10 bg-[#2A2A2A]" />
                </div>
                <Skeleton className="h-16 w-full bg-[#2A2A2A]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
