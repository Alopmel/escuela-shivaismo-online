import { NextResponse } from "next/server";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function GET() {
  const bucketName = process.env.BUCKET_NAME;

  if (!bucketName) {
    throw new Error('BUCKET_NAME is not defined in the environment variables');
  }

  const params = {
    Bucket: bucketName,
  };
  
  try {
    const res = await s3.listObjectsV2(params).promise();
    return NextResponse.json(res); // Return the AWS response directly
  } catch (error) {
    console.error('Error fetching S3 objects:', error);
    return NextResponse.error();
  }
}
