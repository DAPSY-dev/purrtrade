import bcrypt from "bcrypt";

const PASSWORD_SALT_ROUNDS = 10;

export function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, PASSWORD_SALT_ROUNDS);
}
// Example:
// hashPassword("asd").then((hash) => {
//   console.log(hash);
// });

export function comparePasswords(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
// Example:
// comparePasswords(
//   "asd",
//   "$2b$10$9RrRcLMAjcj9sFN1MJDHXOt8rZ.0un4n7Cl4RFGmrhH4i0j04pDYS"
// ).then((result) => {
//   console.log(result);
// });
