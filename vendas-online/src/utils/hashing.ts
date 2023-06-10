import { hash, compare } from 'bcrypt';

export const hashString = (str: string): Promise<string> => {
  return hash(str, 10);
};

export const compareStringWithHashedString = async (
  str: string,
  hashedString: string,
): Promise<boolean> => {
  return compare(str, hashedString);
};
