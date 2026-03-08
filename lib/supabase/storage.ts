import { supabaseAdmin } from './server';

const STORAGE_BUCKET = 'article-files';
const IMAGES_FOLDER = 'images';
const FILES_FOLDER = 'files';

// Upload a file to Supabase Storage
export async function uploadFile(
  file: File | Buffer,
  path: string,
  contentType?: string
): Promise<string> {
  let buffer: Buffer;

  if (file instanceof Buffer) {
    buffer = file;
  } else {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  }

  try {
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, {
        contentType: contentType || 'application/octet-stream',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);

      // Provide helpful error message
      if (error.message?.includes('The resource was not found') || error.message?.includes('No such bucket')) {
        throw new Error(
          'Storage bucket not found. Please create a bucket named "article-files" in Supabase Storage first.'
        );
      }

      if (error.message?.includes('Bucket policy')) {
        throw new Error(
          'Storage bucket policy error. Please ensure the bucket is set to public.'
        );
      }

      throw error;
    }

    if (!data) throw new Error('Failed to upload file');

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path);

    return publicUrl;
  } catch (error: any) {
    console.error('Upload error details:', {
      code: error?.code,
      message: error?.message,
      bucket: STORAGE_BUCKET,
      path
    });

    throw error;
  }
}

// Upload an image
export async function uploadImage(file: File | Buffer, articleId: string, fileName?: string): Promise<string> {
  const extension = fileName?.split('.').pop()?.toLowerCase() || 'jpg';
  const timestamp = Date.now();
  const path = `${IMAGES_FOLDER}/${articleId}/${timestamp}.${extension}`;

  // Get content type from file object or derive from extension
  let contentType: string;
  if (file instanceof Buffer) {
    contentType = `image/${extension}`;
  } else {
    contentType = (file as File).type || `image/${extension}`;
  }

  console.log('uploadImage:', { path, contentType, fileName, extension });

  return uploadFile(file, path, contentType);
}

// Upload a file (PDF, doc, etc.)
export async function uploadDocument(file: File | Buffer, articleId: string, fileName?: string): Promise<string> {
  const extension = fileName?.split('.').pop()?.toLowerCase() || 'pdf';
  const timestamp = Date.now();
  const path = `${FILES_FOLDER}/${articleId}/${timestamp}.${extension}`;

  // Map common extensions to content types
  const contentTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  // Get content type from file object or derive from extension
  let contentType: string;
  if (file instanceof Buffer) {
    contentType = contentTypes[extension] || 'application/octet-stream';
  } else {
    contentType = (file as File).type || contentTypes[extension] || 'application/octet-stream';
  }

  console.log('uploadDocument:', { path, contentType, fileName, extension });

  return uploadFile(file, path, contentType);
}

// Delete a file from Supabase Storage
export async function deleteFile(url: string): Promise<void> {
  try {
    // Extract path from URL
    const urlObj = new URL(url);
    const path = urlObj.pathname.slice(1); // Remove leading slash

    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .remove(path);

    if (error && error.message !== 'The resource was not found') {
      console.error('Error deleting file:', error);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
