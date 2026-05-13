"use client";
import { useApprovals } from "@/hooks/useApprovals";
import StatsCard from "@/components/dashboard/StatsCard";
import ApprovalCard from "@/components/principal/ApprovalCard";
import {
  StatsSkeletonLoader,
  CardSkeletonLoader,
} from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import { LayoutDashboard, Clock, CheckCircle, XCircle } from "lucide-react";

export default function PrincipalDashboard() {
  const {
    allContent,
    loading,
    error,
    total,
    pending,
    approved,
    rejected,
    approve,
    reject,
    refetch,
  } = useApprovals();

  const pendingItems = allContent
    .filter((c) => c.status === "pending")
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Principal Dashboard</h1>

      {loading ? (
        <StatsSkeletonLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Content"
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
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#ffffff', textShadow: 'none' }}>
          Pending Approvals
        </h2>
        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <CardSkeletonLoader cards={3} />
        ) : pendingItems.length === 0 ? (
          <EmptyState message="No pending content to review." />
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
    </div>
  );
}
