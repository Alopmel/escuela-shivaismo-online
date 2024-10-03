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

async function handleRequest(req: NextRequest) {
  if (!bucketName) {
    return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
  }

  try {
    switch (req.method) {
      case "GET":
        return await handleGET();
      case "POST":
        return await handlePOST(req);
      default:
        return NextResponse.json({ error: `Método no soportado: ${req.method}` }, { status: 405 });
    }
  } catch (err: any) {
    console.error('Error en la solicitud:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

async function handleGET() {
  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: bucketName!,
  };
  
  const res = await s3.listObjectsV2(params).promise();
  console.log('S3 response:', res);
  return NextResponse.json(res);
}

async function handlePOST(req: NextRequest) {
  console.log('Iniciando carga de video');
  
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const folder = formData.get('folder') as string;
  let customName = formData.get('customName') as string;
  
  if (!file || !folder) {
    return NextResponse.json({ success: false, message: "No se proporcionó archivo o carpeta" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  // Obtener la lista de objetos en la carpeta
  const listParams: AWS.S3.ListObjectsV2Request = {
    Bucket: bucketName!,
    Prefix: folder + '/'
  };
  const listResult = await s3.listObjectsV2(listParams).promise();

  // Determinar el próximo número de secuencia
  let nextSequence = 1;
  if (listResult.Contents && listResult.Contents.length > 0) {
    const sortedContents = listResult.Contents.sort((a, b) => {
      const aNum = parseInt(a.Key!.split('/').pop()!.split('.')[0]);
      const bNum = parseInt(b.Key!.split('/').pop()!.split('.')[0]);
      return aNum - bNum;
    });
    const lastFile = sortedContents[sortedContents.length - 1].Key;
    if (lastFile) {
      const lastSequence = parseInt(lastFile.split('/').pop()!.split('.')[0]);
      nextSequence = lastSequence + 1;
    }
  }

  console.log(`Carpeta seleccionada: ${folder}, Próximo número de secuencia: ${nextSequence}`);

  // Formatear el nombre del archivo
  const fileNameParts = customName.split('.');
  const extension = fileNameParts.pop()?.toLowerCase() || '';
  const nameWithoutExtension = fileNameParts.join('.').toUpperCase();
  customName = `${nextSequence}.${nameWithoutExtension}.${extension}`;
  const key = `${folder}/${customName}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName!,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  };

  console.log('Iniciando carga a S3');
  const result = await s3.upload(params).promise();
  console.log('Carga a S3 completada', result);

  return NextResponse.json({
    success: true,
    message: "Video subido exitosamente",
    data: { key: result.Key, url: result.Location },
  });
}

export const GET = handleRequest;
export const POST = handleRequest;