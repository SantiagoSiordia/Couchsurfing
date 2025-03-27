import { useUser, useUsers } from '@/hooks/useUsers';
import Link from 'next/link';

interface UserCardProps {
  userId: string;
  showFullDetails?: boolean;
}

export function UserCard({ userId, showFullDetails = false }: UserCardProps) {

  const { data: allUsers } = useUsers();
  const { data: user } = useUser(userId);

  if (!user) return null;

  const cardContent = (
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
        {showFullDetails && (
          <p className="text-gray-500">Joined {new Date(user.joinedDate!).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );

  const renderFriends = () => {
    if (user.friendIds.length === 0) return null;

    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Friends:</h3>
        {showFullDetails ? (
          <div className="grid gap-4 md:grid-cols-2">
            {user.friendIds.map((friendId) => {
              const friend = allUsers?.find((u) => u.id === friendId);
              return friend ? (
                <Link key={`FRIEND-${friendId}`} href={`/users/${friend.id}`} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-blue-600">{friend.name}</h4>
                      <p className="text-sm text-gray-600">{friend.location}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {friend.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={`FRIEND-SKILL-${skill}/${friend.id}/skill-index-${index}`}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {friend.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{friend.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              ) : null;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {user.friendIds.map((friendId) => {
              const friend = allUsers?.find((u) => u.id === friendId);
              return friend ? (
                <span
                  key={`FRIEND_CARD-${userId}-${friendId}`}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {friend.name}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  const cardBody = (
    <>
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
      {renderFriends()}
    </>
  );

  if (showFullDetails) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        {cardContent}
        {cardBody}
        {showFullDetails && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Contact</h2>
            <p className="text-gray-700">{user.email}</p>
          </section>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/users/${user.id}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      {cardContent}
      {cardBody}
    </Link>
  );
} 