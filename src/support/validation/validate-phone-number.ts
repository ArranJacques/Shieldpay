import { PhoneNumberUtil } from 'google-libphonenumber';

export default function (value: string) {
  const phoneNumber = PhoneNumberUtil.getInstance();
  try {
    return phoneNumber.isValidNumber(phoneNumber.parse(value));
  } catch {
    return false;
  }
}
