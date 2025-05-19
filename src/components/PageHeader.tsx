
import { FilterMenu } from "./FilterMenu";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
        <FilterMenu />
      </div>
    </div>
  );
}
