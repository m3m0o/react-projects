import { hash, compare } from 'bcrypt';

export const hashString = (str: string): Promise<string> => {
  return hash(str, 10);
};

export const compareHashedStrings = (
  str1: string,
  str2: string,
): Promise<boolean> => {
  return compare(str1, str2);
};
