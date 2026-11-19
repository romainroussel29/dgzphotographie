'use client';

import { useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

/**
 * Exécute une fonction asynchrone au montage du composant et expose son état.
 * Pour relancer avec d'autres paramètres, changer la `key` du composant appelant.
 */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    load().then(
      (data) => !cancelled && setState({ status: 'success', data }),
      (error: unknown) => {
        console.error(error);
        if (!cancelled) setState({ status: 'error', error: error instanceof Error ? error : new Error(String(error)) });
      },
    );
    return () => {
      cancelled = true;
    };
    // La fonction est fournie au montage ; voir la remarque sur `key` ci-dessus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
