import { useCallback, useState } from 'react';

const useAsyncCallback = (fn, deps = []): [(...args) => void, { loading: boolean; error?: any; data?: any }] => {
  const [state, setState] = useState({ loading: false, error: undefined, data: undefined });

  const callback = useCallback((...args) => {
    setState({ loading: true, error: undefined, data: undefined });
    Promise.resolve(fn(...args))
      .then((data) => {
        setState({
          data,
          error: undefined,
          loading: false,
        });
      })
      .catch((error) => {
        setState({
          data: undefined,
          error,
          loading: false,
        });
      });
  }, deps);

  return [callback, state];
};

export default useAsyncCallback;
