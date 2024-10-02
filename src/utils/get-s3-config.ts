import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  region: string
  bucketName: string
  identityPoolId: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    region: process.env.AWS_REGION || '',
    bucketName: process.env.BUCKET_NAME || '',
    identityPoolId: process.env.IDENTITY_POOL_ID || ''
  })
}