import { useCallback, useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const changeValue = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, changeValue, setValue];
};

export default useInput;