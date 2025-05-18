
import { Skeleton } from "@/components/ui/skeleton";

export function UploadSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-32 w-full mb-6 rounded-lg" />
        <div className="space-y-4">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-16 w-24 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-full max-w-md" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-full" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}
