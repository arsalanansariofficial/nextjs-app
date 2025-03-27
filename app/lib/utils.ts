import path from 'path';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageName(image: File) {
  const ext = path.extname(image.size ? image.name : 'user.jpg');
  const base = path.basename(image.size ? image.name : 'user.jpg', ext);

  return `${base}_${crypto.randomBytes(8).toString('hex')}${ext}`;
}
