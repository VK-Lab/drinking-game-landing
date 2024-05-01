// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Issuer } from 'openid-client';
import { serialize, parse } from 'cookie';

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const issuer = await Issuer.discover(
      'https://apis.roblox.com/oauth/.well-known/openid-configuration',
    );
    const client = new issuer.Client({
      client_id: process.env.ROBLOX_CLIENT_ID!,
      client_secret: process.env.ROBLOX_CLIENT_SECRET,
      redirect_uris: [process.env.ROBLOX_CALLBACK_URL!],
      response_types: ['code'],
      id_token_signed_response_alg: 'ES256',
    });

    const cookies = parse(req.headers.cookie || '');
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      params,
      {
        state: cookies.state,
        nonce: cookies.nonce,
      },
    );

    // Define secure cookie configuration
    const secureCookieConfig = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    // Set cookies
    res.setHeader('Set-Cookie', [
      serialize(
        'userData',
        JSON.stringify(tokenSet.claims()),
        secureCookieConfig,
      ),
      serialize('accessToken', tokenSet.access_token || '', secureCookieConfig),
      serialize(
        'refreshToken',
        tokenSet.refresh_token || '',
        secureCookieConfig,
      ),
      serialize('idToken', tokenSet.id_token || '', secureCookieConfig),
      serialize('state', '', { ...secureCookieConfig, maxAge: -1 }), // Clear state cookie
      serialize('nonce', '', { ...secureCookieConfig, maxAge: -1 }), // Clear nonce cookie
    ]);

    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
