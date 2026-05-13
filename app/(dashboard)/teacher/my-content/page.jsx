"use client";
import { useSelector } from "react-redux";
import { useContent } from "@/hooks/useContent";
import { CardSkeletonLoader } from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ContentCard from "@/components/content/ContentCard";

export default function MyContentPage() {
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error, refetch } = useContent(user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold color: '#ffffff'">My Content</h1>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <CardSkeletonLoader cards={6} />
      ) : items.length === 0 ? (
        <EmptyState message="No content uploaded yet. Start by uploading your first content." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
