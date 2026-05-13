"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllContent,
  setLoading,
  setError,
  updateContentStatus,
} from "@/store/slices/approvalSlice";
import {
  getAllContent,
  approveContent,
  rejectContent,
} from "@/services/approval.service";

export const useApprovals = () => {
  const dispatch = useDispatch();
  const { allContent, loading, error, filterStatus, searchQuery } = useSelector(
    (state) => state.approvals
  );

  const fetchAll = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await getAllContent();
      dispatch(setAllContent(data));
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch content"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const approve = async (contentId) => {
    try {
      await approveContent(contentId);
      dispatch(updateContentStatus({ id: contentId, status: "approved" }));
      return true;
    } catch {
      return false;
    }
  };

  const reject = async (contentId, reason) => {
    try {
      await rejectContent(contentId, reason);
      dispatch(
        updateContentStatus({
          id: contentId,
          status: "rejected",
          rejectionReason: reason,
        })
      );
      return true;
    } catch {
      return false;
    }
  };

  const filtered = allContent.filter((c) => {
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.teacherName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const total = allContent.length;
  const pending = allContent.filter((c) => c.status === "pending").length;
  const approved = allContent.filter((c) => c.status === "approved").length;
  const rejected = allContent.filter((c) => c.status === "rejected").length;

  return {
    allContent: filtered,
    loading,
    error,
    total,
    pending,
    approved,
    rejected,
    filterStatus,
    searchQuery,
    approve,
    reject,
    refetch: fetchAll,
  };
};
