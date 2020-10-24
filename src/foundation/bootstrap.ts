/**
 * Here we can bootstrap everything we need for our application to run. This
 * might include initiating services, etc.
 */
import AWS from 'aws-sdk';
import { AWS_REGION } from 'foundation/config';
import validatePhoneNumber from 'support/validation/validate-phone-number';
import { registerRule } from 'validate';
import { Failed } from 'validate/support/errors';

export default function () {

  // Set default AWS region.
  AWS.config.update({ region: AWS_REGION });

  // Register custom validation rules.
  registerRule('phoneNumber', async (value: any) => {
    if (!validatePhoneNumber(value)) {
      throw new Failed('phoneNumber');
    }
  });
}
