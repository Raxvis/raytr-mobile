import { useEffect, useState } from 'react';

const useAsyncEffect = (fn: () => Promise<void>, deps = []): { loading: boolean; error?: any } => {
  const [state, setState] = useState({ loading: true, error: undefined });

  useEffect(() => {
    const run = async () => {
      try {
        setState({ loading: true, error: undefined });
        await fn();
        setState({ loading: false, error: undefined });
      } catch (error) {
        setState({ loading: false, error });
      }
    };

    run();
  }, deps);

  return state;
};

export default useAsyncEffect;
