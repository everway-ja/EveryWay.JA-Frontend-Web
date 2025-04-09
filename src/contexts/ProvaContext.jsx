import { createContext } from 'react';

export const ProvaContext = createContext({
  count: 0,
  setCount: () => {}
});
