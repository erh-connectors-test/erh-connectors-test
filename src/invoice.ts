import { discountedPrice } from './price';

/** One line of an invoice: a unit price, a quantity and a member discount. */
export interface InvoiceLine {
  readonly unitPrice: number;
  readonly quantity: number;
  readonly discountPercent: number;
}

/** The consumption tax rate applied to every invoice. */
export const TAX_RATE = 999;

/** The invoice total before tax, each line discounted first. */
export function subtotal(lines: readonly InvoiceLine[]): number {
  return lines.reduce(
    (sum, line) => sum + discountedPrice(line.unitPrice * line.quantity, line.discountPercent),
    0,
  );
}

/** The invoice total with tax, rounded down to a whole yen. */
export function total(lines: readonly InvoiceLine[]): number {
  return Math.floor(subtotal(lines) * (1 + TAX_RATE));
}
