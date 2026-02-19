
import { NextResponse } from 'next/server';
import { STORIES } from '@/lib/mock-db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const { id } = await params;
  const storyId = Number(id);
  const story = STORIES.find(s => s.id === storyId);
  
  if (!story) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }
  
  return NextResponse.json(story);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const { id } = await params;
  const storyId = Number(id);
  const body = await request.json();
  const index = STORIES.findIndex(s => s.id === storyId);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }
  
  STORIES[index] = { ...STORIES[index], ...body };
  return NextResponse.json(STORIES[index]);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const { id } = await params;
  const storyId = Number(id);
  const index = STORIES.findIndex(s => s.id === storyId);
  
  if (index !== -1) {
    STORIES.splice(index, 1);
  }
  
  return NextResponse.json({ success: true });
}
