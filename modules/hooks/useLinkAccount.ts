import { useMutation } from '@tanstack/react-query';
import { linkAccount, unLinkAccount } from '../services/user';

export const useLinkAccount = () => {
  return useMutation({
    mutationFn: linkAccount,
  });
};

// export const useUnLinkAccount = () => {
//   return useMutation({
//     mutationFn: unLinkAccount,
//     onSuccess: (_, params) => {
//       console.log('🚀 ~ useUnLinkAccount ~ params:', params);
//       queryClient.invalidateQueries({
//         queryKey: [QueryKeysEnum.LinkedAccount, params],
//       });
//     },
//   });
// };
