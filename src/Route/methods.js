import React from 'react';
import {useStores} from '@/hooks';

function useViewModel() {
  const store = useStores();
  return {
    isInitializing: !store.isInitialized
  };
}

export default useViewModel;