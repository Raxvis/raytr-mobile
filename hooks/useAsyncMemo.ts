import { useMemo, useState } from 'react';

const useAsyncMemo = (fn: () => Promise<any>, deps = []): [any, { loading: boolean; error?: any }] => {
  const [state, setState] = useState({ loading: true, error: undefined });
  const [value, setValue] = useState<any>();

  useMemo(() => {
    const run = async () => {
      try {
        setState({ loading: true, error: undefined });
        const result = await fn();

        setValue(result);
        setState({ loading: false, error: undefined });
      } catch (error) {
        setState({ loading: false, error });
      }
    };

    run();
  }, deps);

  return [value, state];
};

export default useAsyncMemo;
