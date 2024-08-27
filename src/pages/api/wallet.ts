import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Wallet from '@models/Wallet';
import connectDB from '@utils/connectDB';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided, user not authenticated' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const userId = decodedToken.id;

      const wallet = await Wallet.findOne({ user: userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }

      return res.status(200).json(wallet);

    } catch (error) {
      console.error('Error fetching wallet:', error);
      return res.status(500).json({ message: 'Server error, please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
