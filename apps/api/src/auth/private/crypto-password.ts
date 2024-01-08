import { pbkdf2Sync } from 'crypto';

const salt = process.env?.['AUTH_PASSWORD_SALT'] ?? 'id1dcKA8X3ELQ2YX';

export function cryptoPassword(value: string): string {
  const key = pbkdf2Sync(value, salt, 100000, 64, 'sha512');
  return key.toString('hex');
}
