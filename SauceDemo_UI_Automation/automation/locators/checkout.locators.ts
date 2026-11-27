export const checkoutLocators = {
  // Step one: your information
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorMessage: '[data-test="error"]',
  // Step two: overview
  subtotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '[data-test="finish"]',
  // Complete
  completeHeader: '.complete-header',
  backHomeButton: '[data-test="back-to-products"]',
} as const;
