"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { uploadContentSchema } from "@/utils/validators";
import { uploadContent } from "@/services/content.service";
import { addContent } from "@/store/slices/contentSlice";
import {
  SUBJECTS,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";

export default function UploadForm({ teacherId, teacherName }) {
  const dispatch = useDispatch();
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [subject, setSubject] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(uploadContentSchema) });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(null);
    setFilePreview(null);
    setSelectedFile(null);
    if (!file) return;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("Only JPG, PNG, and GIF files are allowed");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File size must be under ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFilePreview(null);
    setSelectedFile(null);
    setFileError(null);
  };

  const onSubmit = async (data) => {
    if (!selectedFile && !filePreview) {
      setFileError("Please upload a file");
      return;
    }
    try {
      const payload = {
        ...data,
        teacherId,
        teacherName,
        fileUrl: filePreview,
        fileType: selectedFile?.type,
      };
      const newItem = await uploadContent(payload);
      dispatch(addContent(newItem));
      toast.success("Content uploaded successfully! Awaiting approval.");
      reset();
      setFilePreview(null);
      setSelectedFile(null);
      setSubject("");
    } catch (err) {
      toast.error(err.message || "Upload failed. Please try again.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload New Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label>Title *</Label>
            <Input placeholder="Enter content title" {...register("title")} />
            {errors.title && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Subject *</Label>
            <Select
              value={subject}
              onValueChange={(val) => {
                setSubject(val);
                setValue("subject", val);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              placeholder="Optional description…"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="space-y-1.5">
            <Label>File * (JPG, PNG, GIF - max {MAX_FILE_SIZE_MB}MB)</Label>
            {!filePreview ? (
              <label
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-all"
                style={{
                  borderColor: "rgba(147,177,166,0.25)",
                  backgroundColor: "rgba(4,13,18,0.3)",
                  color: "#5C8374",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#93B1A6";
                  e.currentTarget.style.backgroundColor =
                    "rgba(147,177,166,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(147,177,166,0.25)";
                  e.currentTarget.style.backgroundColor = "rgba(4,13,18,0.3)";
                }}
              >
                <ImageIcon
                  className="h-8 w-8 mb-2"
                  style={{ color: "#5C8374" }}
                />
                <span className="text-sm">
                  Click to upload or drag and drop
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div
                className="relative rounded-lg overflow-hidden"
                style={{ border: "1px solid rgba(147,177,166,0.2)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-2 right-2 p-1 rounded-full text-white"
                  style={{ backgroundColor: "rgba(4,13,18,0.6)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {fileError && (
              <p className="text-xs" style={{ color: "#f87171" }}>
                {fileError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Start Time *</Label>
              <Input type="datetime-local" {...register("startTime")} />
              {errors.startTime && (
                <p className="text-xs" style={{ color: "#f87171" }}>
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>End Time *</Label>
              <Input type="datetime-local" {...register("endTime")} />
              {errors.endTime && (
                <p className="text-xs" style={{ color: "#f87171" }}>
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Rotation Duration (seconds)</Label>
            <Input
              type="number"
              placeholder="e.g. 30"
              {...register("rotationDuration")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Content
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
