import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authMutations } from '../queries/authQueries';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...authMutations.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
