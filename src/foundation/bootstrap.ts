/**
 * Here we can bootstrap everything we need for our application to run. This
 * might include initiating services, etc.
 */
import validatePhoneNumber from 'support/validation/validate-phone-number';
import { registerRule } from 'validate';
import { Failed } from 'validate/support/errors';

export default function () {

  // Register custom validation rules.
  registerRule('phoneNumber', async (value: any) => {
    if (!validatePhoneNumber(value)) {
      throw new Failed('phoneNumber');
    }
  });
}
