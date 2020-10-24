import validatePhoneNumber from '../../../../src/support/validation/validate-phone-number';

test('validates a phone number', () => {

  // TODO: should flesh this out a bit to better test a variety of phone numbers...

  // Obviously wrong mobile number.
  expect(validatePhoneNumber('1234567')).toBe(false);
  // Valid phone number but missing country code.
  expect(validatePhoneNumber('07988123456')).toBe(false);
  // Valid phone number
  expect(validatePhoneNumber('+447988123456')).toBe(true);
});
