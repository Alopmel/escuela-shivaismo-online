import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from "next/server";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_NAME;

if (!bucketName) {
  console.error('BUCKET_NAME no está definido en las variables de entorno');
}

export async function GET() {
  if (!bucketName) {
    return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
  }

  const params = {
    Bucket: bucketName,
  };
  
  try {
    const res = await s3.listObjectsV2(params).promise();
    console.log('S3 response:', res);
    return NextResponse.json(res);
  } catch (error) {
    console.error('Error fetching S3 objects:', error);
    return NextResponse.json({ error: 'Error fetching S3 objects' }, { status: 500 });
  }
}

