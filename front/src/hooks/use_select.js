import { useCallback, useState } from 'react';

const useSelect = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, setValue, onChangeValue];
};

export default useSelect;