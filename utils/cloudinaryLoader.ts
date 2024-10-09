// utils/cloudinaryLoader.ts

import type { ImageLoaderProps } from 'next/image';

export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const params = ['f_auto', 'q_auto'];

  if (quality) {
    params.push(`q_${quality}`);
  }

  if (width) {
    params.push(`w_${width}`);
  }

  const paramsString = params.join(',');

  // Ensure the src does not already include transformations
  const [baseUrl, imagePath] = src.split('/upload/');
  if (!imagePath) {
    // If the src doesn't contain '/upload/', return it as is
    return src;
  }

  return `${baseUrl}/upload/${paramsString}/${imagePath}`;
};
