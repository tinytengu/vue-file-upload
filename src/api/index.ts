import client from "./client";

export const uploadFile = (file: File, onUploadProgress: any) => {
  let formData = new FormData();
  formData.append("file", file);

  return client.post("/photos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};
