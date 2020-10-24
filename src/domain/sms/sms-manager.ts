import AWS from 'aws-sdk';
import { AWS_CONFIG_ACCESS_KEY_ID, AWS_CONFIG_ACCESS_KEY_SECRET, AWS_SNS_TOPIC_ARN } from 'foundation/config';

const SNS = new AWS.SNS({
  accessKeyId: AWS_CONFIG_ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG_ACCESS_KEY_SECRET
});

export async function publishSms(phoneNumber: string, message: string) {
  await SNS.publish({
    Message: JSON.stringify({ phoneNumber, message }),
    TargetArn: AWS_SNS_TOPIC_ARN
  }).promise();
}

export async function sendSms(phoneNumber: string, message: string) {
  await SNS.publish({
    Message: message,
    PhoneNumber: phoneNumber,
    MessageAttributes: {
      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'Sheildpay'
      }
    }
  }).promise();
}
