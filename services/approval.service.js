import { mockContent } from "../mock/content";

let contentStore = [...mockContent];

export const getAllContent = async () => {
  // MOCK - replace with: return (await api.get('/content')).data
  await new Promise((r) => setTimeout(r, 600));
  return contentStore;
};

export const getPendingContent = async () => {
  // MOCK - replace with: return (await api.get('/content?status=pending')).data
  await new Promise((r) => setTimeout(r, 600));
  return contentStore.filter((c) => c.status === "pending");
};

export const approveContent = async (contentId) => {
  // MOCK - replace with: return (await api.patch(`/content/${contentId}/approve`)).data
  await new Promise((r) => setTimeout(r, 500));
  contentStore = contentStore.map((c) =>
    c.id === contentId ? { ...c, status: "approved" } : c
  );
  return { success: true };
};

export const rejectContent = async (contentId, reason) => {
  // MOCK - replace with: return (await api.patch(`/content/${contentId}/reject`, { reason })).data
  await new Promise((r) => setTimeout(r, 500));
  contentStore = contentStore.map((c) =>
    c.id === contentId
      ? { ...c, status: "rejected", rejectionReason: reason }
      : c
  );
  return { success: true };
};
