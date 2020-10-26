export const AWS_CONFIG_REGION = process.env.AWS_CONFIG_REGION || '';
export const AWS_CONFIG_ACCESS_KEY_ID = process.env.AWS_CONFIG_ACCESS_KEY_ID || '';
export const AWS_CONFIG_ACCESS_KEY_SECRET = process.env.AWS_CONFIG_ACCESS_KEY_SECRET || '';

// TODO: would be great if we could reference this ARN direct from the
//  CloudFormation output as opposed to having to explicitly define it in the
//  .env file.
export const AWS_SNS_TOPIC_ARN = process.env.AWS_SNS_TOPIC_ARN || '';
