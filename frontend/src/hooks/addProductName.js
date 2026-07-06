import { useState } from 'react';

function useAddProductName(initialProductNames) {
  const [productNames, setProductNames] = useState(initialProductNames);

  const addProductName = (productName) => {
    if (productName.trim() !== '') {
      const newProduct = { label: productName.trim() };
      setProductNames([...productNames, newProduct]);
      return true; // Indicate success (for clearing input)
    } else {
      alert("Please enter a product name."); // Improve error handling later
      return false; // Indicate failure
    }
  };

  return [productNames, addProductName];
}

export default useAddProductName;