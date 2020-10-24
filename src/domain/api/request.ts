import { APIGatewayProxyEvent } from 'aws-lambda';

function recursivelyCheckIfArray(parentObj: { [key: string]: any }): { [key: string]: any } {

  if (Object.prototype.toString.call(parentObj) != '[object Object]') {
    return parentObj;
  }

  Object.keys(parentObj).map((parentKey) => {

    const childObj = parentObj[parentKey];

    if (Object.prototype.toString.call(childObj) != '[object Object]') {
      return;
    }

    const keys = Object.keys(childObj);

    if (keys.every((childKey) => /^(\d+)$/g.test(childKey))) {
      parentObj[parentKey] = keys.map((key) => childObj[key]);
    }

    recursivelyCheckIfArray(childObj);
  });

  return parentObj;
}

/**
 * Get the query parameters from an api HTTP request.
 *
 * @param {APIGatewayProxyEvent} event
 * @returns {{[p: string]: any}}
 */
export function getQuery(event: APIGatewayProxyEvent): { [key: string]: any } {

  const query: { [key: string]: any } = event.queryStringParameters || {};

  Object.keys(query).map((paramName) => {

    const segments = paramName.match(/([^\[\]]+)/g);
    let step = query;

    // No nested params found
    if (!segments || segments.length <= 1) {
      return;
    }

    segments.map(function (segment, k) {
      if (k >= segments.length - 1) {
        step[segment] = query[paramName];
        return;
      }

      if (!step[segment]) {
        step[segment] = {};
      }
      step = step[segment];
    });

    delete query[paramName];
  });

  return recursivelyCheckIfArray(query);
}

/**
 * Get the body from an api HTTP request. Assumes body will be a JSON object.
 *
 * @param {APIGatewayProxyEvent} event
 * @returns {{[p: string]: any}}
 */
export function getBody(event: APIGatewayProxyEvent): { [key: string]: any } {
  try {
    const parsed = JSON.parse(event.body || '');
    return typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    return {};
  }
}
