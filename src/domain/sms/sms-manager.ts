import AWS from 'aws-sdk';
import { AWS_CONFIG_ACCESS_KEY_ID, AWS_CONFIG_ACCESS_KEY_SECRET, AWS_SNS_TOPIC_ARN } from 'foundation/config';

const SNS = new AWS.SNS({
  accessKeyId: AWS_CONFIG_ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG_ACCESS_KEY_SECRET
});

export default async function (phoneNumber: string, message: string) {
  await SNS.publish({
    Message: JSON.stringify({ phoneNumber, message }),
    TargetArn: AWS_SNS_TOPIC_ARN
  }).promise();
}
