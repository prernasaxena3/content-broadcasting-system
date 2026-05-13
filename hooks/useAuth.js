"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout as logoutAction } from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
    document.cookie = "token=; path=/; max-age=0";
    router.replace("/login");
  };

  return { user, token, isAuthenticated, logout };
};
