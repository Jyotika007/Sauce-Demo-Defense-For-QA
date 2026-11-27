export interface Product {
  name: string;
  price: number;
}

export const products = {
  backpack: { name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: 9.99 },
  boltShirt: { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  onesie: { name: 'Sauce Labs Onesie', price: 7.99 },
  redShirt: { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
} satisfies Record<string, Product>;

export const catalogue: Product[] = Object.values(products);

const names = catalogue.map((p) => p.name);
const prices = catalogue.map((p) => p.price);

/** The order each sort option must produce. Keys are the values of the site's sort dropdown. */
export const expectedNameOrder = {
  az: [...names].sort(),
  za: [...names].sort().reverse(),
};
export const expectedPriceOrder = {
  lohi: [...prices].sort((a, b) => a - b),
  hilo: [...prices].sort((a, b) => b - a),
};
