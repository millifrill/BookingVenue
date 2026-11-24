import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const adminLogin = (req: Request, res: Response) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { password } = req.body as { password?: string };
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminPassword) {
    return res.status(500).json({
      error: 'Missing admin password in the .env file',
      success: false,
    });
  }

  if (!password) {
    return res.status(400).json({ error: 'Missing password', success: false });
  }

  if (adminPassword !== password) {
    return res.status(401).json({ error: 'Wrong password', success: false });
  }

  if (!jwtSecret) {
    return res.status(500).json({
      error: 'Missing JWT secret',
      success: false,
    });
  }

  const token = jwt.sign({ admin: 'admin' }, jwtSecret, {
    expiresIn: '1h',
  });

  return res.status(200).json({ success: true, token: token });
};
