export type UploadingStatus = "pending" | "uploading" | "failed" | "success";

export interface SelectedFile {
  file: File;
  percentage: number;
  status: UploadingStatus;
}
