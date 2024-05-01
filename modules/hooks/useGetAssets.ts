import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from '.';
import { getAssets, getCDToken } from '../services/user';

export const useGetAssets = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeysEnum.Assets, userId],
    queryFn: () => getAssets(userId),
    enabled: !!userId,
  });
};

export const useGetCDToken = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeysEnum.CDToken, userId],
    queryFn: () => getCDToken(userId),
    enabled: !!userId,
  });
};
