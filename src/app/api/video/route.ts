import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

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

export async function GET(req: NextRequest) {
  console.log('GET request received');
  console.log('Environment variables:', {
    region: process.env.AWS_REGION,
    bucketName: process.env.BUCKET_NAME,
    hasAccessKeyId: !!process.env.AWS_ACCESS_KEY_ID,
    hasSecretAccessKey: !!process.env.AWS_SECRET_ACCESS_KEY,
  });

  if (!bucketName) {
    console.error('BUCKET_NAME is not defined');
    return setCorsHeaders(NextResponse.json({ error: 'BUCKET_NAME is not defined' }, { status: 500 }));
  }

  try {
    console.log('Attempting to list objects from S3');
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const response = await s3Client.send(command);
    console.log('S3 response:', response);
    return setCorsHeaders(NextResponse.json(response));
  } catch (error) {
    console.error('Error fetching S3 objects:', error);
    if (error instanceof Error) {
      return setCorsHeaders(NextResponse.json({ error: 'Error fetching S3 objects', details: error.message }, { status: 500 }));
    } else {
      return setCorsHeaders(NextResponse.json({ error: 'Error fetching S3 objects', details: 'Unknown error' }, { status: 500 }));
    }
  }
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}