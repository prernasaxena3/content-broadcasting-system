"use client";
import { useSelector } from "react-redux";
import UploadForm from "@/components/content/UploadForm";

export default function UploadContentPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold color: '#ffffff'">Upload Content</h1>
      <UploadForm teacherId={user?.id} teacherName={user?.name} />
    </div>
  );
}
