import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApiResponse, systemError, validationError } from 'domain/api/response';
import { logError } from 'domain/logging/logger';
import bootstrap from 'foundation/bootstrap';
import { ValidationError } from 'validate/support/errors';

type ApiController = (event: APIGatewayProxyEvent, ctx: Context) => Promise<ApiResponse>;

export default function (handler: ApiController): ApiController {

  return async function (event: APIGatewayProxyEvent, ctx: Context) {

    try {
      bootstrap();
      return await handler(event, ctx);
    } catch (e) {

      if (e instanceof ValidationError) {
        return validationError(e);
      }

      await logError(e);

      return systemError(e);
    }
  };
}
