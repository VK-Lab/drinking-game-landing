// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Issuer } from 'openid-client';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const issuer = await Issuer.discover(
      'https://apis.roblox.com/oauth/.well-known/openid-configuration',
    );
    console.info(process.env.NEXT_PUBLIC_BASE_URL);
    const client = new issuer.Client({
      client_id: process.env.ROBLOX_CLIENT_ID!,
      client_secret: process.env.ROBLOX_CLIENT_SECRET,
      redirect_uris: [process.env.ROBLOX_CALLBACK_URL!],
      response_types: ['code'],
      scope: 'openid profile',
      id_token_signed_response_alg: 'ES256',
    });

    // Redirect to the authorization URL
    const authorizationUrl = client.authorizationUrl({
      scope: 'openid profile',
    });
    console.log('🚀 ~ file: page.ts:23 ~ authorizationUrl:', res);

    res.redirect(authorizationUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
