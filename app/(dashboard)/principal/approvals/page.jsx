"use client";
import { useApprovals } from "@/hooks/useApprovals";
import ApprovalCard from "@/components/principal/ApprovalCard";
import { CardSkeletonLoader } from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";

export default function ApprovalsPage() {
  const { allContent, loading, error, approve, reject, refetch } =
    useApprovals();

  const pendingItems = allContent.filter((c) => c.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Pending Approvals</h1>
        <span className="text-sm" style={{ color: '#93B1A6' }}>
          {pendingItems.length} items pending
        </span>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <CardSkeletonLoader cards={6} />
      ) : pendingItems.length === 0 ? (
        <EmptyState message="All caught up! No pending content to review." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingItems.map((item) => (
            <ApprovalCard
              key={item.id}
              item={item}
              onApprove={approve}
              onReject={reject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
