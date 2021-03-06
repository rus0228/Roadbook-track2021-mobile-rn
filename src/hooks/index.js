import React from 'react';
import {StoreContext} from '@/mst/StoreProvider';

/**
 * useStores
 * @return {[type]} [description]
 */
export const useStores = () => React.useContext(StoreContext);

const _scheduleCall = (timeoutRef, call, timeout, ...args) => {
  clearTimeout(timeoutRef.current);
  if (timeout === 0) {
    call(...args);
  } else {
    timeoutRef.current = setTimeout(() => {
      call(...args);
    }, timeout);
  }
};

/**
 * Use Delay with fixed timeout configured in parameter
 * @param call
 * @param timeout
 * @returns {function(...[*]): void}
 */
export function useDelay(call, timeout) {
  const timeoutRef = React.useRef();
  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (...args) => _scheduleCall(timeoutRef, call, timeout ?? 300, ...args);
}
