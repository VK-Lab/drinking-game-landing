export default function handler(_req: any, res: any) {
  res.setHeader(
    'Set-Cookie',
    'userData=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly',
  );
  res.status(200).json({ message: 'Logged out' });
}
