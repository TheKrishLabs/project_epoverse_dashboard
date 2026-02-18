
import { NextResponse } from 'next/server';
import { POSTS, PostData } from '@/lib/mock-db';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 800));
  return NextResponse.json(POSTS);
}

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 800));
  const body = await request.json();
  
  const newPost: PostData = {
    ...body,
    id: (POSTS.length + 1).toString(),
    hit: 0,
    likes: 0,
    comments: 0,
    releaseDate: new Date().toISOString().split('T')[0],
    postDate: new Date().toISOString().split('T')[0],
    status: "Publish", 
    postBy: "Current User",
    socialPost: false
  };
  
  POSTS.unshift(newPost);
  return NextResponse.json(newPost, { status: 201 });
}
