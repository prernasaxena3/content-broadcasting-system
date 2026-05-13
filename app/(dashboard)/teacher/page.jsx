"use client";
import { useSelector } from "react-redux";
import { useContent } from "@/hooks/useContent";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  StatsSkeletonLoader,
  CardSkeletonLoader,
} from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ContentCard from "@/components/content/ContentCard";
import { LayoutDashboard, Clock, CheckCircle, XCircle } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error, total, pending, approved, rejected, refetch } =
    useContent(user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold color: '#ffffff'">Dashboard</h1>

      {loading ? (
        <StatsSkeletonLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Uploaded"
            value={total}
            icon={LayoutDashboard}
            color="text-gray-700"
          />
          <StatsCard
            title="Pending"
            value={pending}
            icon={Clock}
            color="text-yellow-600"
          />
          <StatsCard
            title="Approved"
            value={approved}
            icon={CheckCircle}
            color="text-green-600"
          />
          <StatsCard
            title="Rejected"
            value={rejected}
            icon={XCircle}
            color="text-red-600"
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold color: '#ffffff' mb-4">
          Recent Content
        </h2>
        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <CardSkeletonLoader cards={3} />
        ) : items.length === 0 ? (
          <EmptyState message="You haven't uploaded any content yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.slice(0, 6).map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
