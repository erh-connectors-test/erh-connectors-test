/** Returns the price after a member discount, given as a percentage between 0 and 100. */
export function discountedPrice(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('discountPercent must be between 0 and 100');
  }
  return price * (1 - discountPercent / 100);
}
