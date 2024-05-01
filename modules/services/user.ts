import request from './request';

export type LinkedAccountResponse = {
  publicKey: string;
  userId: string;
};

export const getLinkedAccount = async (
  userId: string,
): Promise<LinkedAccountResponse> => {
  return await request.get(`/users/${userId}`);
};

export type AssetResponse = {
  tokenId: string;
  unitMetadata: {
    unitId: string;
    level: number;
    xp: number;
    damageBoots: number;
    image: string;
  };
};

export const getAssets = async (userId: string): Promise<AssetResponse[]> => {
  return await request.get(`/nfts/${userId}`);
};

type LinkAccountParams = {
  userId: string;
  publicKey: string;
  signedMessage: string;
};
export const linkAccount = async ({
  userId,
  publicKey,
  signedMessage,
}: LinkAccountParams) => {
  return await request.post(`/users/${userId}/link`, {
    publicKey,
    signedMessage,
  });
};

export const unLinkAccount = async (userId: string) => {
  return await request.post(`/users/${userId}/unlink`);
};

type CDTokenResponse = {
  total: number;
};

export const getCDToken = async (userId: string): Promise<CDTokenResponse> => {
  return await request.get(`/users/${userId}/md`);
};
