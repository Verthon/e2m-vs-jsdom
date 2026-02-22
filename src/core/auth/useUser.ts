import { useQuery } from '@tanstack/react-query';
import { userQueries } from './queries/authQueries';

export const useUser = () => {
  const { data, isPending, isError } = useQuery(userQueries.current());

  return {
    isError,
    isPending,
    data: data ? {
      userName: data.userName,
      profileDescription: data.profileDescription,
      avatarUrl: data.avatarUrl,
    } : undefined,
  };
};