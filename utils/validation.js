import { z } from "zod";

// Custom validation for file input using zod
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 1024 * 1024 * 5; // 5MB

export const isImage = z.instanceof(File)
  .refine(file => file.size <= FILE_SIZE, {
    message: 'File is too large, should be less than 5MB',
  })
  .refine(file => SUPPORTED_FORMATS.includes(file.type), {
    message: 'Choose Image, Unsupported file format',
  });

