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
  return Array.from({ length: count }, (_, index) => ({
    id: `user-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
    location: faker.location.city() + ', ' + faker.location.country(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    skills: faker.helpers.arrayElements(skills, { min: 3, max: 6 }),
    joinedDate: faker.date.past({ years: 2 }).toISOString().split('T')[0]
  }));
} 