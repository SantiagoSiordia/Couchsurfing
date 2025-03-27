'use client';

import Link from 'next/link';
import { useUser } from '@/hooks/useUsers';
import { use } from 'react';
import { UserCard } from '@/components/UserCard';

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: user, isLoading: isLoadingUser, error: userError } = useUser(resolvedParams.id);

  if (isLoadingUser) {
    return (
      <main className="min-h-screen p-8">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to Users
        </Link>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (userError || !user) {
    return (
      <main className="min-h-screen p-8">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to Users
        </Link>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600">Error loading user: {userError?.message}</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <Link
        href="/"
        className="inline-block mb-8 text-blue-600 hover:text-blue-800"
      >
        ← Back to Users
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <UserCard userId={user.id} showFullDetails />
      </div>
    </main>
  );
} 