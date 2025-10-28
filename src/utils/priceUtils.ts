/**
 * Utility functions for price calculations and formatting
 */

/**
 * Calculate a discount percentage between 70-85% based on the flight ID
 * This ensures consistent discount for the same flight across the app
 */
export const getDiscountPercentage = (flightId: string): number => {
  // Use flight ID to generate a consistent discount between 70-85%
  const hash = flightId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const normalized = Math.abs(hash) % 16; // 0-15
  return 70 + normalized; // 70-85%
};

/**
 * Calculate the original price based on current price and discount percentage
 * currentPrice = originalPrice * (1 - discount/100)
 * originalPrice = currentPrice / (1 - discount/100)
 */
export const calculateOriginalPrice = (currentPrice: number, discountPercentage: number): number => {
  const discountMultiplier = 1 - (discountPercentage / 100);
  return Math.round(currentPrice / discountMultiplier);
};

/**
 * Calculate price per person based on total price and seating capacity
 */
export const calculatePricePerPerson = (totalPrice: number, seats: number): number => {
  if (seats <= 0) return totalPrice;
  return Math.round(totalPrice / seats);
};

/**
 * Format a price with both original (strikethrough) and discounted price
 */
export interface DiscountedPrice {
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
}

export const getDiscountedPriceInfo = (
  currentPrice: number,
  flightId: string
): DiscountedPrice => {
  const discountPercentage = getDiscountPercentage(flightId);
  const originalPrice = calculateOriginalPrice(currentPrice, discountPercentage);
  
  return {
    originalPrice,
    currentPrice,
    discountPercentage
  };
};
