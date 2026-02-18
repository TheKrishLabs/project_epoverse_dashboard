
import { NextResponse } from 'next/server';
import { STORIES, StoryData } from '@/lib/mock-db';

export async function GET() {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return NextResponse.json(STORIES);
}

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const body = await request.json();
  
  const newStory: StoryData = {
    ...body,
    id: STORIES.length > 0 ? Math.max(...STORIES.map(s => s.id)) + 1 : 1,
    views: 0,
    date: new Date().toISOString()
  };
  
  STORIES.unshift(newStory); // Add to beginning
  return NextResponse.json(newStory, { status: 201 });
}
