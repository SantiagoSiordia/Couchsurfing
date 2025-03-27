'use client';

import { useUsers } from '@/hooks/useUsers';
import { UserCard } from '@/components/UserCard';

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
          <UserCard userId={user.id} key={user.id} />
        ))}
      </div>
    </main>
  );
}
