export interface CryptoPriceInterface {
  e: string; // Event Type
  E: number;  // Event Time
  s: string;  // Symbol
  t: number;  // Trade ID
  p: string;  // Price
  q: string;   // Quantity
  b: number;  // Buyer order ID
  a: number;  // Seller order ID
  T: number;  // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}
