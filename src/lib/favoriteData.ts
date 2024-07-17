import { DynamoDB } from 'aws-sdk';
import AWS from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = "videoData";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

type Favorite = {
    videoId: string,
    userId: string,
    category: string, 
    url: string,
    title: string,
    lastview: Date,
};

// handlers
export const getFavorites = async (): Promise<Favorite[]> => {
    const params = {
        TableName: TABLE_NAME
    };

    const result = await dynamoDb.scan(params).promise();
    return result.Items as Favorite[];
};

export const getFavoritesByUserId = async (userId: string): Promise<Favorite[]> => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const result = await dynamoDb.query(params).promise();
    return result.Items as Favorite[];
};

export const addFavorites = async (favorite: Favorite): Promise<void> => {
    const params = {
        TableName: TABLE_NAME,
        Item: favorite
    };

    await dynamoDb.put(params).promise();
};

export const deleteFavorites = async (videoId: string, userId: string): Promise<void> => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId, videoId }
    };

    await dynamoDb.delete(params).promise();
};

export const getVideoByID = async (videoId: string, userId: string): Promise<Favorite | undefined> => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId, videoId }
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item as Favorite | undefined;
};

export const updateFavorites = async (videoId: string, userId: string, lastView: Date): Promise<void> => {
    const params = {
        TableName: TABLE_NAME,
        Key: { userId, videoId },
        UpdateExpression: 'set lastview = :lastview',
        ExpressionAttributeValues: {
            ':lastview': lastView
        },
        ReturnValues: 'UPDATED_NEW'
    };

    await dynamoDb.update(params).promise();
};
