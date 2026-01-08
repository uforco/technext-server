import { Response } from 'express';

export default function cookieResponse(
  res: Response,
  token: string,
): Response {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === 'production'
    sameSite: 'none',
    // maxAge:  6 * 1000, // 1 hour
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  });
  return res;
}
