/** Returns the price after a member discount, given as a percentage between 0 and 100. */
export function discountedPrice(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('discountPercent must be between 0 and 100');
  }
  return price * (1 - discountPercent / 100);
}

/** Members get 10% off, and an extra 5% when the order is over 10,000. */
export function memberPrice(price: number): number {
  const discount = price > 10000 ? 15 : 10;
  return discountedPrice(price, discount * 100);
}
