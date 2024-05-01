import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from '.';
import { getLinkedAccount } from '../services/user';

export const useGetLinkedAccount = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeysEnum.LinkedAccount, userId],
    queryFn: () => getLinkedAccount(userId),
    enabled: !!userId,
  });
};
