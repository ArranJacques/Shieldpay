import { APIGatewayProxyEvent } from 'aws-lambda';
import controller from 'domain/api/controller';
import { getBody } from 'domain/api/request';
import * as response from 'domain/api/response';
import publishSms from 'domain/sms/sms-manager';
import validate from 'validate';

type RequestBody = {
  phoneNumber: string
  message: string
}

export const main = controller(async (event: APIGatewayProxyEvent) => {

  const payload = await validate<RequestBody>(getBody(event), {
    phoneNumber: ['required', 'phoneNumber'],
    message: ['required', 'max:160']
  }, {
    'phoneNumber.phoneNumber': 'invalid phone number',
    'message.max': 'max 160 characters'
  });

  await publishSms(payload.phoneNumber, payload.message);

  return response.success();
});
