import { cn } from "@/utils/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size],
        )}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-card p-4 animate-pulse">
      <div className="aspect-square rounded-lg bg-muted mb-3" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-1/2" />
    </div>
  );
}
