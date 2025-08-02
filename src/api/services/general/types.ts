// General API Types

export interface UploadedFile {
  original_name: string;
  file_name: string;
  file_type: string;
  file_path: string;
  file_url: string;
  file_size: number;
}

export interface UploadFilesResponse {
  uploaded: UploadedFile[];
  failed: any[];
}

export interface UploadedImage {
  image_name: string;
  image_url: string;
}

export interface UploadImagesResponse {
  uploaded: UploadedImage[];
  failed: any[];
} 