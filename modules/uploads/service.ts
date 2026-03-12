export type UploadResult = {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
};

export async function uploadToCloudinary(
  _file: Buffer | { buffer: Buffer; mimetype: string },
  _options: { folder?: string }
): Promise<UploadResult> {
  const cloudinary = process.env.CLOUDINARY_URL;
  if (cloudinary) {
    const { v2: cloud } = await import("cloudinary");
    cloud.config({ url: cloudinary });
    const buffer = Buffer.isBuffer(_file) ? _file : _file.buffer;
    const folder = _options.folder ?? "pfa";
    return new Promise((resolve, reject) => {
      const uploadStream = cloud.uploader.upload_stream(
        { folder },
        (err: Error | undefined, result: { secure_url: string; public_id: string; format: string; bytes: number; width?: number; height?: number }) => {
          if (err) reject(err);
          else
            resolve({
              url: result!.secure_url,
              publicId: result!.public_id,
              format: result!.format,
              bytes: result!.bytes,
              width: result!.width,
              height: result!.height,
            });
        }
      );
      uploadStream.end(buffer);
    });
  }
  return {
    url: "/api/v1/assets/logo",
    publicId: "placeholder",
    format: "png",
    bytes: 0,
  };
}

export async function uploadProfileImage(_userId: string, _file: { buffer: Buffer; mimetype: string }) {
  const result = await uploadToCloudinary(_file, { folder: "profiles" });
  return result.url;
}

export async function uploadProjectFile(_studentId: string, file: { buffer: Buffer; mimetype: string; size: number }) {
  if (file.size > 50 * 1024 * 1024) throw new Error("File too large (max 50MB)");
  return uploadToCloudinary(file, { folder: "projects" });
}
