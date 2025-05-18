
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-9 w-32 mb-4" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border col-span-1 lg:col-span-2 xl:col-span-2">
          <Skeleton className="h-5 w-40 mb-6" />
          <Skeleton className="h-[240px] w-full" />
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
          <Skeleton className="h-5 w-40 mb-6" />
          <Skeleton className="h-[240px] w-full" />
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
          <Skeleton className="h-5 w-40 mb-6" />
          <Skeleton className="h-[240px] w-full" />
        </div>
      </div>
    </div>
  );
}
