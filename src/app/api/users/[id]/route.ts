import { NextResponse } from 'next/server';
import { users } from '@/data/users';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find((u) => u.id === params.id);
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
} 