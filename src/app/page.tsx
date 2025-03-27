'use client';

import Link from 'next/link';
import { useUsers } from '@/hooks/useUsers';

export default function Home() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Error loading users: {error.message}</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">User Profiles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-blue-600">{user.name}</h2>
                <p className="text-gray-600">{user.location}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={`SKILL-${skill}/${user.id}/skill-index-${index}`}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
