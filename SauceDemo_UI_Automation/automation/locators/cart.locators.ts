export const cartLocators = {
  item: '.cart_item',
  itemName: '.inventory_item_name',
  removeButton: 'button:has-text("Remove")',
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
} as const;
