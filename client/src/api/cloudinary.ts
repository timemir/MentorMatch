const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

async function upload(file: File) {
  const unsignedUploadPreset = "mentormatch";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return data.secure_url;
  }
  throw new Error("Image upload failed");
}

const cloudinary = {
  upload,
};

export default cloudinary;
