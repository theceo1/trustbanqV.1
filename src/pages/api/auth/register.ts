import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/login`, req.body)
        res.status(200).json(response.data)
      } catch (error: any) {
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'An error occurred during login' })
      }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}