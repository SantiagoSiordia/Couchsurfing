import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/constants/api';

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_ENDPOINTS.users);
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
};

const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(API_ENDPOINTS.user(id));
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }
  return res.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
}; 