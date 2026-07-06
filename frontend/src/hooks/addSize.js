import { useState } from 'react';

function useAddSize(initialOptions) {
  const [options, setOptions] = useState(initialOptions);

  const addSize = (size, price) => {
    if (size.trim() !== '' && !isNaN(parseFloat(price))) {
      const newOption = {
        label: size.trim(),
        value: parseFloat(price)
      };
      setOptions([...options, newOption]);
      return true;
    } else {
      alert("Please enter a valid size and price."); // Improve error handling later
      return false;
    }
  };

  return [options, addSize];
}

export default useAddSize;