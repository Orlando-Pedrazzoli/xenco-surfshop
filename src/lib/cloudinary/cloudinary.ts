import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export const CLOUDINARY_FOLDERS = {
  surfboards: {
    custom: "xenco/surfboards/custom",
    new: "xenco/surfboards/new",
    used: "xenco/surfboards/used",
  },
  products: "xenco/products",
  models: "xenco/models",
  banners: "xenco/banners",
  store: "xenco/store",
  designs: "xenco/customer-designs",
} as const;

export function buildCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  const { width, height, quality = "auto" } = options;
  const transformations = [
    "f_auto",
    `q_${quality}`,
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}
