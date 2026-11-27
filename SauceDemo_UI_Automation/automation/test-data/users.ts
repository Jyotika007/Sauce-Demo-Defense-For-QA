export interface TestUser {
  username: string;
  password: string;
}

// SauceDemo prints these demo credentials on its own login page, so they are not secrets.
const DEMO_PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: DEMO_PASSWORD },
  lockedOut: { username: 'locked_out_user', password: DEMO_PASSWORD },
} satisfies Record<string, TestUser>;

export interface InvalidLoginCase {
  title: string;
  username: string;
  password: string;
  expectedError: string;
}

const NO_MATCH = 'Username and password do not match any user in this service';

export const invalidLoginCases: InvalidLoginCase[] = [
  { title: 'wrong password', username: users.standard.username, password: 'wrong_password', expectedError: NO_MATCH },
  { title: 'unknown username', username: 'unknown_user', password: DEMO_PASSWORD, expectedError: NO_MATCH },
  { title: 'empty username and password', username: '', password: '', expectedError: 'Username is required' },
  { title: 'empty username', username: '', password: DEMO_PASSWORD, expectedError: 'Username is required' },
  { title: 'empty password', username: users.standard.username, password: '', expectedError: 'Password is required' },
  { title: 'locked-out user', username: users.lockedOut.username, password: DEMO_PASSWORD, expectedError: 'Sorry, this user has been locked out.' },
];
