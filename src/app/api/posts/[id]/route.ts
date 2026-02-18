
import { NextResponse } from 'next/server';
import { POSTS } from '@/lib/mock-db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const id = params.id;
  const post = POSTS.find(p => p.id === id);
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const id = params.id;
  const body = await request.json();
  const index = POSTS.findIndex(p => p.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  
  POSTS[index] = { ...POSTS[index], ...body };
  return NextResponse.json(POSTS[index]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const id = params.id;
  const index = POSTS.findIndex(p => p.id === id);
  
  if (index !== -1) {
    POSTS.splice(index, 1);
  }
  
  return NextResponse.json({ success: true });
}
