import { SQSEvent } from 'aws-lambda';
import { sendSms } from 'domain/sms/sms-manager';

export const main = async function (event: SQSEvent) {
  await Promise.all(event.Records.map(async (r) => {
    const { phoneNumber, message } = JSON.parse(r.body);
    await sendSms(phoneNumber, message);
  }));
};
