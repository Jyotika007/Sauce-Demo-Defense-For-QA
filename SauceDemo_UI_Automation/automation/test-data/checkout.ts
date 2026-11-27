export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const validCheckoutInfo: CheckoutInfo = {
  firstName: 'Asha',
  lastName: 'Tester',
  postalCode: '44600',
};

/** Sales tax rate SauceDemo applies on the order overview page. */
export const TAX_RATE = 0.08;

export interface MissingFieldCase {
  title: string;
  info: Partial<CheckoutInfo>;
  expectedError: string;
}

export const missingFieldCases: MissingFieldCase[] = [
  { title: 'all fields empty', info: {}, expectedError: 'First Name is required' },
  { title: 'last name and postal code empty', info: { firstName: validCheckoutInfo.firstName }, expectedError: 'Last Name is required' },
  { title: 'postal code empty', info: { firstName: validCheckoutInfo.firstName, lastName: validCheckoutInfo.lastName }, expectedError: 'Postal Code is required' },
];
