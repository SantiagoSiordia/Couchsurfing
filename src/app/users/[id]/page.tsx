'use client';

import Link from 'next/link';
import { useUser } from '@/hooks/useUsers';
import { use } from 'react';

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: user, isLoading, error } = useUser(resolvedParams.id);

  if (isLoading) {
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

  if (error || !user) {
    return (
      <main className="min-h-screen p-8">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to Users
        </Link>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600">Error loading user: {error?.message}</h1>
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
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-6 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{user.name}</h1>
            <p className="text-gray-600">{user.location}</p>
            <p className="text-gray-500">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">About</h2>
            <p className="text-gray-700">{user.bio}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Contact</h2>
            <p className="text-gray-700">{user.email}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 