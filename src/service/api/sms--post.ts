import { APIGatewayProxyEvent } from 'aws-lambda';
import controller from 'domain/api/controller';
import { getBody } from 'domain/api/request';
import * as response from 'domain/api/response';
import validate from 'validate';

type RequestBody = {
  phoneNumber: string
  message: string
}

export const main = controller(async (event: APIGatewayProxyEvent) => {

  const payload = await validate<RequestBody>(getBody(event), {
    phoneNumber: ['required'],
    message: ['required']
  });

  return response.success(payload);
});
