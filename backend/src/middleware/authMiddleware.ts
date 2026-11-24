import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jwtSecret = process.env.JWT_SECRET;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!jwtSecret) {
    return res.status(500).json({
      error: 'Missing JWT secret',
      success: false,
    });
  }

  if (!token) {
    return res.status(401).json({
      error: 'Missing token',
      success: false,
    });
  }
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(403).json({
      error: 'Forbidden - Invalid or expired token',
    });
  }
};
