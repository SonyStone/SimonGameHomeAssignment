import { useRef, useState } from 'react';

export const useStateRef = <T extends any>(initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);

  const setStateRef = (value: T) => {
    stateRef.current = value;
    setState(value);
  };

  return [state, setStateRef, stateRef] as const;
};
