import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const bucketName = process.env.BUCKET_NAME;

function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function GET() {
  if (!bucketName) {
    return setCorsHeaders(NextResponse.json({ error: 'BUCKET_NAME is not defined' }, { status: 500 }));
  }

  try {
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const response = await s3Client.send(command);
    console.log('S3 response:', response);
    return setCorsHeaders(NextResponse.json(response));
  } catch (error) {
    console.error('Error fetching S3 objects:', error);
    return setCorsHeaders(NextResponse.json({ error: 'Error fetching S3 objects' }, { status: 500 }));
  }
}
