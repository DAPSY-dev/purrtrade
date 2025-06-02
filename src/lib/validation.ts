import bcrypt from "bcrypt";

const PASSWORD_SALT_ROUNDS = 10;

export function hashPassword(plainPassword: string) {
  return bcrypt.hashSync(plainPassword, PASSWORD_SALT_ROUNDS);
}

export function comparePasswords(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
