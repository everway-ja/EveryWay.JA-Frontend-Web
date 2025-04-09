import { createContext } from 'react';

/**
 * ProvaContext
 * 
 * A simple React context for managing and sharing count state across components.
 * Used for demonstration and testing purposes.
 * 
 * @property {number} count - The current count value
 * @property {Function} setCount - Function to update the count value
 */
export const ProvaContext = createContext({
  count: 0,
  setCount: () => {}
});
