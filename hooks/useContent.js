"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContent, setLoading, setError } from "@/store/slices/contentSlice";
import { getMyContent } from "@/services/content.service";

export const useContent = (teacherId) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.content);

  const fetchContent = useCallback(async () => {
    if (!teacherId) return;
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await getMyContent(teacherId);
      dispatch(setContent(data));
    } catch (err) {
      dispatch(setError(err.message || "Failed to fetch content"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [teacherId, dispatch]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const total = items.length;
  const pending = items.filter((c) => c.status === "pending").length;
  const approved = items.filter((c) => c.status === "approved").length;
  const rejected = items.filter((c) => c.status === "rejected").length;

  return {
    items,
    loading,
    error,
    total,
    pending,
    approved,
    rejected,
    refetch: fetchContent,
  };
};
