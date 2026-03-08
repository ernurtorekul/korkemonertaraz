import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/supabase/auth';
import { generateId } from '@/lib/supabase/articles';
import { uploadImage, uploadDocument } from '@/lib/supabase/storage';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token || !(await verifyAdminSession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const articleId = generateId();

    console.log('Uploading file:', file.name, file.type, file.size);

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let url: string;

    if (file.type.startsWith('image/')) {
      url = await uploadImage(buffer, articleId, file.name);
    } else {
      // Accept all file types for documents
      url = await uploadDocument(buffer, articleId, file.name);
    }

    console.log('File uploaded successfully:', url);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error uploading file:', error);

    // Provide more detailed error message
    let errorMessage = 'Failed to upload file';
    if (error?.message) {
      errorMessage += `: ${error.message}`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
