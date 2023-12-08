import emailRegex from './email-regex';

export default function (email: string) {
  return email.toLowerCase().replace(emailRegex, '');
}
