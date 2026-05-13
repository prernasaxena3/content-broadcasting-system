"use client";
import { useDispatch } from "react-redux";
import { useApprovals } from "@/hooks/useApprovals";
import { setFilterStatus, setSearchQuery } from "@/store/slices/approvalSlice";
import ApprovalCard from "@/components/principal/ApprovalCard";
import { CardSkeletonLoader } from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function AllContentPage() {
  const dispatch = useDispatch();
  const {
    allContent,
    loading,
    error,
    filterStatus,
    searchQuery,
    approve,
    reject,
    refetch,
  } = useApprovals();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold color: '#ffffff'">All Content</h1>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by title, subject, teacher..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        <Select
          value={filterStatus}
          onValueChange={(val) => dispatch(setFilterStatus(val))}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-gray-500">{allContent.length} results</p>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <CardSkeletonLoader cards={6} />
      ) : allContent.length === 0 ? (
        <EmptyState message="No content matches your filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allContent.map((item) => (
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
