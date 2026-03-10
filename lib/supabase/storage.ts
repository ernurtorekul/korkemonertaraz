import { supabaseAdmin } from './server';

const STORAGE_BUCKET = 'article-files';
const IMAGES_FOLDER = 'images';
const FILES_FOLDER = 'files';

// Allowed file extensions for security
const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const ALLOWED_DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'];

// Sanitize filename to prevent path traversal and other attacks
function sanitizeFileName(fileName: string): string {
  // Remove any directory paths
  const name = fileName.replace(/^.*[\\\/]/, '');

  // Remove any non-alphanumeric characters except dots, underscores, and hyphens
  // Also remove any dots that aren't the extension separator
  const parts = name.split('.');
  const extension = parts.pop()?.toLowerCase() || '';
  const baseName = parts.join('.')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 50); // Limit length

  return `${baseName}.${extension}`;
}

// Validate file extension
function validateFileExtension(fileName: string, allowedExtensions: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
}

// Upload a file to Supabase Storage
export async function uploadFile(
  file: File | Buffer,
  path: string,
  contentType?: string
): Promise<string> {
  let buffer: Buffer;

  if (Buffer.isBuffer(file)) {
    buffer = file;
  } else {
    const arrayBuffer = await (file as File).arrayBuffer();
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
  // Sanitize filename
  const sanitizedName = fileName ? sanitizeFileName(fileName) : 'image.jpg';

  // Validate extension
  if (!validateFileExtension(sanitizedName, ALLOWED_IMAGE_EXTENSIONS)) {
    throw new Error(`Invalid image file type. Allowed types: ${ALLOWED_IMAGE_EXTENSIONS.join(', ')}`);
  }

  const extension = sanitizedName.split('.').pop()?.toLowerCase() || 'jpg';
  const timestamp = Date.now();
  const safeFileName = `${timestamp}_${sanitizedName}`;
  const path = `${IMAGES_FOLDER}/${articleId}/${safeFileName}`;

  // Get content type from file object or derive from extension
  let contentType: string;
  if (file instanceof Buffer) {
    contentType = `image/${extension}`;
  } else {
    contentType = (file as File).type || `image/${extension}`;
  }

  console.log('uploadImage:', { path, contentType, fileName: sanitizedName, extension });

  return uploadFile(file, path, contentType);
}

// Upload a file (PDF, doc, etc.)
export async function uploadDocument(file: File | Buffer, articleId: string, fileName?: string): Promise<string> {
  // Sanitize filename
  const sanitizedName = fileName ? sanitizeFileName(fileName) : 'document.pdf';

  // Validate extension
  if (!validateFileExtension(sanitizedName, ALLOWED_DOCUMENT_EXTENSIONS)) {
    throw new Error(`Invalid document file type. Allowed types: ${ALLOWED_DOCUMENT_EXTENSIONS.join(', ')}`);
  }

  const extension = sanitizedName.split('.').pop()?.toLowerCase() || 'pdf';
  const timestamp = Date.now();
  const safeFileName = `${timestamp}_${sanitizedName}`;
  const path = `${FILES_FOLDER}/${articleId}/${safeFileName}`;

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

  console.log('uploadDocument:', { path, contentType, fileName: sanitizedName, extension });

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
      .remove([path]);

    if (error && error.message !== 'The resource was not found') {
      console.error('Error deleting file:', error);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
