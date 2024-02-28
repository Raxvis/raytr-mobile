import { useEffect, useState } from 'react';

const useAsyncEffect = (fn: () => Promise<void>, deps = []) => {
  const [state, setState] = useState({ loading: true, error: undefined });

  useEffect(() => {
    const run = async () => {
      try {
        setState({ loading: true, error: undefined });
        await fn();
        setState({ loading: false, error: undefined });
      } catch (error) {
        console.log(error);
        setState({ loading: false, error });
      }
    };

    run();
  }, deps);

  return state;
};

export default useAsyncEffect;
