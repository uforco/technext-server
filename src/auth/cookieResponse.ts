import { Response } from 'express';

export default function cookieResponse(
  res: Response,
  token: string,
  redirect?: boolean,
): Response {
  const providerOff =
    redirect == undefined || redirect == true ? true : redirect;
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === 'production'
    sameSite: 'none',
    // maxAge: 1 * 60 * 60 * 1000, // 1 hour
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    path: `/`,
  });
  if (!providerOff)
    res.status(200).json({
      message: 'Logged in successfully',
    });
  if (providerOff) res.redirect(`${process.env.FORTEND_URL}`);
  return res;
}
