import { faker } from '@faker-js/faker';

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'Rust',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Redis', 'Elasticsearch', 'CI/CD', 'Git', 'Agile', 'Scrum', 'GCP',
  'Azure', 'Linux', 'Windows', 'MacOS', 'iOS', 'Android', 'Flutter',
  'Swift', 'Kotlin', 'Ruby', 'PHP', 'Laravel', 'Ruby on Rails',
  'Next.js', 'Tailwind CSS', 'CSS', 'HTML', 'JavaScript', 'TypeScript'
];

export function generateUsers(count: number): User[] {
  const users = Array.from({ length: count }, (_, index) => ({
    id: `user-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
    location: faker.location.city() + ', ' + faker.location.country(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    skills: faker.helpers.arrayElements(skills, { min: 3, max: 6 }),
    joinedDate: faker.date.past({ years: 2 }).toISOString().split('T')[0],
    friendIds: [] as string[]
  }));

  // Add random friend IDs for each user
  users.forEach((user) => {
    const maxFriends = Math.floor(count / 4);
    const numFriends = faker.number.int({ min: 0, max: maxFriends });
    
    // Get all possible friend IDs (excluding the user's own ID)
    const possibleFriends = users
      .map(u => u.id)
      .filter(id => id !== user.id);
    
    // Randomly select friend IDs
    const selectedFriends = faker.helpers.arrayElements(possibleFriends, numFriends);
    
    // Add mutual friendships
    selectedFriends.forEach(friendId => {
      user.friendIds.push(friendId);
      // Find the friend user and add this user to their friendIds
      const friendUser = users.find(u => u.id === friendId);
      if (friendUser && !friendUser.friendIds.includes(user.id)) {
        friendUser.friendIds.push(user.id);
      }
    });
  });

  return users;
} 