import React, { useState } from 'react';

// Custom hook to manage some state and return a component
export function useCustomHook() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Returning both the count value and a component
  return {
    count,
    increment,
    CustomComponent: () => (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    )
  };
}
